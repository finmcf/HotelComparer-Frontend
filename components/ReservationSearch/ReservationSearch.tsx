import React, { FormEvent } from "react";

// LocationInput Component
const LocationInput = () => (
  <div className="flex-1">
    <input
      type="text"
      placeholder="Location"
      className="w-full px-2 py-1 border border-gray-300 rounded text-center" // Centered text
    />
  </div>
);

// DateInput Component
const DateInput = ({ label }) => (
  <div className="flex-1">
    <input
      type="date"
      placeholder={label}
      className="w-full px-2 py-1 border border-gray-300 rounded text-center" // Centered text
    />
  </div>
);

// GuestsInput (Price Range) Component
const GuestsInput = () => (
  <div className="flex-1">
    <input
      type="text"
      placeholder="Price Range"
      className="w-full px-2 py-1 border border-gray-300 rounded text-center" // Centered text
    />
  </div>
);

// Main ReservationSearch Component
const ReservationSearch = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="w-[70%] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-2"
      >
        <LocationInput />
        <DateInput label="Date" />
        <GuestsInput />
        <button
          type="submit"
          className="flex-none px-5 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 text-center" // Centered text in button
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default ReservationSearch;
