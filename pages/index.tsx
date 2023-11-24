import React from "react";
import { useGlobal } from "../contexts/GlobalContext"; // Updated import
import { BeatLoader } from "react-spinners";
import NavBar from "../components/NavBar";
import SearchArea from "../components/SearchArea";
import CurrencyAndLanguageModal from "../components/CurrencyAndLanguageModal";

const Home = () => {
  const { isLoading, isModalOpen, openModal, closeModal } = useGlobal(); // Updated context hook

  const handleCurrencyAndLanguageSave = (
    language: string,
    currency: string
  ) => {
    console.log(`Language: ${language}, Currency: ${currency}`);
    closeModal();
  };

  const handleCurrencyOrFlagClick = () => {
    openModal();
  };

  return (
    <>
      <div
        className={`flex flex-col h-screen relative ${
          isLoading || isModalOpen ? "opacity-50" : ""
        }`}
      >
        <NavBar
          onCurrencyClick={handleCurrencyOrFlagClick}
          onFlagClick={handleCurrencyOrFlagClick}
        />
        <SearchArea />
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
            <BeatLoader color="#FFFFFF" />
          </div>
        )}
      </div>
      {isModalOpen && (
        <CurrencyAndLanguageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleCurrencyAndLanguageSave}
        />
      )}
    </>
  );
};

export default Home;
