import { HotelData } from "../interfaces/HotelDataInterface";

type CurrencyInfo = {
  code: string;
  exchangeRate: {
    rate: number;
  };
};

export const convertPrices = (
  hotelData: HotelData[],
  newCurrencyInfo: CurrencyInfo
): HotelData[] => {
  const rate = newCurrencyInfo.exchangeRate.rate;
  const newCurrency = newCurrencyInfo.code;

  return hotelData.map((hotel) => {
    const updatedHotel: HotelData = { ...hotel };

    updatedHotel.offers = hotel.offers.map((offer) => {
      const updatedOffer = { ...offer };

      updatedOffer.price.currency = newCurrency;
      updatedOffer.price.base = (parseFloat(offer.price.base) * rate).toFixed(
        2
      );
      updatedOffer.price.total = (parseFloat(offer.price.total) * rate).toFixed(
        2
      );

      if (updatedOffer.price.variations.average) {
        updatedOffer.price.variations.average.base = (
          parseFloat(offer.price.variations.average.base) * rate
        ).toFixed(2);
      }

      updatedOffer.price.variations.changes =
        offer.price.variations.changes.map((change) => ({
          ...change,
          total: change.total
            ? (parseFloat(change.total) * rate).toFixed(2)
            : "0.00",
        }));

      return updatedOffer;
    });

    updatedHotel.cheapestCombination =
      parseFloat(hotel.cheapestCombination.toString()) * rate;
    updatedHotel.cheapestBasePrice =
      parseFloat(hotel.cheapestBasePrice.toString()) * rate;
    updatedHotel.cheapestCombinationCurrency = newCurrency;

    return updatedHotel;
  });
};
