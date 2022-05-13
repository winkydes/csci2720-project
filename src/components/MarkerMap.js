import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { mapboxToken } from '../environment';
import 'mapbox-gl/dist/mapbox-gl.css';

function MarkerMap(props) {
  mapboxgl.accessToken = mapboxToken;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(114.1);
  const [lat, setLat] = useState(22.35);
  const [zoom, setZoom] = useState(9.5);

  // Initialize map
  useEffect(() => {
    if (map.current) return;
    console.log('Map init');
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    fetch('http://localhost/geodata', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.forEach((loc) => {
          new mapboxgl.Marker().setLngLat([...loc.geometry.coordinates]).addTo(map.current);
        });
      });
  });

  // Update user movement on map
  useEffect(() => {
    if (!map.current) return;
    console.log('Map move');
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className="w-100">
      <div ref={mapContainer} className="map-container mx-auto my-2" />
    </div>
  );
}

export default MarkerMap;
