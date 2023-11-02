// components/LocationInput.tsx
import React, { useState, useEffect } from "react";

const LocationInput = ({ onLocationSelect }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch autocomplete suggestions from your backend
  const fetchSuggestions = async (keyword) => {
    setLoading(true);
    try {
      const clientId = process.env.CLIENT_ID;
      const clientSecret = process.env.CLIENT_SECRET;

      // The endpoint should be set up in your backend to handle the request and add Authorization headers as needed.
      const response = await fetch(
        `https://localhost:7033/api/Autocomplete?keyword=${encodeURIComponent(
          keyword
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ClientId: clientId, // Using the client ID from environment variable
            ClientSecret: clientSecret, // Using the client secret from environment variable
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (input.length >= 3) {
      const timerId = setTimeout(() => fetchSuggestions(input), 500);
      return () => clearTimeout(timerId);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.name);
    setSuggestions([]);
    onLocationSelect(suggestion); // Pass the selected suggestion up to the parent component
  };

  return (
    <div className="flex-1 relative">
      <input
        type="text"
        placeholder="Location"
        className="w-full px-2 py-1 border border-gray-300 rounded text-center"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
      />
      {loading && (
        <div className="absolute left-0 right-0 bg-white text-center py-1">
          Loading...
        </div>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 max-h-60 overflow-auto border border-gray-300 bg-white z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
