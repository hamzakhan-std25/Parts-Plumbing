// components/contact/MapComponent.jsx
'use client';

import { useEffect, useRef, useState } from 'react';

export default function MapComponent({ apiKey }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Load the Google Maps script dynamically
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      document.head.removeChild(script);
    };
  }, [apiKey]);

  const initMap = async () => {
    if (!mapRef.current) return;

    // The location (replace with your exact coordinates)
    const position = {
      lat: 34.07363693091883,
      lng: 72.45295220732662,
    };

    // Create the map (requires a mapId for advanced markers)
    const { Map } = await google.maps.importLibrary('maps');
    const mapInstance = new Map(mapRef.current, {
      zoom: 15,
      center: position,
      mapId: 'DEMO_MAP_ID', // Required for advanced markers. Use a real map ID in production.
    });
    setMap(mapInstance);

    // Create an advanced marker
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
    new AdvancedMarkerElement({
      map: mapInstance,
      position: position,
      title: 'Hassan Sanitory Store',
    });
  };

  return <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '0.75rem' }} />;
}