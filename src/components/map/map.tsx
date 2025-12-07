import {useEffect, useRef} from 'react';
import leaflet, {Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {OfferBase} from '../../models/offer';
import {City} from '../../models/city';
import {useMap} from '../../hooks/use-map';

interface MapProps {
  city: City;
  offers: OfferBase[];
  activeOfferId: string | null;
}

const URL_MARKER_DEFAULT = 'img/pin.svg';
const URL_MARKER_CURRENT = 'img/pin-active.svg';

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
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (!map) {
      return;
    }

    const markers: Marker[] = [];

    offers.forEach((offer) => {
      const marker = leaflet
        .marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }, {
          icon: offer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon,
        })
        .addTo(map);
      markers.push(marker);
    });

    return () => {
      markers.forEach((marker) => {
        marker.remove();
      });
    };
  }, [map, offers, activeOfferId]);

  return (
    <div style={{height: '100%'}} ref={mapRef}/>
  );
}
