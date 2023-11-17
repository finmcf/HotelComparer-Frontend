import React, { useState, useEffect } from "react";

interface Suggestion {
  id: string;
  name: string;
  address?: {
    cityName: string;
  };
}

interface LocationInputProps {
  onLocationSelect: (suggestion: Suggestion) => void;
  updateSuggestions: (suggestions: Suggestion[]) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  onLocationSelect,
  updateSuggestions,
}) => {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSuggestions = async (keyword: string) => {
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
            ClientId: clientId ?? "",
            ClientSecret: clientSecret ?? "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch suggestions, status: ${response.status}`
        );
      }

      const data: Suggestion[] = await response.json();
      updateSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      updateSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (input.length < 3) {
      updateSuggestions([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      fetchSuggestions(input);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [input, updateSuggestions]);

  return (
    <div className="relative pl-[17px] pr-[13px] pt-2.5 pb-[5px] flex-col justify-end items-start gap-1.5 w-full">
      <input
        type="text"
        placeholder="Location"
        className="text-black text-xs font-normal font-sans bg-transparent border-none outline-none w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
      />

      {loading && (
        <div className="absolute left-0 right-0 bg-white text-center py-1">
          Loading...
        </div>
      )}
    </div>
  );
};

export default LocationInput;
