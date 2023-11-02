import React, { useState, useEffect } from "react";

const LocationInput = ({ onLocationSelect }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch autocomplete suggestions from your backend
  const fetchSuggestions = async (keyword) => {
    setLoading(true);
    try {
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID; // Ensure these are securely managed in your environment
      const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

      const response = await fetch(
        `https://localhost:7033/api/Autocomplete?keyword=${encodeURIComponent(
          keyword
        )}`,
        {
          method: "GET",
          headers: {
            // Include other headers your backend might require
            ClientId: clientId, // Send the client ID if required by your backend
            ClientSecret: clientSecret, // Send the client secret if required by your backend
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();
      // Assuming your API returns an array under a data property
      setSuggestions(data.data);
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
              key={suggestion.id} // use unique id for key if available
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name} ({suggestion.address.cityName})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
