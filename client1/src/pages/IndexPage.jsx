import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar.jsx"

export default function IndexPage(){
  const [places,setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:5000/places').then(response => {
  //     console.log(response.data);
  //     setPlaces(response.data);
  //     setFilteredPlaces(response.data);
  //   });
  // }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/places").then((response) => {
      console.log("Places data:", response.data);
      const parsedPlaces = response.data.map((place) => ({
        ...place,
        photos: typeof place.photos === "string" ? JSON.parse(place.photos) : place.photos,
      }));
      setPlaces(parsedPlaces);
      setFilteredPlaces(parsedPlaces); // Set initial filteredPlaces
    });
  }, []);

  // Reset filteredPlaces when navigating to /
  useEffect(() => {
    if (location.pathname === "/") {
      setFilteredPlaces(places); // Reset to full list
      console.log("Reset filteredPlaces to all places");
    }
  }, [location.pathname, places]);

  const handleSearch = (searchResults) => {
    if (searchResults && searchResults.length === 0) {
      setFilteredPlaces([]);
    } else {
      setFilteredPlaces(searchResults);
    }
  };

    return (
      <div>
        <div className="sticky top-0 bg-transparent z-10 p-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map(place => (
              <Link to={'/place/'+place.id} key={place.id}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  {place.photos?.[0] && (
                    <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:5000/uploads/' + place.photos?.[0]} alt="" />
                  )}
                </div>
                <h2 className="font-bold">{place.address}</h2>
                <h3 className="text-sm text-gray-500">{place.title}</h3>
                <div className="mt-1">
                  <span className="font-bold">NPR {place.price}</span> /night
                </div>
              </Link>
            ))
          ) : (
            <p>No places found based on your search criteria.</p>
          )}
          </div>
        </div>
    );
}