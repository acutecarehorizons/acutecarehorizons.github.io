'use client';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Geolocation {
  latitude: number;
  longitude: number;
  cityName: string;
  regionName: string;
  countryCode: string;
  countryName: string;
}

interface AnalyticsMapProps {
  geolocations: Geolocation[];
}

const AnalyticsMap: React.FC<AnalyticsMapProps> = ({ geolocations }) => {
  useEffect(() => {
    // This ensures the map renders properly after the component mounts
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (geolocations.length === 0) {
    return (
      <div style={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f5f5f5',
        color: '#666'
      }}>
        No location data available
      </div>
    );
  }

  // Calculate center point from all locations
  const centerLat = geolocations.reduce((sum, loc) => sum + loc.latitude, 0) / geolocations.length;
  const centerLng = geolocations.reduce((sum, loc) => sum + loc.longitude, 0) / geolocations.length;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={2}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geolocations.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
        >
          <Popup>
            <div>
              <strong>
                {location.cityName && location.regionName 
                  ? `${location.cityName}, ${location.regionName}`
                  : location.cityName || location.regionName || 'Unknown Location'
                }
              </strong>
              <br />
              {location.countryName || location.countryCode}
              <br />
              <small>
                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </small>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default AnalyticsMap; 