import { useGlobal } from "../contexts/GlobalContext";
import { useFetchHotelData } from "../utilities/fetchHotelData"; // Import useFetchHotelData

export const useImageSearch = () => {
  const {
    checkInDate, // Access check-in date from global context
    checkOutDate, // Access check-out date from global context
  } = useGlobal();
  const fetchHotelData = useFetchHotelData(); // Initialize useFetchHotelData hook

  const imageSearch = async (event: React.MouseEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    const latitude = image.dataset.latitude;
    const longitude = image.dataset.longitude;

    // Use checkInDate and checkOutDate from global context
    try {
      // Fetch data and navigation is handled inside fetchHotelData
      await fetchHotelData(latitude, longitude, checkInDate, checkOutDate);
    } catch (error) {
      console.error("Error in image search:", error);
    }
  };

  return imageSearch;
};
