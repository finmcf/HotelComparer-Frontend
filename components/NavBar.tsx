import React from "react";

const NavBar = () => {
  return (
    <div className="w-full h-[43px] bg-gray-200 flex justify-end items-center">
      <div className="w-[186px] pl-[17px] pr-[7px] py-[11px] justify-end items-start gap-[26px] inline-flex">
        <div className="w-[68px] h-[21px] flex justify-center items-center bg-white rounded-[10px] text-black text-xs font-normal font-['Inter']">
          Sign Up
        </div>
        <div className="w-[68px] h-[21px] flex justify-center items-center bg-white rounded-[10px] text-black text-xs font-normal font-['Inter']">
          Login
        </div>
      </div>
    </div>
  );
};

export default NavBar;
