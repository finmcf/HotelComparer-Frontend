import React from "react";

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

const SplitDestinationImage: React.FC<SplitDestinationImageProps> = ({
  topImage,
  bottomImage,
  onImageClick,
}) => {
  const halfHeight = (381 - 10) / 2;

  return (
    <div className="flex flex-col items-center w-[272.25px] ">
      <div className="h-[185.5px] overflow-hidden rounded-xl cursor-pointer">
        <img
          src={topImage.src}
          alt={`${topImage.city} - Top`}
          style={{
            width: "272.25px",
            height: `${halfHeight}px`,
            display: "block",
          }}
          data-latitude={topImage.latitude}
          data-longitude={topImage.longitude}
          onClick={onImageClick}
        />
      </div>
      <div className="h-[185.5px] overflow-hidden rounded-xl mt-2.5 cursor-pointer">
        <img
          src={bottomImage.src}
          alt={`${bottomImage.city} - Bottom`}
          style={{
            width: "272.25px",
            height: `${halfHeight}px`,
            display: "block",
          }}
          data-latitude={bottomImage.latitude}
          data-longitude={bottomImage.longitude}
          onClick={onImageClick}
        />
      </div>
    </div>
  );
};

export default SplitDestinationImage;
