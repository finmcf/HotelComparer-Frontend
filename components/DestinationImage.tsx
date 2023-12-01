// DestinationImage.tsx
import React from "react";

interface DestinationImageProps {
  src: string;
  alt: string;
}

const DestinationImage: React.FC<DestinationImageProps> = ({ src, alt }) => {
  return (
    <div className="flex items-center justify-center w-[272.25px] h-[381px]">
      <img
        src={src}
        alt={alt}
        className="rounded-xl"
        style={{ width: "272.25px", height: "381px" }}
      />
    </div>
  );
};

export default DestinationImage;
