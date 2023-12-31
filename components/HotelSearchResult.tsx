// HotelSearchResults.jsx
import React from "react";
import HotelResult from "./HotelResult";
import { HotelData } from "../interfaces/HotelDataInterface";

const HotelSearchResults: React.FC<{ data: HotelData[] | null }> = ({
  data,
}) => {
  if (!data || data.length === 0) {
    return <div>No hotels available or still loading...</div>;
  }

  return (
    <div className="flex-1 flex flex-col items-center bg-white">
      {data.map((hotel) => (
        <HotelResult key={hotel.hotel.hotelId} hotelData={hotel} />
      ))}
    </div>
  );
};

export default HotelSearchResults;
