// components/ReservationSearch/ReservationSearch.tsx
import React, { FormEvent, useState } from "react";
import LocationInput from "./LocationInput"; // Import the LocationInput component

type ReservationSearchProps = {
  amadeusApiKey: string;
  amadeusApiSecret: string;
};

const DateInput = ({ label }: { label: string }) => (
  <div className="flex-1">
    <input
      type="date"
      placeholder={label}
      className="w-full px-2 py-1 border border-gray-300 rounded text-center"
    />
  </div>
);

const GuestsInput = () => (
  <div className="flex-1">
    <input
      type="number"
      placeholder="Guests"
      className="w-full px-2 py-1 border border-gray-300 rounded text-center"
    />
  </div>
);

const ReservationSearch: React.FC<ReservationSearchProps> = ({
  amadeusApiKey,
  amadeusApiSecret,
}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle the form submission with the selected location
    console.log(selectedLocation);
  };

  // Function to update the selected location state
  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
  };

  return (
    <div className="w-[70%] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-2"
      >
        <LocationInput
          amadeusApiKey={amadeusApiKey}
          amadeusApiSecret={amadeusApiSecret}
          onLocationSelect={handleLocationSelect}
        />
        <DateInput label="Check-in" />
        <DateInput label="Check-out" />
        <GuestsInput />
        <button
          type="submit"
          className="flex-none px-5 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 text-center"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default ReservationSearch;
