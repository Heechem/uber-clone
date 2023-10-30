import { CarListData } from '@/utils/carList';
import CarListItems from './CarListItems';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function CarListOptions({ distance }) {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const router = useRouter();
  return (
    <div className="mt-6 overflow-auto h-[350px] ">
      <h2 className=" text-[22px] font-bold">Car available</h2>
      {CarListData.map((car, idx) => (
        <div
          className={` cursor-pointer p-2  rounded-md border-black  ${
            activeIndex === idx ? 'border-[2px]' : ''
          }`}
          onClick={() => {
            setActiveIndex(idx);
            setSelectedCar(car);
          }}
        >
          <CarListItems
            car={car}
            distance={distance}
          />
        </div>
      ))}
      {selectedCar && (
        <div className="flex items-center justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] rounded-md">
          <h2>Mkae payement </h2>
          <button
            className="p-3 bg-black text-white rounded-md active:scale-95"
            onClick={() =>
              router.push(
                '/payment?amount=' + (selectedCar.amount * distance).toFixed(2)
              )
            }
          >
            Call {selectedCar.name}
          </button>
        </div>
      )}
    </div>
  );
}

export default CarListOptions;
