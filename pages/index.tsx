import type { NextPage } from "next";
import ReservationSearch from "../components/ReservationSearch/ReservationSearch"; // Import the component

const Home: NextPage = () => {
  return (
    // flex container for centering
    <div className="flex h-screen justify-center items-center">
      <ReservationSearch /> {/* Include the ReservationSearch component here */}
    </div>
  );
};

export default Home;
