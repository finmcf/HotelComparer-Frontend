import React, { useState, useEffect } from "react";
import DestinationImage from "./DestinationImage";
import SplitDestinationImage from "./SplitDestinationImage";
import imageData from "../data/split_city_images.json"; // Importing the JSON data
import { useImageSearch } from "../utilities/handleImageSearch"; // Adjust the path as necessary

interface ImageData {
  src: string;
  latitude: string;
  longitude: string;
  city: string;
}

interface SplitDestinationImageProps {
  topImage: ImageData;
  bottomImage: ImageData;
  onImageClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

const DestinationGallery: React.FC = () => {
  const [isSplitFirst, setIsSplitFirst] = useState<boolean>(false);
  const [imagePairs, setImagePairs] = useState<Array<[ImageData, ImageData]>>(
    []
  );

  const imageSearch = useImageSearch(); // Using the useImageSearch hook

  useEffect(() => {
    const shuffledImages: ImageData[] = [...imageData].sort(
      () => 0.5 - Math.random()
    );
    const pairs: Array<[ImageData, ImageData]> = [];
    for (let i = 0; i < shuffledImages.length; i += 2) {
      pairs.push([shuffledImages[i], shuffledImages[i + 1]]);
    }

    setImagePairs(pairs);
    setIsSplitFirst(Math.random() < 0.5);
  }, []);

  const renderImages = () => {
    const components: JSX.Element[] = [];

    for (let i = 0; i < imagePairs.length; i++) {
      const pair = imagePairs[i];

      // Alternate starting with SplitDestinationImage or DestinationImage
      if (isSplitFirst) {
        components.push(
          <SplitDestinationImage
            key={`split-${i}`}
            topImage={pair[0]}
            bottomImage={pair[1]}
            onImageClick={(event) => imageSearch(event)}
          />
        );
      }

      // Add DestinationImage in between or at the end
      components.push(
        <DestinationImage
          key={`dest-${i}`}
          src="https://via.placeholder.com/272x381"
          alt={`Travel Destination ${i + 1}`}
        />
      );

      // If we started with DestinationImage, add SplitDestinationImage after it
      if (!isSplitFirst) {
        components.push(
          <SplitDestinationImage
            key={`split-${i}`}
            topImage={pair[0]}
            bottomImage={pair[1]}
            onImageClick={(event) => imageSearch(event)}
          />
        );
      }
    }

    return <>{components}</>;
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
