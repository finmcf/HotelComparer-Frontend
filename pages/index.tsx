// pages/index.tsx

import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import NavBar from "../components/Navbar"; // Assuming NavBar is in components folder
import SearchArea from "../components/SearchArea"; // Importing SearchArea
import CalendarDropdown from "../components/CalendarDropdown";
const Home: NextPage<{ amadeusApiKey: string; amadeusApiSecret: string }> = ({
  amadeusApiKey,
  amadeusApiSecret,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <SearchArea />
      <CalendarDropdown />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const amadeusApiKey = process.env.AMADEUS_API_KEY;
  const amadeusApiSecret = process.env.AMADEUS_API_SECRET;

  return {
    props: {
      amadeusApiKey: amadeusApiKey || "",
      amadeusApiSecret: amadeusApiSecret || "",
    },
  };
};

export default Home;
