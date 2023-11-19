import React, { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  // Adjusted to set Monday as the first day of the week
  const startDayOfWeek = (firstDayOfMonth.getDay() || 7) - 1;
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const getDates = () => {
    const dates = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      dates.push(null);
    }
    for (let i = 1; i <= lastDayOfMonth; i++) {
      dates.push(i);
    }
    return dates;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="w-[300px] h-[300px] bg-white rounded-lg shadow overflow-auto">
      <div className="px-4 py-2">
        <div className="text-sm font-semibold text-center">Check-in Date</div>
        <div className="text-lg my-2 text-center">
          {month} {year}
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center">
              {day}
            </div>
          ))}
          {getDates().map((date, index) => (
            <button
              key={index}
              className={`w-8 h-8 flex items-center justify-center mx-auto rounded-full text-black ${
                selectedDate === date ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={() => date && setSelectedDate(date)}
            >
              {date || ""}
            </button>
          ))}
          {Array.from({ length: 7 - (getDates().length % 7) }).map(
            (_, index) => (
              <div key={`padding-${index}`} className="text-center"></div>
            )
          )}
          <div className="flex items-center justify-center">
            <button
              onClick={goToPreviousMonth}
              className="cursor-pointer text-lg"
            >
              &lt;
            </button>
          </div>
          <div className="col-span-5"></div>
          <div className="flex items-center justify-center">
            <button onClick={goToNextMonth} className="cursor-pointer text-lg">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
