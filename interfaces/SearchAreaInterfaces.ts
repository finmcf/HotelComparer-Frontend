// searchAreaInterfaces.ts

export interface Suggestion {
  id: string;
  name: string;
  address?: {
    cityName: string;
  };
}
