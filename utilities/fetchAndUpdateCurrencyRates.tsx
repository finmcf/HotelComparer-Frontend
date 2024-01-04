import { CurrencyInfo } from "../contexts/GlobalContext"; // Update the import path as needed
import currencies from "../data/currencies.json";

interface ApiResponse {
  rate: number;
  timestamp?: number;
}

const fetchAndUpdateCurrencyRates = async (
  baseCurrencyCode: string,
  targetCurrencyCode: string,
  setCurrency: (currency: CurrencyInfo) => void
): Promise<void> => {
  try {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID as string; // Type assertion for environment variables
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string; // Type assertion for environment variables

    const response = await fetch(
      `https://localhost:7033/api/CurrencyExchange?baseCurrency=${baseCurrencyCode}&targetCurrency=${targetCurrencyCode}`,
      {
        headers: {
          ClientId: clientId,
          ClientSecret: clientSecret,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    const targetCurrencyInfo = currencies[targetCurrencyCode];

    if (!targetCurrencyInfo) {
      throw new Error("Currency code not found in the data");
    }

    const exchangeRateInfo = {
      baseCurrency: baseCurrencyCode,
      targetCurrency: targetCurrencyCode,
      rate: data.rate,
      timestamp: data.timestamp || Date.now(),
    };

    setCurrency({
      ...targetCurrencyInfo,
      exchangeRate: exchangeRateInfo,
    });
  } catch (error) {
    console.error("Error fetching currency rates:", error);
  }
};

export default fetchAndUpdateCurrencyRates;
