import React from "react";
import { useLoading } from "../contexts/LoadingContext";
import { BeatLoader } from "react-spinners";
import NavBar from "../components/Navbar";
import SearchArea from "../components/SearchArea";

const Home = () => {
  const { isLoading } = useLoading();

  return (
    <div
      className={`flex flex-col h-screen relative ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      <NavBar />
      <SearchArea />
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
          <BeatLoader color="#FFFFFF" />
        </div>
      )}
    </div>
  );
};

export default Home;
