import React from "react";
import { HotelData } from "../interfaces/HotelDataInterface";
import currencies from "../data/currencies.json";

interface HotelResultProps {
  hotelData: HotelData;
}

const HotelResult: React.FC<HotelResultProps> = ({ hotelData }) => {
  const { hotel, cheapestCombination, cheapestCombinationCurrency } = hotelData;
  const currencySymbol = currencies[cheapestCombinationCurrency]?.symbol_native;

  return (
    <div className="w-[95%] h-[167px] mx-auto mt-[15px] bg-[#f1f1f1] rounded-[20px] relative flex">
      <img
        src="https://via.placeholder.com/136"
        alt={hotel.name}
        className="w-[136px] h-[136px] m-[15px] rounded-[20px]"
      />
      <div className="flex flex-col justify-between p-[15px]">
        <div className="text-black text-xl font-normal truncate">
          {hotel.name}
        </div>
        <div className="text-black text-base font-normal">
          {currencySymbol}
          {cheapestCombination.toFixed(2)}
        </div>
        <button
          className="w-[150px] h-[35px] bg-green-400 rounded-[20px] text-xs text-black font-normal"
          style={{ flexShrink: 0, flexGrow: 0 }}
        >
          View Booking Options
        </button>
      </div>
    </div>
  );
};

export default HotelResult;
