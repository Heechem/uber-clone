import React, { useContext, useEffect, useState } from 'react';
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from '@react-google-maps/api';

import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/Destinationcontext';

function GoogleMapSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [map, setMap] = React.useState(null);
  // state to store the route point
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.8,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_API_KEY,
  });

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  // effect to update the position on the mpa from the search input
  useEffect(() => {
    if (source?.length != 0 && map) {
      map.panTo({ lat: source.lat, lng: source.lng });
      setCenter({ lat: source.lat, lng: source.lng });
    }
    if (source.length != 0 && destination.length != 0) {
      directionRoute();
    }
  }, [source]);

  useEffect(() => {
    if (destination?.length != 0 && map) {
      // map.panTo({ lat: destination.lat, lng: destination.lng });
      setCenter({ lat: destination.lat, lng: destination.lng });
    }
    if (source.length != 0 && destination.length != 0) directionRoute();
  }, [destination]);

  const directionRoute = () => {
    if (isLoaded) {
      const directionService = new google.maps.DirectionsService();

      directionService.route(
        {
          origin: { lat: source.lat, lng: source.lng },
          destination: { lat: destination.lat, lng: destination.lng },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            setDirectionRoutePoints(() => result);
          }
        }
      );
    }
  };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: '654061ed305f3238' }}
    >
      {source.length != [] ? (
        <MarkerF position={{ lat: source.lat, lng: source.lng }}>
          <OverlayViewF
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div>
              <p className=" font-bold">{source.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}

      {destination.length != 0 ? (
        <MarkerF position={{ lat: destination.lat, lng: destination.lng }}>
          <OverlayViewF
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div>
              <p className=" font-bold">{destination.label}</p>
            </div>
          </OverlayViewF>
        </MarkerF>
      ) : null}

      <DirectionsRenderer
        directions={directionRoutePoints}
        options={{ suppressMarkers: true }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default GoogleMapSection;
