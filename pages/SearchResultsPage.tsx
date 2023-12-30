import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import FilterSidebar from "../components/FilterSideBar";
import HotelSearchResults from "../components/HotelSearchResult";
import { HotelData } from "../interfaces/HotelDataInterface";

const SearchResults: NextPage = () => {
  const router = useRouter();
  const [hotelData, setHotelData] = useState<HotelData[] | null>(null);

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
