import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalProvider, useGlobal } from "../contexts/GlobalContext";
import NavBar from "../components/NavBar";
import CurrencyAndLanguageModal from "../components/CurrencyAndLanguageModal";
import { BeatLoader } from "react-spinners";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalProvider>
  );
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, isModalOpen, closeModal, openModal } = useGlobal();

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
      <NavBar
        onCurrencyClick={handleCurrencyOrFlagClick}
        onFlagClick={handleCurrencyOrFlagClick}
      />
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <BeatLoader color="#FFFFFF" />
        </div>
      )}
      <div className="pt-[43px]">{children}</div>
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

export default MyApp;
