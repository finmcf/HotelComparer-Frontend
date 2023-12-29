import React from "react";
import SearchArea from "../components/SearchArea";
import DestinationGallery from "../components/DestinationGallery";

const Home = () => {
  return (
    <div className="flex flex-col">
      <SearchArea />
      <div className="mt-40">
        <DestinationGallery />
      </div>
    </div>
  );
};

export default Home;
