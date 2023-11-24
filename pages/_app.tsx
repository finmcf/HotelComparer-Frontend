import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalProvider } from "../contexts/GlobalContext"; // Import the UIProvider

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
