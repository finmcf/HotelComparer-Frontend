import React, { createContext, useState, useContext } from "react";

type CurrencyInfo = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
};

type LanguageInfo = {
  code: string;
  name: string;
};

type GlobalContextType = {
  isLoading: boolean;
  isModalOpen: boolean;
  language: LanguageInfo;
  currency: CurrencyInfo;
  setLoading: (isLoading: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  setLanguage: (language: LanguageInfo) => void;
  setCurrency: (currency: CurrencyInfo) => void;
};

const defaultLanguage: LanguageInfo = { code: "en", name: "English" };
const defaultCurrency: CurrencyInfo = {
  symbol: "$",
  name: "US Dollar",
  symbol_native: "$",
  decimal_digits: 2,
  rounding: 0,
  code: "USD",
  name_plural: "US dollars",
};

const GlobalContext = createContext<GlobalContextType>(null!);

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageInfo>(defaultLanguage);
  const [currency, setCurrency] = useState<CurrencyInfo>(defaultCurrency);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
