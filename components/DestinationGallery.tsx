import React, { useState, useEffect } from "react";
import DestinationImage from "./DestinationImage";
import SplitDestinationImage from "./SplitDestinationImage";

const DestinationGallery: React.FC = () => {
  const [isSplitFirst, setIsSplitFirst] = useState(false);

  useEffect(() => {
    // Randomize the order only after component mounts
    setIsSplitFirst(Math.random() < 0.5);
  }, []);

  const renderImages = () => {
    return (
      <>
        {isSplitFirst ? (
          <>
            <SplitDestinationImage
              topSrc="https://via.placeholder.com/272x200"
              bottomSrc="https://via.placeholder.com/272x200"
              alt="Travel Destination 2"
            />
            <DestinationImage
              src="https://via.placeholder.com/272x381"
              alt="Travel Destination 1"
            />
            <SplitDestinationImage
              topSrc="https://via.placeholder.com/272x200"
              bottomSrc="https://via.placeholder.com/272x200"
              alt="Travel Destination 4"
            />
            <DestinationImage
              src="https://via.placeholder.com/272x381"
              alt="Travel Destination 3"
            />
          </>
        ) : (
          <>
            <DestinationImage
              src="https://via.placeholder.com/272x381"
              alt="Travel Destination 1"
            />
            <SplitDestinationImage
              topSrc="https://via.placeholder.com/272x200"
              bottomSrc="https://via.placeholder.com/272x200"
              alt="Travel Destination 2"
            />
            <DestinationImage
              src="https://via.placeholder.com/272x381"
              alt="Travel Destination 3"
            />
            <SplitDestinationImage
              topSrc="https://via.placeholder.com/272x200"
              bottomSrc="https://via.placeholder.com/272x200"
              alt="Travel Destination 4"
            />
          </>
        )}
      </>
    );
  };

  return (
    <div
      className="flex justify-between mx-auto py-2.5"
      style={{ width: "1139px", height: "401px" }}
    >
      {renderImages()}
    </div>
  );
};

export default DestinationGallery;
