// handleImageSearch.tsx

import { useFetchHotelData } from "../utilities/fetchHotelData"; // Update the import path as necessary
import { useGlobal } from "../contexts/GlobalContext"; // Import the useGlobal hook

type HandleImageSearchProps = {
  latitude: string;
  longitude: string;
  checkInDate: Date | null;
  checkOutDate: Date | null;
};

export const handleImageSearch = async ({
  latitude,
  longitude,
  checkInDate,
  checkOutDate,
}: HandleImageSearchProps) => {
  const fetchHotelData = useFetchHotelData(); // Initialize custom hook
  const { setLoading } = useGlobal(); // Use the global context

  try {
    setLoading(true); // Start loading
    const data = await fetchHotelData(
      latitude,
      longitude,
      checkInDate,
      checkOutDate,
      [] // Assuming no specific hotelIds are needed for this search
    );
    // Handle the fetched data as needed
    setLoading(false); // Stop loading
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error in image search:", error);
    setLoading(false); // Stop loading in case of error
    throw error; // Rethrow the error for further handling
  }
};
