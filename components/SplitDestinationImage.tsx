// SplitDestinationImage.tsx
import React from "react";

interface SplitDestinationImageProps {
  src: string;
  alt: string;
}

const SplitDestinationImage: React.FC<SplitDestinationImageProps> = ({
  src,
  alt,
}) => {
  // Calculate the height for each half, accounting for the space between them
  const halfHeight = (381 - 10) / 2; // Total height 381px, minus 10px for space, divided by 2

  return (
    <div className="flex flex-col items-center w-[272.25px]">
      <div className="h-[185.5px] overflow-hidden rounded-t-xl">
        <img
          src={src}
          alt={`${alt} - Top Half`}
          style={{
            width: "272.25px",
            height: `${halfHeight}px`,
            display: "block",
          }}
        />
      </div>
      <div className="h-[185.5px] overflow-hidden rounded-b-xl mt-2.5">
        <img
          src={src}
          alt={`${alt} - Bottom Half`}
          style={{
            width: "272.25px",
            height: `${halfHeight}px`,
            display: "block",
          }}
        />
      </div>
    </div>
  );
};

export default SplitDestinationImage;
