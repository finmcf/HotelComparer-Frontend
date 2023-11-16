// pages/index.tsx

import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import ReservationSearch from "../components/ReservationSearch/ReservationSearch";
import NavBar from "../components/Navbar";

const Home: NextPage<{ amadeusApiKey: string; amadeusApiSecret: string }> = ({
  amadeusApiKey,
  amadeusApiSecret,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 justify-center items-center">
        <ReservationSearch
          amadeusApiKey={amadeusApiKey}
          amadeusApiSecret={amadeusApiSecret}
        />
      </div>
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
