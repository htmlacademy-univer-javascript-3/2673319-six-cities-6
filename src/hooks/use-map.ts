import {useEffect, useState, MutableRefObject} from 'react';
import leaflet from 'leaflet';
import {City} from '../models/city';

export function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City): leaflet.Map | null {
  const [map, setMap] = useState<leaflet.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const instance = leaflet.map(mapRef.current, {
      center: {
        lat: city.location.latitude,
        lng: city.location.longitude,
      },
      zoom: city.location.zoom,
    });

    leaflet
      .tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'}
      )
      .addTo(instance);

    setMap(instance);

    return () => {
      instance.remove();
      setMap(null);
    };
  }, [city.location.latitude, city.location.longitude, city.location.zoom, mapRef]);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.setView(
      [city.location.latitude, city.location.longitude],
      city.location.zoom,
      {animate: false}
    );
  }, [map, city]);

  return map;
}
