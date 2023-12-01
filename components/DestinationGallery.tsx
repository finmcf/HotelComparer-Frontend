// DestinationGallery.tsx
import React from "react";
import DestinationImage from "./DestinationImage";
import SplitDestinationImage from "./SplitDestinationImage";

const DestinationGallery: React.FC = () => {
  return (
    <div
      className="flex justify-between mx-auto py-2.5"
      style={{ width: "1139px", height: "401px" }} // Fixed width
    >
      <DestinationImage
        src="https://via.placeholder.com/272x381"
        alt="Travel Destination 1"
      />
      <SplitDestinationImage
        src="https://via.placeholder.com/272x381"
        alt="Travel Destination 2"
      />
      <DestinationImage
        src="https://via.placeholder.com/272x381"
        alt="Travel Destination 3"
      />
      <SplitDestinationImage
        src="https://via.placeholder.com/272x381"
        alt="Travel Destination 4"
      />
    </div>
  );
};

export default DestinationGallery;
