import React from "react";
import NavBar from "../components/NavBar";
import { NextPage } from "next";
import FilterSidebar from "../components/FilterSideBar";
import WebsiteInfoFooter from "../components/WebsiteInfoFooter";
import HotelSearchResults from "../components/HotelSearchResult";
import { useUI } from "../contexts/UIContext";
import CurrencyAndLanguageModal from "../components/CurrencyAndLanguageModal";

const SearchResults: NextPage = () => {
  const { isModalOpen, openModal, closeModal } = useUI();

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
          <HotelSearchResults />
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
