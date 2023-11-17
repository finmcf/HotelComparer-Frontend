import React from "react";

const SuggestionsDropdown = ({ suggestions, onSelect }) => {
  return (
    <div className="w-[221px] h-[135px] bg-white rounded-[20px] overflow-auto">
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          onClick={() => onSelect(suggestion)}
          className="text-black text-xs font-normal font-sans p-2 hover:bg-gray-200 cursor-pointer"
        >
          {suggestion.name}
        </div>
      ))}
    </div>
  );
};

export default SuggestionsDropdown;
