import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import NavBar from "../components/NavBar";
import FilterSidebar from "../components/FilterSideBar";
import WebsiteInfoFooter from "../components/WebsiteInfoFooter";
import HotelSearchResults from "../components/HotelSearchResult";
import { useGlobal } from "../contexts/GlobalContext";
import CurrencyAndLanguageModal from "../components/CurrencyAndLanguageModal";

const SearchResults: NextPage = () => {
  const router = useRouter();
  const { isModalOpen, openModal, closeModal } = useGlobal();
  const [hotelData, setHotelData] = useState(null);

  useEffect(() => {
    if (router.query.data) {
      try {
        const data = JSON.parse(router.query.data as string);
        setHotelData(data);
      } catch (error) {
        console.error("Error parsing hotel data:", error);
        // Handle error or set default state
      }
    }
  }, [router.query]);

  const handleCurrencyOrFlagClick = () => {
    openModal();
  };

  return (
    <>
      <div
        className={`flex flex-col min-h-screen ${
          isModalOpen ? "opacity-50" : ""
        }`}
      >
        <NavBar
          onCurrencyClick={handleCurrencyOrFlagClick}
          onFlagClick={handleCurrencyOrFlagClick}
        />
        <div className="flex flex-grow">
          <FilterSidebar />
          <HotelSearchResults data={hotelData} />
        </div>
        <WebsiteInfoFooter />
      </div>
      {isModalOpen && (
        <CurrencyAndLanguageModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </>
  );
};

export default SearchResults;
