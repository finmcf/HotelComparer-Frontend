import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useGlobal } from "../contexts/GlobalContext";
import LocationInput from "./ReservationSearch/LocationInput";
import SuggestionsDropdown from "./SuggestionsDropdown";
import CalendarDropdown from "./CalendarDropdown";
import GuestAndRoomCounterDropdown from "./GuestAndRoomCounterDropdown";
import { Suggestion } from "../interfaces/SearchAreaInterfaces";
import { useFetchHotelData } from "../utilities/fetchHotelData"; // Updated import

type CounterFields = "rooms" | "adults" | "children";

const SearchArea: React.FC = () => {
  const fetchHotelData = useFetchHotelData(); // Initialize custom hook

  const router = useRouter();
  const { currency, language, setLoading } = useGlobal();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Suggestion | null>(
    null
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarForCheckOut, setCalendarForCheckOut] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [counters, setCounters] = useState<Record<CounterFields, number>>({
    rooms: 1,
    adults: 1,
    children: 0,
  });

  const handleLocationSelect = useCallback((location: Suggestion) => {
    setSelectedLocation(location);
    setSuggestions([]);
  }, []);

  const updateSuggestions = useCallback((newSuggestions: Suggestion[]) => {
    setSuggestions(newSuggestions);
  }, []);

  const toggleCalendar = useCallback((forCheckOut: boolean = false) => {
    setCalendarForCheckOut(forCheckOut);
    setShowCalendar((prevShowCalendar) => !prevShowCalendar);
  }, []);

  const handleCheckInDateChange = useCallback((date: Date | null) => {
    setCheckInDate(date);
  }, []);

  const handleCheckOutDateChange = useCallback((date: Date | null) => {
    setCheckOutDate(date);
  }, []);

  const toggleGuestsDropdown = useCallback(() => {
    setShowGuestsDropdown((prevShow) => !prevShow);
  }, []);

  const incrementCounter = useCallback((field: CounterFields) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [field]: prevCounters[field] + 1,
    }));
  }, []);

  const decrementCounter = useCallback((field: CounterFields) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [field]: Math.max(prevCounters[field] - 1, 0),
    }));
  }, []);

  return (
    <div className="w-full h-[238px] relative flex-col justify-start items-start">
      <img
        className="w-full h-[300px] object-cover object-center rounded-bl-lg rounded-br-lg mx-auto max-w-[900px] cursor-pointer"
        src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Scenic View"
        onClick={async () => {
          const latitude = "51.50966"; // Example latitude
          const longitude = "-0.15548"; // Example longitude

          try {
            await fetchHotelData(
              latitude,
              longitude,
              checkInDate,
              checkOutDate,
              [] // No specific hotelIds needed for this search
            );
          } catch (error) {
            console.error("Error in image search:", error);
          }
        }}
      />

      <div className="w-full max-w-[755px] h-[66px] bg-neutral-100 rounded-[50px] relative mx-auto mt-[-33px]">
        <button
          className="w-[51px] h-[51px] left-[663px] top-[8px] absolute bg-white rounded-full flex justify-center items-center focus:outline-none"
          onClick={async () => {
            const latitude = selectedLocation?.latitude?.toString() || "";
            const longitude = selectedLocation?.longitude?.toString() || "";
            const hotelIds = selectedLocation?.hotelIds || []; // Use hotelIds from the selected location

            try {
              await fetchHotelData(
                latitude,
                longitude,
                checkInDate,
                checkOutDate,
                hotelIds
              );
            } catch (error) {
              console.error("Error fetching hotel data:", error);
            }
          }}
        >
          <span className="text-black">&#x2192;</span>
        </button>

        <button
          className="pl-[17px] pr-[13px] pt-2.5 pb-[5px] left-[226px] top-[8px] absolute flex-col justify-end items-start gap-1.5 inline-flex focus:outline-none"
          onClick={() => toggleCalendar(false)}
        >
          <div className="text-black text-xs font-normal font-sans">
            Check-in
          </div>
          <div className="text-black text-xs font-normal font-sans">
            {checkInDate ? checkInDate.toLocaleDateString() : "Check-in Date"}
          </div>
        </button>
        <button
          className="pl-[17px] pr-3.5 pt-2.5 pb-[5px] left-[393px] top-[8px] absolute flex-col justify-end items-start gap-1.5 inline-flex focus:outline-none"
          onClick={() => toggleCalendar(true)}
        >
          <div className="text-black text-xs font-normal font-sans">
            Check-out
          </div>
          <div className="text-black text-xs font-normal font-sans">
            {checkOutDate
              ? checkOutDate.toLocaleDateString()
              : "Check-out Date"}
          </div>
        </button>
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
        <button
          className="pl-[17px] pr-3.5 pt-2.5 pb-[5px] left-[542px] top-[8px] absolute flex-col justify-end items-start gap-1.5 inline-flex focus:outline-none"
          onClick={toggleGuestsDropdown}
        >
          <div className="text-black text-xs font-normal font-sans">Guests</div>
          <div className="text-black text-xs font-normal font-sans">
            Add guests
          </div>
        </button>
        {showGuestsDropdown && (
          <div
            className="absolute bg-white rounded-lg shadow left-0 top-[70px]"
            style={{ zIndex: 1000 }}
          >
            <GuestAndRoomCounterDropdown
              counters={counters}
              incrementCounter={incrementCounter}
              decrementCounter={decrementCounter}
            />
          </div>
        )}
        {showCalendar && (
          <div
            className="absolute bg-white rounded-lg shadow left-[310px] top-[70px]"
            style={{ zIndex: 1000 }}
          >
            <CalendarDropdown
              onCheckInDateChange={handleCheckInDateChange}
              onCheckOutDateChange={handleCheckOutDateChange}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchArea;
