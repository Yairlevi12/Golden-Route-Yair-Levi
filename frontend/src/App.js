import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Circle, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import './index.css';

function App() {
  const [form, setForm] = useState({ latitude:'', longitude:'', radius:'', speed:'' });
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);

  // Auto-fetch whenever inputs change
  useEffect(() => {
    if (!form.latitude||!form.longitude||!form.radius||!form.speed) return;
    axios.post('http://localhost:5000/api/check', form)
         .then(res => { setData(res.data); })
         .catch(console.error);
  }, [form]);

  // Save the current query + result set into history
  const saveCurrent = () => {
    if (!data) return;
    setHistory(h => [...h, { ...form, planes: data.planes }]);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">🚁 Drone Threat Monitor</h1>

      <div className="flex justify-center gap-2 mb-4">
        {['latitude','longitude','radius','speed'].map(key => (
          <input
            key={key}
            type="number" step="any"
            placeholder={key}
            value={form[key]}
            onChange={e => setForm({ ...form, [key]: e.target.value })}
            className="p-2 border rounded w-24"
          />
        ))}
        <button
          onClick={saveCurrent}
          className="bg-green-500 text-white px-4 rounded"
        >Save</button>
        <button
          onClick={() => alert(JSON.stringify(history,null,2))}
          className="bg-blue-500 text-white px-4 rounded"
        >History</button>
      </div>

      {data && (
        <MapContainer
          center={[data.latitude, data.longitude]}
          zoom={8}
          style={{ height: '60vh', width: '100%' }}
          className="rounded shadow-lg"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Circle
            center={[data.latitude, data.longitude]}
            radius={data.radius*1000}
            pathOptions={{ color:'red', fillOpacity:0.1 }}
          />
          <CircleMarker
            center={[data.latitude, data.longitude]}
            radius={10}
            pathOptions={{ color:'red', fillColor:'red', fillOpacity:0.7 }}
          >
            <Popup>Your Drone</Popup>
          </CircleMarker>
          {data.planes.map((p,i)=>(
            <CircleMarker
              key={i}
              center={[p.lat,p.lon]}
              radius={6}
              pathOptions={{ color:'black', fillColor:'black', fillOpacity:0.7 }}
            >
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
