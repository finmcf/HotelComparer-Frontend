import React, { useState, useEffect, useRef } from "react";
import { useGlobal, CurrencyDetails } from "../contexts/GlobalContext";
import rawCurrencies from "../data/currencies.json";

import languages from "../data/languages.json";
import countriesData from "../data/countries.json";
import fetchAndUpdateCurrencyRates from "../utilities/fetchAndUpdateCurrencyRates";

interface CurrencyAndLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    languageCode: string,
    currencyCode: string,
    countryCode: string
  ) => void;
}

interface Countries {
  [key: string]: string;
}

type Currencies = {
  [key: string]: CurrencyDetails;
};

const countries: Countries = countriesData as Countries;
const currencies: Currencies = rawCurrencies as Currencies;

const CurrencyAndLanguageModal: React.FC<CurrencyAndLanguageModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const {
    setLanguage,
    setCurrency,
    setCountry,
    language: currentLanguage,
    currency: currentCurrency,
    country: currentCountry,
  } = useGlobal();

  const [selectedLanguageCode, setSelectedLanguageCode] = useState<string>(
    currentLanguage.code
  );
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>(
    currentCurrency.details.code
  );
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(
    currentCountry.code
  );

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedLanguageCode(currentLanguage.code);
    setSelectedCurrencyCode(currentCurrency.details.code);
    setSelectedCountryCode(currentCountry.code);
  }, [currentLanguage, currentCurrency, currentCountry]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSave = async () => {
    const selectedLanguage = Object.values(languages).find(
      (lang) => lang.code === selectedLanguageCode
    );
    const selectedCountryName = countries[selectedCountryCode];
    const selectedCurrencyDetails = currencies[selectedCurrencyCode];

    if (selectedLanguage && selectedCountryName && selectedCurrencyDetails) {
      setLanguage(selectedLanguage);
      setCountry({ code: selectedCountryCode, name: selectedCountryName });

      // Fetch and update currency rates
      await fetchAndUpdateCurrencyRates(
        currentCurrency.details.code, // Use the details.code from current currency
        selectedCurrencyCode,
        setCurrency // Pass the setCurrency function from useGlobal
      );

      onSave(selectedLanguage.code, selectedCurrencyCode, selectedCountryCode);
    }
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${
        !isOpen && "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      >
        <div className="mt-3 text-center">
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            Regional settings
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Your settings will apply to this browser only.
            </p>
          </div>
          <div className="mt-4">
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700"
            >
              Language
            </label>
            <select
              id="language"
              name="language"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedLanguageCode}
              onChange={(e) => setSelectedLanguageCode(e.target.value)}
            >
              {Object.values(languages).map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700"
            >
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedCurrencyCode}
              onChange={(e) => setSelectedCurrencyCode(e.target.value)}
            >
              {Object.values(currencies).map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.name} ({curr.symbol_native})
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value)}
            >
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              id="cancel-btn"
              className="mt-3 px-4 py-2 bg-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyAndLanguageModal;
