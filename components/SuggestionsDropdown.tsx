import React from "react";
import { Suggestion } from "../interfaces/SearchAreaInterfaces";
import { IoBed } from "react-icons/io5"; // Bed icon for Hotels
import { IoGlobe } from "react-icons/io5"; // Globe icon for Locality
import { IoLocationSharp } from "react-icons/io5"; // Location icon for Place

interface SuggestionsDropdownProps {
  suggestions: Suggestion[];
  onSelect: (suggestion: Suggestion) => void;
}

const SuggestionsDropdown: React.FC<SuggestionsDropdownProps> = ({
  suggestions,
  onSelect,
}) => {
  const getIcon = (type: "Hotel" | "Place" | "Locality") => {
    switch (type) {
      case "Hotel":
        return <IoBed />;
      case "Locality":
        return <IoGlobe />;
      case "Place":
        return <IoLocationSharp />;
      default:
        return null;
    }
  };

  return (
    <div className="w-[221px] h-[135px] bg-white rounded-[20px] overflow-auto">
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          onClick={() => onSelect(suggestion)}
          className="flex items-center text-black text-xs font-normal font-sans p-2 hover:bg-gray-200 cursor-pointer"
        >
          {getIcon(suggestion.type)}
          <span className="ml-2">{suggestion.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SuggestionsDropdown;
