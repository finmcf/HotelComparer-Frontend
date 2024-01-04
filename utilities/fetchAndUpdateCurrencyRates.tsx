import currencies from "../data/currencies.json";

const fetchAndUpdateCurrencyRates = async (
  baseCurrencyCode,
  targetCurrencyCode,
  setCurrency
) => {
  try {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

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

    const data = await response.json();
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
