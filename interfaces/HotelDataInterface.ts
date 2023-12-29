// HotelDataInterfaces.ts

export interface Hotel {
  type: string;
  hotelId: string;
  chainCode: string;
  dupeId: string | null;
  name: string;
  cityCode: string;
  latitude: number;
  longitude: number;
  // Add any other relevant fields here.
}

export interface RateFamilyEstimated {
  code: string;
  type: string;
}

export interface RoomTypeEstimated {
  category: string;
  beds: number;
  bedType: string;
}

export interface Room {
  type: string;
  typeEstimated: RoomTypeEstimated;
  description: {
    text: string;
    lang: string;
  };
}

export interface PriceVariation {
  startDate: string;
  endDate: string;
  total: string;
}

export interface Price {
  currency: string;
  base: string;
  total: string;
  variations: {
    average: {
      base: string;
    };
    changes: PriceVariation[];
  };
}

export interface CancellationPolicy {
  amount: string | null;
  deadline: string;
}

export interface Offer {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  rateCode: string;
  rateFamilyEstimated: RateFamilyEstimated;
  room: Room;
  guests: {
    adults: number;
  };
  price: Price;
  policies: {
    cancellations: CancellationPolicy[];
    paymentType: string;
  };
  self: string;
}

export interface HotelData {
  hotel: Hotel;
  offers: Offer[];
  cheapestCombination: number;
  cheapestOfferIds: string[];
  self: string;
}

// You can add more interfaces here if needed for other parts of your data.
