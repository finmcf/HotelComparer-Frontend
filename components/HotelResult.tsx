import React from "react";

const HotelResult = () => {
  return (
    <div className="w-[95%] h-[167px] mx-auto mt-[50px] bg-[#f1f1f1] rounded-[20px] relative">
      <img
        src="https://via.placeholder.com/136"
        alt="Hotel"
        className="w-[136px] h-[136px] left-[17px] top-[15px] absolute rounded-[20px]"
      />

      <div className="px-[11px] py-[9px] right-[20px] top-[118px] absolute bg-green-400 rounded-[20px] justify-center items-center inline-flex">
        <div className="text-black text-xs font-normal font-['Inter']">
          View Booking Options
        </div>
      </div>

      <div className="pl-[73px] pr-2.5 py-1 right-[20px] top-[73px] absolute bg-neutral-400 flex-col justify-center items-end inline-flex">
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
