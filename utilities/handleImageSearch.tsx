import { useRouter } from "next/router";
import { useGlobal } from "../contexts/GlobalContext";

// Custom hook
export const useImageSearch = () => {
  const router = useRouter();
  const { currency, language, country, setLoading } = useGlobal();

  // Function returned by the hook
  const imageSearch = async (event: React.MouseEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    const latitude = image.dataset.latitude;
    const longitude = image.dataset.longitude;

    let checkInDate = new Date();
    let checkOutDate = new Date(checkInDate.getTime());
    checkOutDate.setDate(checkOutDate.getDate() + 1);

    setLoading(true);

    try {
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
      const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

      const queryParams = new URLSearchParams({
        CheckInDate: checkInDate.toISOString().split("T")[0],
        CheckOutDate: checkOutDate.toISOString().split("T")[0],
        Language: language.code,
        Currency: currency.code,
        CountryOfResidence: country.code,
        Latitude: latitude || "",
        Longitude: longitude || "",
        Radius: "5",
        MaxHotels: "2",
      });

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
      router.push({
        pathname: "/SearchResultsPage",
        query: { data: JSON.stringify(data) },
      });
    } catch (error) {
      console.error("Error in image search:", error);
    } finally {
      setLoading(false);
    }
  };

  return imageSearch;
};
