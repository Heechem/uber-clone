import Image from 'next/image';
import React from 'react';
import { HiUser } from 'react-icons/hi';

function CarListItems({ car, distance }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5 mt-5">
          <Image
            src={car.image}
            width={100}
            height={100}
          />
          <div>
            <h2 className="  text-[18px] flex gap-3 items-center">
              <span className="flex gap-3 items-center">
                <HiUser />
                {car.seat}
              </span>
              {car.name}
            </h2>

            <p>{car.desc}</p>
          </div>
        </div>
        <h2 className=" text-[14px] font-bold">
          ${(car.amount * distance).toFixed(2)}
        </h2>
      </div>
    </div>
  );
}

export default CarListItems;
