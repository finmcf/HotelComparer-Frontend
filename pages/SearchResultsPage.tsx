import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import FilterSidebar from "../components/FilterSideBar"; // Keep this import as it was
import HotelSearchResults from "../components/HotelSearchResult"; // Keep this import as it was
import { HotelData } from "../interfaces/HotelDataInterface"; // Keep this import as it was
import { useGlobal } from "../contexts/GlobalContext"; // Keep this import as it was
import { convertPrices } from "../utilities/convertPrices"; // Import your conversion function
import { NextPage } from "next";

const SearchResults: NextPage = () => {
  // Updated to NextPage as per your original component
  const router = useRouter();
  const [hotelData, setHotelData] = useState<HotelData[] | null>(null); // Kept the state type as in your original code
  const { currency } = useGlobal();

  useEffect(() => {
    if (router.query.data) {
      try {
        const data = JSON.parse(router.query.data as string) as HotelData[];
        setHotelData(data);
      } catch (error) {
        console.error("Error parsing hotel data:", error);
      }
    }
  }, [router.query]);

  useEffect(() => {
    if (hotelData && hotelData.length > 0 && currency) {
      const convertedData = convertPrices(hotelData, currency);
      setHotelData(convertedData);
    }
  }, [currency]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <FilterSidebar />
        <HotelSearchResults data={hotelData} />
      </div>
    </div>
  );
};

export default SearchResults;
