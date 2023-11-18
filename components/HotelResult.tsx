import React from "react";

const HotelResult = () => {
  return (
    <div className="w-[780px] h-[167px] left-[54px] top-[95px] absolute bg-neutral-500 rounded-[20px]">
      <div className="w-[136px] h-[136px] left-[17px] top-[15px] absolute bg-red-600 rounded-[20px]" />
      <div className="px-[11px] py-[9px] left-[615px] top-[118px] absolute bg-green-400 rounded-[20px] justify-center items-center inline-flex">
        <div className="text-black text-xs font-normal font-['Inter']">
          View Booking Options
        </div>
      </div>
      <div className="pl-[73px] pr-2.5 py-1 left-[626px] top-[73px] absolute bg-neutral-400 flex-col justify-center items-end inline-flex">
        <div className="text-black text-base font-normal font-['Inter']">
          $ Price
        </div>
        <div className="text-black text-[10px] font-normal font-['Inter']">
          1 Guest
        </div>
      </div>
      <div className="h-[136px] pl-[13px] pr-[75px] pt-2 pb-[104px] left-[174px] top-[15px] absolute bg-white justify-start items-center inline-flex">
        <div className="text-black text-xl font-normal font-['Inter']">
          Hotel Name
        </div>
      </div>
    </div>
  );
};

export default HotelResult;
