import React, { useState, useEffect } from "react";
import DestinationImage from "./DestinationImage";
import SplitDestinationImage from "./SplitDestinationImage";
import splitImageData from "../data/split_city_images.json";
import cityImageData from "../data/city_images.json";
import { useImageSearch } from "../utilities/handleImageSearch";

interface ImageData {
  src: string;
  latitude: string;
  longitude: string;
  city: string;
}

const DestinationGallery: React.FC = () => {
  const [isSplitFirst, setIsSplitFirst] = useState<boolean>(false);
  const [cityImages, setCityImages] = useState<ImageData[]>([]);

  const imageSearch = useImageSearch();

  useEffect(() => {
    const shuffledCityImages: ImageData[] = [...cityImageData].sort(
      () => 0.5 - Math.random()
    );
    setCityImages(shuffledCityImages.slice(0, 2));
    setIsSplitFirst(Math.random() < 0.5);
  }, []);

  const renderImages = () => {
    const components: JSX.Element[] = [];

    for (let i = 0; i < 2; i++) {
      if (isSplitFirst) {
        components.push(
          <SplitDestinationImage
            key={`split-${i}`}
            topImage={splitImageData[i * 2]}
            bottomImage={splitImageData[i * 2 + 1]}
            onImageClick={(event) => imageSearch(event)}
          />
        );
      }

      // Ensure cityImage is defined before rendering DestinationImage
      if (cityImages[i]) {
        components.push(
          <DestinationImage
            key={`dest-${i}`}
            image={cityImages[i]}
            onImageClick={(event) => imageSearch(event)}
          />
        );
      }

      if (!isSplitFirst) {
        components.push(
          <SplitDestinationImage
            key={`split-${i}`}
            topImage={splitImageData[i * 2]}
            bottomImage={splitImageData[i * 2 + 1]}
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
