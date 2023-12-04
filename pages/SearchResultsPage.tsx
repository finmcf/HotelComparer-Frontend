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
  const {
    isModalOpen,
    openModal,
    closeModal,
    setLanguage,
    setCurrency,
    setCountry,
  } = useGlobal();
  const [hotelData, setHotelData] = useState(null);

  useEffect(() => {
    if (router.query.data) {
      try {
        const data = JSON.parse(router.query.data as string);
        setHotelData(data);
      } catch (error) {
        console.error("Error parsing hotel data:", error);
      }
    }
  }, [router.query]);

  const handleCurrencyOrFlagClick = () => {
    openModal();
  };

  const handleSave = (
    languageCode: string,
    currencyCode: string,
    countryCode: string
  ) => {
    // Find the selected language, currency, and country based on the codes
    // Assuming you have a way to find these based on their codes
    const selectedLanguage = { code: languageCode, name: "Language Name" }; // Replace with actual data
    const selectedCurrency = {
      code: currencyCode,
      name: "Currency Name" /* other properties */,
    }; // Replace with actual data
    const selectedCountry = { code: countryCode, name: "Country Name" }; // Replace with actual data

    setLanguage(selectedLanguage);
    setCurrency(selectedCurrency);
    setCountry(selectedCountry);
    closeModal();
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
        <CurrencyAndLanguageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default SearchResults;
