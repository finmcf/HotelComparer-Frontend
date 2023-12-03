import { useRouter } from "next/router";
import { useGlobal } from "../contexts/GlobalContext";

export const useFetchHotelData = () => {
  const router = useRouter();
  const { currency, language, country, setLoading } = useGlobal();

  const fetchHotelData = async (
    latitude: string = "",
    longitude: string = "",
    checkInDate: Date | null = null,
    checkOutDate: Date | null = null,
    hotelIds: string[] = []
  ) => {
    setLoading(true); // Start loading

    try {
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
      const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

      const queryParams = new URLSearchParams({
        CheckInDate: checkInDate ? checkInDate.toISOString().split("T")[0] : "",
        CheckOutDate: checkOutDate
          ? checkOutDate.toISOString().split("T")[0]
          : "",
        Language: language.code,
        Currency: currency.code,
        CountryOfResidence: country.code,
        Latitude: latitude,
        Longitude: longitude,
        Radius: "5",
        MaxHotels: "2",
      });

      if (hotelIds.length > 0) {
        queryParams.set("HotelIds", hotelIds.join(","));
      }

      const response = await fetch(
        `https://localhost:7033/api/Hotels?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            ClientID: clientId ?? "",
            ClientSecret: clientSecret ?? "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Navigate to the search results page
      router.push({
        pathname: "/SearchResultsPage",
        query: { data: JSON.stringify(data) },
      });

      return data;
    } catch (error) {
      console.error("Error fetching hotel data:", error);
      throw error;
    } finally {
      setLoading(false); // Stop loading regardless of the result
    }
  };

  return fetchHotelData;
};
