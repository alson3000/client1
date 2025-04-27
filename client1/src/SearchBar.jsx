import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/search", {
        params: {
          location,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          guests,
        },
      });
      onSearch(response.data);
      console.log("Search Results:", response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="flex items-center justify-between border border-gray-300 rounded-full shadow-md bg-white w-full max-w-3xl mx-auto p-2">
      {/* Location */}
      <div className="flex flex-col px-4 border-r border-gray-300 w-full sm:w-auto">
        <label className="text-xs font-semibold text-gray-500">Location</label>
        <input
          type="text"
          placeholder="Where are you going?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="outline-none text-sm w-full"
        />
      </div>


      {/* Min Price */}
      <div className="flex flex-col px-4 border-r border-gray-300 w-full sm:w-auto">
        <label className="text-xs font-semibold text-gray-500">Min Price (NPR)</label>
        <input
          type="number"
          placeholder="Min price per night"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          min="0"
          className="outline-none text-sm w-full"
        />
      </div>

      {/* Max Price */}
      <div className="flex flex-col px-4 border-r border-gray-300 w-full sm:w-auto">
        <label className="text-xs font-semibold text-gray-500">Max Price (NPR)</label>
        <input
          type="number"
          placeholder="Max price per night"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          min="0"
          className="outline-none text-sm w-full"
        />
      </div>

      {/* Guests */}
      <div className="flex flex-col px-4 w-full sm:w-auto">
        <label className="text-xs font-semibold text-gray-500">Guests</label>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="outline-none text-sm w-full bg-transparent"
        >
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1} {num + 1 === 1 ? "Guest" : "Guests"}
            </option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-sky-500 text-white p-3 rounded-full flex items-center justify-center hover:bg-sky-400 transition w-12 h-12"
      >
        <FaSearch />
      </button>
    </div>
  );
}