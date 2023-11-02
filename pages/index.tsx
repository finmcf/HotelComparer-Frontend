// pages/index.tsx

import type { NextPage, GetServerSideProps } from "next";
import ReservationSearch from "../components/ReservationSearch/ReservationSearch";

const Home: NextPage<{ amadeusApiKey: string; amadeusApiSecret: string }> = ({
  amadeusApiKey,
  amadeusApiSecret,
}) => {
  return (
    <div className="flex h-screen justify-center items-center">
      <ReservationSearch
        amadeusApiKey={amadeusApiKey}
        amadeusApiSecret={amadeusApiSecret}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch the environment variables
  const amadeusApiKey = process.env.AMADEUS_API_KEY;
  const amadeusApiSecret = process.env.AMADEUS_API_SECRET;

  // Pass them to the page via props
  return {
    props: {
      amadeusApiKey: amadeusApiKey || "", // Fallback to empty string if not found
      amadeusApiSecret: amadeusApiSecret || "", // Fallback to empty string if not found
    },
  };
};

export default Home;
