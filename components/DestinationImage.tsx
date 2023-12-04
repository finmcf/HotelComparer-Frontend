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
    <div className="relative w-[272.25px] h-[381px] rounded-xl overflow-hidden">
      <img
        src={image.src}
        alt={`Travel Destination ${image.city}`}
        data-latitude={image.latitude}
        data-longitude={image.longitude}
        onClick={onImageClick}
        className="cursor-pointer w-full h-full object-cover"
      />
      <div className="absolute bottom-2.5 left-2.5 min-w-[110px] h-[32px] flex justify-center items-center bg-black bg-opacity-75 rounded-xl px-2">
        <span className="text-white text-s font-normal font-sans">
          {image.city}
        </span>
      </div>
    </div>
  );
};

export default DestinationImage;
