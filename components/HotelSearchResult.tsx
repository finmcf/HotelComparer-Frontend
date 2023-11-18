import React from "react";
import HotelResult from "./HotelResult"; // Import the HotelResult component

const HotelSearchResults = () => {
  return (
    <div className="flex-1 h-[690px] relative bg-stone-400">
      <div className="w-[441px] pl-[17px] pr-[283px] pt-3 pb-[11px] left-[54px] top-[32px] absolute bg-white justify-start items-center inline-flex">
        <div className="text-black text-xs font-normal font-['Inter']">
          London, December 9-12
        </div>
      </div>
      <div className="w-[99px] h-[38px] left-[735px] top-[32px] absolute bg-zinc-300 rounded-[20px]" />
      <HotelResult />
    </div>
  );
};

export default HotelSearchResults;
