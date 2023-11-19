import React, { useState } from "react";

const CalendarDropdown = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  const firstDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfPreviousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();

  const startDayOfWeek = (firstDayOfCurrentMonth.getDay() || 7) - 1;
  const lastDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const getDates = () => {
    let dates = [];
    for (let i = startDayOfWeek; i > 0; i--) {
      dates.push(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          lastDayOfPreviousMonth - i + 1
        )
      );
    }
    for (let i = 1; i <= lastDayOfCurrentMonth; i++) {
      dates.push(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
      );
    }
    let nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    while (dates.length % 7 !== 0) {
      dates.push(nextMonth);
      nextMonth = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        nextMonth.getDate() + 1
      );
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

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (
      date.getMonth() !== currentDate.getMonth() ||
      date.getFullYear() !== currentDate.getFullYear()
    ) {
      setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  const dates = getDates();
  const totalCells = dates.length + 2;

  return (
    <div className="w-[250px] h-[400px] bg-white rounded-lg shadow overflow-auto">
      <div className="px-4 py-2">
        <div className="text-lg my-2 text-center">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center">
              {day}
            </div>
          ))}
          {dates.map((date, index) => (
            <button
              key={index}
              className={`w-8 h-8 flex items-center justify-center mx-auto rounded-full text-black ${
                selectedDate.getDate() === date.getDate() &&
                selectedDate.getMonth() === date.getMonth() &&
                selectedDate.getFullYear() === date.getFullYear()
                  ? "bg-blue-100"
                  : ""
              } ${
                date.getMonth() !== currentDate.getMonth()
                  ? "text-gray-400"
                  : ""
              }`}
              onClick={() => handleDateClick(date)}
            >
              {date.getDate()}
            </button>
          ))}
          {totalCells % 7 !== 0 && <div className="col-span-1"></div>}
          <button
            onClick={goToPreviousMonth}
            className="col-start-1 cursor-pointer text-lg"
          >
            &lt;
          </button>
          {totalCells % 7 !== 0 && <div className="col-span-5"></div>}
          <button
            onClick={goToNextMonth}
            className="col-start-7 cursor-pointer text-lg"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarDropdown;
