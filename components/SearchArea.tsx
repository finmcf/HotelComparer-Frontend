import React, { useState, useCallback } from "react";
import LocationInput from "./ReservationSearch/LocationInput";
import SuggestionsDropdown from "./SuggestionsDropdown";

interface Suggestion {
  id: string;
  name: string;
  address?: {
    cityName: string;
  };
}

const SearchArea: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Suggestion | null>(
    null
  );

  const handleLocationSelect = (location: Suggestion) => {
    setSelectedLocation(location);
    setSuggestions([]);
  };

  const updateSuggestions = useCallback((newSuggestions: Suggestion[]) => {
    setSuggestions(newSuggestions);
  }, []);

  return (
    <div className="w-full h-[238px] relative flex-col justify-start items-start">
      <img
        className="w-full max-w-[1163px] h-[181px] rounded-bl-[10px] rounded-br-[10px] mx-auto"
        src="https://via.placeholder.com/1163x181"
        alt="Search Area"
      />

      <div className="w-full max-w-[755px] h-[66px] bg-neutral-100 rounded-[50px] relative mx-auto mt-[-33px]">
        <button className="w-[51px] h-[51px] left-[663px] top-[8px] absolute bg-white rounded-full flex justify-center items-center focus:outline-none">
          <span className="text-black">&#x2192;</span>
        </button>
        <div className="w-[35px] h-[0px] left-[378px] top-[51px] absolute origin-top-left -rotate-90 border border-neutral-200"></div>
        <div className="w-10 h-[0px] left-[221px] top-[53.01px] absolute origin-top-left -rotate-90 border border-neutral-200"></div>
        <div className="w-10 h-[0px] left-[512px] top-[53.01px] absolute origin-top-left -rotate-90 border border-neutral-200"></div>
        <div className="pl-[17px] pr-[13px] pt-2.5 pb-[5px] left-[226px] top-[8px] absolute flex-col justify-end items-start gap-1.5 inline-flex">
          <div className="text-black text-xs font-normal font-sans">
            Check-in
          </div>
          <div className="text-black text-xs font-normal font-sans">
            Check-in Date
          </div>
        </div>
        <div className="pl-[17px] pr-3.5 pt-2.5 pb-[5px] left-[393px] top-[8px] absolute flex-col justify-end items-start gap-1.5 inline-flex">
          <div className="text-black text-xs font-normal font-sans">
            Check-out
          </div>
          <div className="text-black text-xs font-normal font-sans">
            Check-out Date
          </div>
        </div>
        <div className="absolute" style={{ left: "37px", top: "8px" }}>
          <LocationInput
            onLocationSelect={handleLocationSelect}
            updateSuggestions={updateSuggestions}
            selectedLocation={selectedLocation}
          />
          {suggestions.length > 0 && (
            <div className="w-[221px] h-[135px] left-[5px] top-[66px] absolute bg-white rounded-[20px]">
              <SuggestionsDropdown
                suggestions={suggestions}
                onSelect={handleLocationSelect}
              />
            </div>
          )}
        </div>
        <div className="pl-[17px] pr-3.5 pt-2.5 pb-[5px] left-[542px] top-[8px] absolute flex-col justify-end items-start gap-1.5 inline-flex">
          <div className="text-black text-xs font-normal font-sans">Guests</div>
          <div className="text-black text-xs font-normal font-sans">Guests</div>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;