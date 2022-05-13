import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { mapboxToken } from '../environment';
import 'mapbox-gl/dist/mapbox-gl.css';

const mapper = [
  'North Point', // incorrect location
  'Central Pier', 
  'Cheung Chau',
  'Cheung Chau Beach',
  'Clear Water Bay',
  'Green Island',
  'Happy Valley',
  'Chek Lap Kok',
  'HK Observatory',
  'HK Park',
  'Kai Tak',
  'Kai Tak Runway Park',
  'Kau Sai Chau',
  "King's Park",
  'Kowloon City',
  'Kwun Tong',
  'Lamma Island',
  'Lau Fau Shan',
  'Ngong Ping',
  'Pak Tam Chung',
  'Peng Chau',
  'Sai Kung',
  'Sha Chau',
  'Sha Tin',
  'Sham Shui Po',
  'Shau Kei Wan',
  'Shek Kong',
  'Sheung Shui',
  'Stanley',
  'Star Ferry',
  'Ta Kwu Ling',
  'Tai Lung',
  'Tai Mei Tuk',
  'Tai Mo Shan',
  'Tai Po',
  'Tai Po Kau',
  'Tap Mun',
  "Tate's Cairn",
  'The Peak',
  'Tseung Kwan O',
  'Tsing Yi',
  'Tsuen Wan Ho Koon',
  'Tsuen Wan Shing Mun Valley',
  'Tuen Mun',
  'Waglan Island',
  'Wetland Park',
  'Wong Chuk Hang',
  'Wong Tai Sin',
  'Yuen Long Park',
];

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
        data.forEach((loc, index) => {
          if (!(props.filter && props.filter !== mapper[index])) {
            new mapboxgl.Marker().setLngLat([...loc.geometry.coordinates]).addTo(map.current);
          }
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
