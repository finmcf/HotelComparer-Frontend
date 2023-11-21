import React, { useState } from "react";

type CounterFields = "rooms" | "adults" | "children";

const GuestAndRoomCounterDropdown: React.FC = () => {
  const [counters, setCounters] = useState<Record<CounterFields, number>>({
    rooms: 1,
    adults: 1,
    children: 0,
  });

  const increment = (field: CounterFields) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [field]: prevCounters[field] + 1,
    }));
  };

  const decrement = (field: CounterFields) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [field]: prevCounters[field] > 0 ? prevCounters[field] - 1 : 0,
    }));
  };

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
              onClick={() => decrement(field as CounterFields)}
              className="text-black font-sans text-lg w-8 h-8 rounded-full border border-blue-200 flex justify-center items-center mx-1"
            >
              -
            </button>
            <div className="text-black text-xs font-normal font-sans w-8 text-center">
              {value}
            </div>
            <button
              onClick={() => increment(field as CounterFields)}
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
