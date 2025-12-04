import {useEffect, useRef} from 'react';
import leaflet, {Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {OfferBase} from '../../models/offer.ts';
import {City} from '../../models/city.ts';
import {useMap} from '../../hooks/use-map.ts';

interface MapProps {
  city: City;
  offers: OfferBase[];
  activeOfferId: string | null;
}

const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';
const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

const defaultCustomIcon = new leaflet.Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new leaflet.Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function Map({
  city,
  offers,
  activeOfferId,
}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers: Marker[] = [];

    if (map) {
      offers.forEach((offer) => {
        const marker = leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeOfferId)
              ? currentCustomIcon
              : defaultCustomIcon
          })
          .addTo(map);
        markers.push(marker);
      });
    }
    return () => {
      markers.forEach((marker) => {
        marker.remove();
      });
    };
  }, [map, city, offers, activeOfferId]);

  return (
    <div style={{height: '100%'}} ref={mapRef}/>
  );
}
