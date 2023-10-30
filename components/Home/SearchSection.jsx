'use client';
import { DestinationContext } from '@/context/Destinationcontext';
import InputItem from './InputItem';
import { SourceContext } from '@/context/SourceContext';
import { useContext, useEffect, useState } from 'react';
import CarListOptions from './CarListOptions';

function SearchSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const [distance, setDistance] = useState('');

  useEffect(() => {
    if (source) {
    }
  }, [source]);

  // calculate the distance of the trip
  const calculateDistance = () => {
    const dist = google.maps.geometry.spherical.computeDistanceBetween(
      { lat: parseFloat(source.lat), lng: parseFloat(source.lng) },
      { lat: parseFloat(destination.lat), lng: parseFloat(destination.lng) }
    );

    setDistance(() => dist * 0.00062);
    console.log(distance);
  };
  return (
    <div>
      <div className="p-2 md:p-7 border-[2px] rounded-xl">
        <p className="text-[20px] font-bold">Get a ride</p>
        <InputItem type="source" />
        <InputItem type="drop" />

        <button
          className="p-3 bg-black w-full mt-5 text-white rounded-lg active:scale-95"
          onClick={() => calculateDistance()}
        >
          Search
        </button>
      </div>
      {distance && <CarListOptions distance={distance} />}
    </div>
  );
}

export default SearchSection;
