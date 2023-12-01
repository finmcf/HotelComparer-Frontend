// searchAreaInterfaces.ts
export interface Suggestion {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  type: "Hotel" | "Place" | "Locality";
  source: string;
  hotelIds: string[] | null;
  address: string;
}
