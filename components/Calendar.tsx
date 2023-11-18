import React, { useState } from "react";

const Calendar = () => {
  // State to hold the current displayed month and year
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  // Get the last day of the month
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Function to get the array of dates for the current month
  const getDates = () => {
    const dates = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      dates.push(i);
    }
    return dates;
  };

  // Navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Get month and year for display
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="w-[221px] h-[300px] bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-2">
        <div className="text-sm font-semibold">Check-in Date</div>
        <div className="text-center my-2 text-lg">
          {month} {year}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {getDates().map((date) => (
            <button
              key={date}
              className={`w-8 h-8 flex items-center justify-center mx-auto rounded-full text-black ${
                selectedDate === date ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedDate(date)}
            >
              {date}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="cursor-pointer text-lg" onClick={goToPreviousMonth}>
            &lt;
          </span>
          <span className="cursor-pointer text-lg" onClick={goToNextMonth}>
            &gt;
          </span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
