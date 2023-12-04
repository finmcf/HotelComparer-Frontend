import React from "react";

interface ImageData {
  src: string;
  latitude: string;
  longitude: string;
  city: string;
}

interface DestinationImageProps {
  image: ImageData;
  onImageClick: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

const DestinationImage: React.FC<DestinationImageProps> = ({
  image,
  onImageClick,
}) => {
  return (
    <div className="flex items-center justify-center w-[272.25px] h-[381px]">
      <img
        src={image.src}
        alt={`Travel Destination ${image.city}`}
        data-latitude={image.latitude}
        data-longitude={image.longitude}
        onClick={onImageClick}
        className="rounded-xl cursor-pointer w-[272.25px] h-[381px] object-cover"
      />
    </div>
  );
};

export default DestinationImage;
