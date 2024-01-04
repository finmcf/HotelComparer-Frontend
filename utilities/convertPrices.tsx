// convertPrices.js
export const convertPrices = (hotelData, newCurrencyInfo) => {
  const rate = newCurrencyInfo.exchangeRate.rate;
  const newCurrency = newCurrencyInfo.code;

  return hotelData.map((hotel) => {
    const updatedHotel = { ...hotel };

    updatedHotel.offers = hotel.offers.map((offer) => {
      const updatedOffer = { ...offer };

      updatedOffer.price.currency = newCurrency;
      updatedOffer.price.base = (offer.price.base * rate).toFixed(2);
      updatedOffer.price.total = (offer.price.total * rate).toFixed(2);

      if (updatedOffer.price.variations.average) {
        updatedOffer.price.variations.average.base = (
          offer.price.variations.average.base * rate
        ).toFixed(2);
      }

      updatedOffer.price.variations.changes =
        offer.price.variations.changes.map((change) => ({
          ...change,
          total: (change.total * rate).toFixed(2),
        }));

      return updatedOffer;
    });

    updatedHotel.cheapestCombination = (
      hotel.cheapestCombination * rate
    ).toFixed(2);
    updatedHotel.cheapestBasePrice = (hotel.cheapestBasePrice * rate).toFixed(
      2
    );
    updatedHotel.cheapestCombinationCurrency = newCurrency;

    return updatedHotel;
  });
};
