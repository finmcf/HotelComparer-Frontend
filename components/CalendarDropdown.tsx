import React, { useState } from "react";

const CalendarDropdown = ({
  onCheckInDateChange,
  onCheckOutDateChange,
  checkInDate,
  checkOutDate,
}) => {
  const now = new Date();
  const [baseDate, setBaseDate] = useState(now);
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  const renderCalendar = (offsetMonth) => {
    const currentDate = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth() + offsetMonth,
      1
    );
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

    const handleDateClick = (date) => {
      // Check if the selected date's month is different from both displayed months
      if (
        date.getMonth() !== baseDate.getMonth() &&
        date.getMonth() !==
          new Date(
            baseDate.getFullYear(),
            baseDate.getMonth() + 1,
            1
          ).getMonth()
      ) {
        // Adjust baseDate to ensure the selected month and its adjacent month are displayed
        setBaseDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
      }

      if (!checkInDate || date < checkInDate) {
        onCheckInDateChange(date);
      } else if (!checkOutDate && date > checkInDate) {
        onCheckOutDateChange(date);
      } else {
        onCheckInDateChange(date);
        onCheckOutDateChange(null);
      }
    };

    const dates = getDates();

    return (
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
                (checkInDate &&
                  date.toDateString() === checkInDate.toDateString()) ||
                (checkOutDate &&
                  date.toDateString() === checkOutDate.toDateString())
                  ? date.getMonth() === currentDate.getMonth()
                    ? "bg-blue-600 text-white"
                    : ""
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
        </div>
      </div>
    );
  };

  const canGoToPreviousMonth =
    baseDate > now &&
    (baseDate.getMonth() !== now.getMonth() ||
      baseDate.getFullYear() !== now.getFullYear());
  const canGoToNextMonth =
    new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1) <=
    new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

  return (
    <div className="w-[600px] h-[300px] bg-white rounded-lg shadow overflow-hidden flex">
      {canGoToPreviousMonth && (
        <button
          onClick={() =>
            setBaseDate(
              new Date(baseDate.getFullYear(), baseDate.getMonth() - 1, 1)
            )
          }
          className="w-8 h-full flex items-center justify-center cursor-pointer text-lg"
        >
          &lt;
        </button>
      )}
      <div className="w-1/2">{renderCalendar(0)}</div>
      <div className="w-1/2">{renderCalendar(1)}</div>
      {canGoToNextMonth && (
        <button
          onClick={() =>
            setBaseDate(
              new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1)
            )
          }
          className="w-8 h-full flex items-center justify-center cursor-pointer text-lg"
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default CalendarDropdown;
