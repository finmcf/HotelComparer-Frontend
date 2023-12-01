// Updated interface
interface SplitDestinationImageProps {
  topSrc: string;
  bottomSrc: string;
  alt: string;
}

// Updated component
const SplitDestinationImage: React.FC<SplitDestinationImageProps> = ({
  topSrc,
  bottomSrc,
  alt,
}) => {
  const halfHeight = (381 - 10) / 2;

  return (
    <div className="flex flex-col items-center w-[272.25px]">
      <div className="h-[185.5px] overflow-hidden rounded-xl">
        <img
          src={topSrc}
          alt={`${alt} - Top Half`}
          style={{
            width: "272.25px",
            height: `${halfHeight}px`,
            display: "block",
          }}
        />
      </div>
      <div className="h-[185.5px] overflow-hidden rounded-xl mt-2.5">
        <img
          src={bottomSrc}
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
