import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Circle, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';

function App() {
  const [form, setForm] = useState({ latitude: '', longitude: '', radius: '', speed: '' });
  const [data, setData] = useState(null);

  const fetchData = async () => {
    if (!form.latitude || !form.longitude || !form.radius || !form.speed) return;
    try {
      const res = await axios.post('http://host.docker.internal:5000/api/check', form);
      setData(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetchData();
  };

  // Poll every 30s
  useEffect(() => {
    const id = setInterval(fetchData, 30000);
    return () => clearInterval(id);
  }, [form]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">🚁 Drone Threat Monitor</h1>
      <form onSubmit={handleSubmit} className="flex justify-center gap-2 mb-4">
        {['latitude','longitude','radius','speed'].map(k => (
          <input key={k} type="number" step="any" placeholder={k}
            value={form[k]}
            onChange={e => { setForm({ ...form, [k]: e.target.value }); setData(null); }}
            className="p-2 border rounded w-24" />
        ))}
        <button type="submit" className="bg-red-600 text-white px-4 rounded">Check</button>
      </form>

      {data && (
        <MapContainer center={[data.latitude, data.longitude]} zoom={8}
          style={{ height: '60vh', width: '100%' }} className="rounded shadow-lg">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Danger radius */}
          <Circle center={[data.latitude, data.longitude]}
            radius={data.radius * 1000}
            pathOptions={{ color: 'red', fillOpacity: 0.1 }} />

          {/* Drone in red */}
          <CircleMarker center={[data.latitude, data.longitude]} radius={10}
            pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.7 }}>
            <Popup>Your Drone</Popup>
          </CircleMarker>

          {/* Planes */}
          {data.planes.map((p,i) => (
            <CircleMarker key={i} center={[p.lat, p.lon]} radius={6}
              pathOptions={{ color: 'black', fillColor: 'black', fillOpacity: 0.7 }}>
              <Popup>
                <strong>{p.license}</strong><br/>
                Distance: {p.distance.toFixed(1)} km<br/>
                Closure: {p.closureTime.toFixed(2)} h
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default App;
