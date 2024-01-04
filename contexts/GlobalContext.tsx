import React, { createContext, useState, useContext } from "react";

// Types for various pieces of global state

export type CurrencyDetails = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
};

export type ExchangeRateInfo = {
  baseCurrency: string;
  targetCurrency: string;
  rate: number;
  timestamp: number;
};

export type CurrencyInfo = {
  details: CurrencyDetails;
  exchangeRate?: ExchangeRateInfo;
};

type LanguageInfo = {
  code: string;
  name: string;
};

type LocationInfo = {
  latitude: number | null;
  longitude: number | null;
};

type CountryInfo = {
  code: string;
  name: string;
};

type GlobalContextType = {
  isLoading: boolean;
  isModalOpen: boolean;
  language: LanguageInfo;
  currency: CurrencyInfo;
  location: LocationInfo;
  country: CountryInfo;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  setLoading: (isLoading: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  setLanguage: (language: LanguageInfo) => void;
  setCurrency: (currency: CurrencyInfo) => void;
  setLocation: (location: LocationInfo) => void;
  setCountry: (country: CountryInfo) => void;
  setCheckInDate: (date: Date | null) => void;
  setCheckOutDate: (date: Date | null) => void;
  fetchUserLocation: () => void;
};

// Default values for context state
const defaultLanguage: LanguageInfo = { code: "en", name: "English" };
const defaultCurrencyDetails: CurrencyDetails = {
  symbol: "$",
  name: "US Dollar",
  symbol_native: "$",
  decimal_digits: 2,
  rounding: 0,
  code: "USD",
  name_plural: "US dollars",
};

const defaultCurrency: CurrencyInfo = {
  details: defaultCurrencyDetails,
  exchangeRate: undefined, // As exchange rate might not be available initially
};

// In GlobalProvider

const defaultCountry: CountryInfo = { code: "US", name: "United States" };

// Default check-in and check-out dates
const defaultCheckInDate = new Date(); // Today's date
const defaultCheckOutDate = new Date();
defaultCheckOutDate.setDate(defaultCheckOutDate.getDate() + 1); // Tomorrow's date

// Creating the context
const GlobalContext = createContext<GlobalContextType>(null!);

// Custom hook for consuming the context
export const useGlobal = () => useContext(GlobalContext);

// Provider component
export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageInfo>(defaultLanguage);
  const [currency, setCurrency] = useState<CurrencyInfo>(defaultCurrency);
  const [location, setLocation] = useState<LocationInfo>({
    latitude: null,
    longitude: null,
  });
  const [country, setCountry] = useState<CountryInfo>(defaultCountry);
  const [checkInDate, setCheckInDate] = useState<Date | null>(
    defaultCheckInDate
  );
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(
    defaultCheckOutDate
  );

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location", error);
          setLocation({ latitude: null, longitude: null });
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLocation({ latitude: null, longitude: null });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setLoading,
        isModalOpen,
        openModal,
        closeModal,
        language,
        setLanguage,
        currency,
        setCurrency,
        location,
        setLocation,
        country,
        setCountry,
        checkInDate,
        checkOutDate,
        setCheckInDate,
        setCheckOutDate,
        fetchUserLocation,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
