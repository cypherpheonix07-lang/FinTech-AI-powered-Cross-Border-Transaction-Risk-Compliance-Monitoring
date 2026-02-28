import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

/**
 * GeoTraceMap.jsx (Enterprise Edition)
 * High-fidelity jurisdictional movement visualization.
 */
const GeoTraceMap = ({ steps = [] }) => {
  const centers = [
      { id: 'NYC', pos: [40.7128, -74.0060], name: 'New York (CHIPS)' },
      { id: 'LON', pos: [51.5074, -0.1278], name: 'London (FPS)' },
      { id: 'DBX', pos: [25.2048, 55.2708], name: 'Dubai (CBUAE)' },
      { id: 'SGP', pos: [1.3521, 103.8198], name: 'Singapore (FAST)' }
  ];

  const path = centers.map(c => c.pos);

  return (
    <div className="h-full w-full rounded-3xl overflow-hidden border border-dark-600 grayscale brightness-75 contrast-125">
      <MapContainer 
        center={[30, 0]} 
        zoom={2} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', background: '#0f172a' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {centers.map(city => (
          <Marker key={city.id} position={city.pos}>
            <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent={false}>
              <div className="bg-dark-900 text-white p-2 rounded border border-primary/40 text-[10px] font-bold">
                 {city.name}
              </div>
            </Tooltip>
          </Marker>
        ))}

        <Polyline 
           positions={path} 
           pathOptions={{ color: '#3b82f6', weight: 2, dashArray: '10, 10', opacity: 0.6 }} 
        />
      </MapContainer>
    </div>
  );
};

export default GeoTraceMap;
