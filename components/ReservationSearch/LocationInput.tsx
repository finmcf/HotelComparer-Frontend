import React, { useState, useEffect } from "react";

const LocationInput = ({ onLocationSelect }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (keyword) => {
    setLoading(true);
    try {
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
      const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

      const response = await fetch(
        `https://localhost:7033/api/Autocomplete?keyword=${encodeURIComponent(
          keyword
        )}`,
        {
          method: "GET",
          headers: {
            ClientId: clientId,
            ClientSecret: clientSecret,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch suggestions, status: ${response.status}`
        );
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setSuggestions(data);
      } else {
        console.error("Response data is not in expected format:", data);
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      if (input.length >= 3) {
        fetchSuggestions(input);
      } else {
        setSuggestions([]);
      }
    }, 500);
    return () => clearTimeout(debounceFetch);
  }, [input]);

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.name);
    setSuggestions([]);
    onLocationSelect(suggestion);
  };

  return (
    <div className="flex-1 relative">
      <input
        type="text"
        placeholder="Search location"
        className="w-full px-2 py-1 border border-gray-300 rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
      />
      {loading && (
        <div className="absolute left-0 right-0 bg-white text-center py-1">
          Loading...
        </div>
      )}
      {suggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 max-h-60 overflow-auto border border-gray-300 bg-white z-10">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name} ({suggestion.address?.cityName})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
