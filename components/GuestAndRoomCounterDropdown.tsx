import React from "react";

type CounterFields = "rooms" | "adults" | "children";

interface GuestAndRoomCounterDropdownProps {
  counters: Record<CounterFields, number>;
  incrementCounter: (field: CounterFields) => void;
  decrementCounter: (field: CounterFields) => void;
}

const GuestAndRoomCounterDropdown: React.FC<
  GuestAndRoomCounterDropdownProps
> = ({ counters, incrementCounter, decrementCounter }) => {
  return (
    <div className="w-[221px] bg-white rounded-[20px] overflow-auto shadow p-4">
      {Object.entries(counters).map(([field, value]) => (
        <div key={field} className="flex items-center justify-between mb-4">
          <div className="text-black text-xs font-normal font-sans">
            {field.charAt(0).toUpperCase() + field.slice(1)}
            <span className="text-gray-500 text-xs font-normal font-sans">
              {field === "adults"
                ? " Ages 18 or above"
                : field === "children"
                ? " Ages 0-17"
                : ""}
            </span>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => decrementCounter(field as CounterFields)}
              className="text-black font-sans text-lg w-8 h-8 rounded-full border border-blue-200 flex justify-center items-center mx-1"
            >
              -
            </button>
            <div className="text-black text-xs font-normal font-sans w-8 text-center">
              {value}
            </div>
            <button
              onClick={() => incrementCounter(field as CounterFields)}
              className="text-black font-sans text-lg w-8 h-8 rounded-full border border-blue-200 flex justify-center items-center mx-1"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuestAndRoomCounterDropdown;
