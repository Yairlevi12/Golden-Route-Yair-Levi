require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

const API_URL = process.env.EXTERNAL_API_URL;
const AUTH = {
  username: process.env.EXTERNAL_API_USERNAME,
  password: process.env.EXTERNAL_API_PASSWORD
};

const app = express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();

app.post('/api/check', async (req, res) => {
  try {
    // Parse inputs
    const { latitude: latStr, longitude: lngStr, radius: radStr, speed: spdStr } = req.body;
    const latitude = parseFloat(latStr);
    const longitude = parseFloat(lngStr);
    const radius = parseFloat(radStr);
    const speed = parseFloat(spdStr);

    // Fetch from OpenSky
    const response = await axios.get(API_URL, {
      
      params: {
        lamin: latitude - radius/111,
        lamax: latitude + radius/111,
        lomin: longitude - radius/(111 * Math.cos(latitude * Math.PI/180)),
        lomax: longitude + radius/(111 * Math.cos(latitude * Math.PI/180))
      }
    });

    const states = response.data.states || [];
    // Map out only the elements we need by index
    const planesData = states
      .map(s => {
        const icao     = s[0];
        const callsign = (s[1] || '').trim();
        const lon      = s[5];
        const lat      = s[6];
        const license  = callsign || icao;
        const distance = Math.hypot(
          (lat - latitude) * 111,
          (lon - longitude) * 111 * Math.cos(latitude * Math.PI/180)
        );
        return { license, lat, lon, distance, closureTime: (distance - radius) / speed };
      })
      .filter(p => p.distance <= radius);

    console.log('[OS] Returning ' + planesData.length + ' planes around ' + latitude + ',' + longitude);

    // Persist entry+planes
    await prisma.entry.create({
      data: {
        latitude, longitude, radius, speed,
        planes: {
          create: planesData.map(p => ({
            license:      p.license,
            distance:     p.distance,
            closureTime:  p.closureTime
          }))
        }
      }
    });

    res.json({ latitude, longitude, radius, speed, planes: planesData });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
