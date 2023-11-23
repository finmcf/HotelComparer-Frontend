import React from "react";
import { FlagIcon } from "react-flag-kit";

const NavBar = () => {
  return (
    <div className="w-full h-[43px] bg-gray-200 flex justify-end items-center px-[17px]">
      <div className="flex gap-[26px] items-center">
        <button
          aria-label="Select Language and Currency"
          className="focus:outline-none"
        >
          <FlagIcon code="GB" size={21} />
        </button>
        <button
          aria-label="Change Currency"
          className="w-[21px] h-[21px] flex justify-center items-center bg-white rounded-full text-black text-xs font-normal focus:outline-none"
        >
          $
        </button>
        <div className="w-[68px] h-[21px] flex justify-center items-center bg-white rounded-[10px] text-black text-xs font-normal cursor-pointer">
          Sign Up
        </div>
        <div className="w-[68px] h-[21px] flex justify-center items-center bg-white rounded-[10px] text-black text-xs font-normal cursor-pointer">
          Login
        </div>
      </div>
    </div>
  );
};

export default NavBar;
