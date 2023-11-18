// SearchResults.jsx
import React from "react";
import NavBar from "../components/NavBar";
import { NextPage } from "next";
import FilterSidebar from "../components/FilterSideBar";
import WebsiteInfoFooter from "../components/WebsiteInfoFooter";
import HotelSearchResults from "../components/HotelSearchResult";

const SearchResults: NextPage = () => {
  return (
    <div className="w-full h-[832px] bg-white">
      <NavBar />
      <div className="flex">
        <FilterSidebar />
        <HotelSearchResults />
      </div>
      <WebsiteInfoFooter />
    </div>
  );
};

export default SearchResults;
