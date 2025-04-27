import {Link, useParams} from "react-router-dom";
import AccountNav from "../AccountNav";
import {useEffect, useState} from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";


export default function PlacesPage() {
    const [places,setPlaces] = useState([]);
    useEffect(() => {
        console.log("Making GET request to /places...");

        axios.get('http://localhost:5000/user-places', { withCredentials:true})
        .then(({data}) => {
            console.log("Fetched places: ", data);
            setPlaces(data);
        })
        .catch(error => {
            console.error("Error fetching places: ",error);
        })
    }, []);
    return(
        <div>
            <AccountNav/>
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-sky-500 text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
            
            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <Link to={`/account/places/${place.id}`} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl mb-4 items-center">
                        <div className="flex w-32 h-32 bg-gray-300 shrink-0 overflow-hidden">
                            <PlaceImg place={place} />
                        </div>

                        <div className="flex flex-col justify-between grow min-h-[6rem]">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2 line-clamp-3">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}