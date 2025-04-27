// // // // import PhotosUploader from "../PhotosUploader.jsx";
// // // // import Perks from "../Perks.jsx";
// // // // import {useEffect, useState} from "react";
// // // // import axios from "axios";
// // // // import AccountNav from "../AccountNav.jsx";
// // // // import {Navigate, useParams} from "react-router-dom";


// // // // export default function PlacesFormPage() {
// // // //     const {id} = useParams();
// // // //     const [title,setTitle] = useState('');
// // // //     const [address,setAddress] = useState('');
// // // //     const [addedPhotos,setAddedPhotos] = useState([]);  
// // // //     const [description,setDescription] = useState('');
// // // //     const [perks,setPerks] = useState([]);
// // // //     const [extraInfo,setExtraInfo] = useState('');
// // // //     const [checkIn,setCheckIn] = useState('');
// // // //     const [checkOut,setCheckOut] = useState('');
// // // //     const [maxGuests,setMaxGuests] = useState(1);
// // // //     const [price,setPrice] = useState(100);
// // // //     const [redirect,setRedirect] = useState(false);
// // // //     const [error, setError] = useState('');

// // // //     useEffect(() => {
// // // //         if (!id) {
// // // //             return;
// // // //         }
// // // //         axios.get('http://localhost:5000/places/'+id).then(response => {
// // // //             const {data} = response;
// // // //             setTitle(data.title);
// // // //             setAddress(data.address);
// // // //             setAddedPhotos(data.photos);
// // // //             setDescription(data.description);
// // // //             setPerks(data.perks);
// // // //             setExtraInfo(data.extraInfo);
// // // //             setCheckIn(data.checkIn);
// // // //             setCheckOut(data.checkOut);
// // // //             setMaxGuests(data.maxGuests);
// // // //             setPrice(data.price);
// // // //         })
// // // //     }, [id]);

// // // //     function inputHeader(text){
// // // //         return (
// // // //             <h2 className="text-2xl mt-4">{text}</h2>
// // // //         );
// // // //     }

// // // //     function inputDescription(text) {
// // // //         return (
// // // //             <p className="text-gray-500 text-sm">{text}<br/></p>
// // // //         );
// // // //     }
  
// // // //     function preInput(header,description){
// // // //         return (
// // // //             <>
// // // //                 {inputHeader(header)}
// // // //                 {inputDescription(description)}
// // // //             </>
// // // //         );
// // // //     }

// // // //     async function savePlace(ev) {
// // // //         ev.preventDefault();
// // // //         const placeData = {
// // // //             title, address, addedPhotos, 
// // // //             description, perks, extraInfo,
// // // //             checkIn, checkOut, maxGuests, price,
// // // //         };

// // // //         if (id) {
// // // //             // update
// // // //             await axios.put('http://localhost:5000/places', {
// // // //                 id, ...placeData
// // // //             });
// // // //             setRedirect(true);
// // // //         } else {
// // // //             // new place 
// // // //             await axios.post('http://localhost:5000/places', placeData);
// // // //             setRedirect(true);
// // // //         }
// // // //     }


// // // //     if (redirect) {
// // // //         return <Navigate to={'/account/places'} />
// // // //     }

// // // //     return(
// // // //         <div>
// // // //             <AccountNav/>
// // // //             <form onSubmit={savePlace}>
// // // //                 {preInput('Title', 'Make it short and catchy')}
// // // //                 <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Eg: My lovely apartment" className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"/>
                    
// // // //                 {preInput('Address', 'Address to this place')}
// // // //                 <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Eg: Pokhara" className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"/>
// // // //                 {preInput('Photos', 'Upload quality photos and more = better ')}
// // // //                 <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

// // // //                 {preInput('Description', 'Describe about the place')}
// // // //                 <textarea value={description} onChange={ev => setDescription(ev.target.value)} className="w-full h-[140px] border border-gray-300 my-1 py-2 px-3 rounded-2xl"/>

// // // //                 {preInput('Perks', 'Highlights about the your place')}
// // // //                 <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
// // // //                 <Perks selected={perks} onChange={setPerks}/>
// // // //                 </div>

// // // //                 {preInput('Extra info', 'House rules, etc')}
// // // //                 <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} className="w-full h-[140px] border border-gray-300 my-1 py-2 px-3 rounded-2xl"/>
                    
// // // //                 {preInput('Check in&out time', 'Add check in and out times')}
                        
                        
// // // //                 <div className="grid gap-2 grid-cols-2 md:grid-cols-4">

// // // //                     <div>
// // // //                         <h3 className="mt-2 -mb-1">Check in time</h3>
// // // //                             <input type="text" value={checkIn} 
// // // //                             onChange={ev => setCheckIn(ev.target.value)} 
// // // //                             placeholder="14:00" 
// // // //                             className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"/>
// // // //                         </div>

// // // //                         <div>
// // // //                             <h3 className="mt-2 -mb-1">Check out time</h3>
// // // //                             <input type="text" value={checkOut} 
// // // //                             onChange={ev => setCheckOut(ev.target.value)} 
// // // //                             placeholder="22:00" 
// // // //                             className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"/>
// // // //                         </div>

// // // //                         <div>
// // // //                             <h3 className="mt-2 -mb-1">Max number of guests</h3>
// // // //                             <input type="number" value={maxGuests} 
// // // //                             onChange={ev => setMaxGuests(ev.target.value)} 
// // // //                             placeholder="5" 
// // // //                             className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"/>
// // // //                         </div>

// // // //                         <div>
// // // //                             <h3 className="mt-2 -mb-1">Price per night</h3>
// // // //                             <input type="number" value={price} 
// // // //                             onChange={ev => setPrice(ev.target.value)} 
// // // //                             placeholder="5" 
// // // //                             className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"/>
// // // //                         </div>

// // // //                     </div>                
// // // //                     <button className="bg-sky-500 p-2 w-full text-white rounded-2xl my-4">Save</button>
// // // //             </form>
// // // //         </div>
// // // //     );
// // // // }




// // // import PhotosUploader from "../PhotosUploader.jsx";
// // // import Perks from "../Perks.jsx";
// // // import { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import AccountNav from "../AccountNav.jsx";
// // // import { Navigate, useParams } from "react-router-dom";

// // // export default function PlacesFormPage() {
// // //   const { id } = useParams();
// // //   const [title, setTitle] = useState('');
// // //   const [address, setAddress] = useState('');
// // //   const [addedPhotos, setAddedPhotos] = useState([]);
// // //   const [description, setDescription] = useState('');
// // //   const [perks, setPerks] = useState([]);
// // //   const [extraInfo, setExtraInfo] = useState('');
// // //   const [checkIn, setCheckIn] = useState('');
// // //   const [checkOut, setCheckOut] = useState('');
// // //   const [maxGuests, setMaxGuests] = useState(1);
// // //   const [price, setPrice] = useState(100);
// // //   const [redirect, setRedirect] = useState(false);
// // //   const [error, setError] = useState(''); // For error messages

// // //   useEffect(() => {
// // //     if (!id) return;
// // //     axios.get(`http://localhost:5000/places/${id}`).then((response) => {
// // //       const { data } = response;
// // //       setTitle(data.title);
// // //       setAddress(data.address);
// // //       setAddedPhotos(data.photos);
// // //       setDescription(data.description);
// // //       setPerks(data.perks);
// // //       setExtraInfo(data.extraInfo);
// // //       setCheckIn(data.checkIn);
// // //       setCheckOut(data.checkOut);
// // //       setMaxGuests(data.maxGuests);
// // //       setPrice(data.price);
// // //     });
// // //   }, [id]);

// // //   function inputHeader(text) {
// // //     return <h2 className="text-2xl mt-4">{text}</h2>;
// // //   }

// // //   function inputDescription(text) {
// // //     return <p className="text-gray-500 text-sm">{text}<br /></p>;
// // //   }

// // //   function preInput(header, description) {
// // //     return (
// // //       <>
// // //         {inputHeader(header)}
// // //         {inputDescription(description)}
// // //       </>
// // //     );
// // //   }

// // //   async function savePlace(ev) {
// // //     ev.preventDefault();

// // //     // Validate photos
// // //     if (addedPhotos.length === 0) {
// // //       setError("Please upload at least one photo.");
// // //       return;
// // //     }

// // //     const placeData = {
// // //       title,
// // //       address,
// // //       addedPhotos,
// // //       description,
// // //       perks,
// // //       extraInfo,
// // //       checkIn,
// // //       checkOut,
// // //       maxGuests,
// // //       price,
// // //     };

// // //     try {
// // //       if (id) {
// // //         // Update existing place
// // //         await axios.put("http://localhost:5000/places", { id, ...placeData });
// // //         alert("Place updated successfully!"); // Replace with toast if using a library
// // //       } else {
// // //         // Add new place
// // //         await axios.post("http://localhost:5000/places", placeData);
// // //         alert("Place added successfully!"); // Replace with toast if using a library
// // //       }
// // //       setRedirect(true);
// // //     } catch (err) {
// // //       setError("Failed to save place. Please try again.");
// // //       console.error(err);
// // //     }
// // //   }

// // //   if (redirect) {
// // //     return <Navigate to={"/account/places"} />;
// // //   }

// // //   return (
// // //     <div>
// // //       <AccountNav />
// // //       {error && <p className="text-red-500">{error}</p>} {/* Display error */}
// // //       <form onSubmit={savePlace}>
// // //         {preInput("Title", "Make it short and catchy")}
// // //         <input
// // //           type="text"
// // //           value={title}
// // //           onChange={(ev) => setTitle(ev.target.value)}
// // //           placeholder="Eg: My lovely apartment"
// // //           className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// // //         />

// // //         {preInput("Address", "Address to this place")}
// // //         <input
// // //           type="text"
// // //           value={address}
// // //           onChange={(ev) => setAddress(ev.target.value)}
// // //           placeholder="Eg: Pokhara"
// // //           className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// // //         />
// // //         {preInput("Photos", "Upload quality photos and more = better")}
// // //         <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

// // //         {preInput("Description", "Describe about the place")}
// // //         <textarea
// // //           value={description}
// // //           onChange={(ev) => setDescription(ev.target.value)}
// // //           className="w-full h-[140px] border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// // //         />

// // //         {preInput("Perks", "Highlights about the your place")}
// // //         <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
// // //           <Perks selected={perks} onChange={setPerks} />
// // //         </div>

// // //         {preInput("Extra info", "House rules, etc")}
// // //         <textarea
// // //           value={extraInfo}
// // //           onChange={(ev) => setExtraInfo(ev.target.value)}
// // //           className="w-full h-[140px] border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// // //         />

// // //         {preInput("Check in&out time", "Add check in and out times")}
// // //         <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
// // //           <div>
// // //             <h3 className="mt-2 -mb-1">Check in time</h3>
// // //             <input
// // //               type="text"
// // //               value={checkIn}
// // //               onChange={(ev) => setCheckIn(ev.target.value)}
// // //               placeholder="14:00"
// // //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// // //             />
// // //           </div>
// // //           <div>
// // //             <h3 className="mt-2 -mb-1">Check out time</h3>
// // //             <input
// // //               type="text"
// // //               value={checkOut}
// // //               onChange={(ev) => setCheckOut(ev.target.value)}
// // //               placeholder="22:00"
// // //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// // //             />
// // //           </div>
// // //           <div>
// // //             <h3 className="mt-2 -mb-1">Max number of guests</h3>
// // //             <input
// // //               type="number"
// // //               value={maxGuests}
// // //               onChange={(ev) => setMaxGuests(ev.target.value)}
// // //               placeholder="5"
// // //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// // //             />
// // //           </div>
// // //           <div>
// // //             <h3 className="mt-2 -mb-1">Price per night</h3>
// // //             <input
// // //               type="number"
// // //               value={price}
// // //               onChange={(ev) => setPrice(ev.target.value)}
// // //               placeholder="5"
// // //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// // //             />
// // //           </div>
// // //         </div>
// // //         <button className="bg-sky-500 p-2 w-full text-white rounded-2xl my-4">
// // //           Save
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }


// // import PhotosUploader from "../PhotosUploader.jsx";
// // import Perks from "../Perks.jsx";
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import AccountNav from "../AccountNav.jsx";
// // import { Navigate, useParams } from "react-router-dom";

// // export default function PlacesFormPage() {
// //   const { id } = useParams();
// //   const [title, setTitle] = useState('');
// //   const [address, setAddress] = useState('');
// //   const [addedPhotos, setAddedPhotos] = useState([]);
// //   const [description, setDescription] = useState('');
// //   const [perks, setPerks] = useState([]);
// //   const [extraInfo, setExtraInfo] = useState('');
// //   const [checkIn, setCheckIn] = useState('');
// //   const [checkOut, setCheckOut] = useState('');
// //   const [maxGuests, setMaxGuests] = useState(1);
// //   const [price, setPrice] = useState(100);
// //   const [redirect, setRedirect] = useState(false);

// //   useEffect(() => {
// //     if (!id) return;
// //     axios.get(`http://localhost:5000/places/${id}`).then((response) => {
// //       const { data } = response;
// //       setTitle(data.title);
// //       setAddress(data.address);
// //       setAddedPhotos(data.photos);
// //       setDescription(data.description);
// //       setPerks(data.perks);
// //       setExtraInfo(data.extraInfo);
// //       setCheckIn(data.checkIn);
// //       setCheckOut(data.checkOut);
// //       setMaxGuests(data.maxGuests);
// //       setPrice(data.price);
// //     });
// //   }, [id]);

// //   function inputHeader(text) {
// //     return <h2 className="text-2xl mt-4">{text}</h2>;
// //   }

// //   function inputDescription(text) {
// //     return <p className="text-gray-500 text-sm">{text}<br /></p>;
// //   }

// //   function preInput(header, description) {
// //     return (
// //       <>
// //         {inputHeader(header)}
// //         {inputDescription(description)}
// //       </>
// //     );
// //   }

// //   async function savePlace(ev) {
// //     ev.preventDefault();

// //     // Validate all required fields
// //     if (!title.trim()) {
// //       alert("Please fill in the Title field.");
// //       return;
// //     }
// //     if (!address.trim()) {
// //       alert("Please fill in the Address field.");
// //       return;
// //     }
// //     if (addedPhotos.length === 0) {
// //       alert("Please upload at least one photo.");
// //       return;
// //     }
// //     if (!description.trim()) {
// //       alert("Please fill in the Description field.");
// //       return;
// //     }
// //     if (perks.length === 0) {
// //       alert("Please select at least one perk.");
// //       return;
// //     }
// //     if (!extraInfo.trim()) {
// //       alert("Please fill in the Extra Info field.");
// //       return;
// //     }
// //     if (!checkIn.trim()) {
// //       alert("Please fill in the Check-in time field.");
// //       return;
// //     }
// //     if (!checkOut.trim()) {
// //       alert("Please fill in the Check-out time field.");
// //       return;
// //     }
// //     if (!maxGuests || maxGuests < 1) {
// //       alert("Please specify a valid number of maximum guests (at least 1).");
// //       return;
// //     }
// //     if (!price || price < 1) {
// //       alert("Please specify a valid price per night (at least 1).");
// //       return;
// //     }

// //     const placeData = {
// //       title,
// //       address,
// //       addedPhotos,
// //       description,
// //       perks,
// //       extraInfo,
// //       checkIn,
// //       checkOut,
// //       maxGuests,
// //       price,
// //     };

// //     try {
// //       if (id) {
// //         // Update existing place
// //         await axios.put("http://localhost:5000/places", { id, ...placeData });
// //         alert("Place updated successfully!");
// //       } else {
// //         // Add new place
// //         await axios.post("http://localhost:5000/places", placeData);
// //         alert("Place added successfully!");
// //       }
// //       setRedirect(true);
// //     } catch (err) {
// //       alert("Failed to save place. Please try again.");
// //       console.error(err);
// //     }
// //   }

// //   if (redirect) {
// //     return <Navigate to={"/account/places"} />;
// //   }

// //   return (
// //     <div>
// //       <AccountNav />
// //       <form onSubmit={savePlace}>
// //         {preInput("Title", "Make it short and catchy")}
// //         <input
// //           type="text"
// //           value={title}
// //           onChange={(ev) => setTitle(ev.target.value)}
// //           placeholder="Eg: My lovely apartment"
// //           className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //         />

// //         {preInput("Address", "Address to this place")}
// //         <input
// //           type="text"
// //           value={address}
// //           onChange={(ev) => setAddress(ev.target.value)}
// //           placeholder="Eg: Pokhara"
// //           className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //         />
// //         {preInput("Photos", "Upload quality photos and more = better")}
// //         <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

// //         {preInput("Description", "Describe about the place")}
// //         <textarea
// //           value={description}
// //           onChange={(ev) => setDescription(ev.target.value)}
// //           className="w-full h-[140px] border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //         />

// //         {preInput("Perks", "Highlights about the your place")}
// //         <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
// //           <Perks selected={perks} onChange={setPerks} />
// //         </div>

// //         {preInput("Extra info", "House rules, etc")}
// //         <textarea
// //           value={extraInfo}
// //           onChange={(ev) => setExtraInfo(ev.target.value)}
// //           className="w-full h-[140px] border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //         />

// //         {preInput("Check in&out time", "Add check in and out times")}
// //         <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
// //           <div>
// //             <h3 className="mt-2 -mb-1">Check in time</h3>
// //             <input
// //               type="text"
// //               value={checkIn}
// //               onChange={(ev) => setCheckIn(ev.target.value)}
// //               placeholder="14:00"
// //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //             />
// //           </div>
// //           <div>
// //             <h3 className="mt-2 -mb-1">Check out time</h3>
// //             <input
// //               type="text"
// //               value={checkOut}
// //               onChange={(ev) => setCheckOut(ev.target.value)}
// //               placeholder="22:00"
// //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //             />
// //           </div>
// //           <div>
// //             <h3 className="mt-2 -mb-1">Max number of guests</h3>
// //             <input
// //               type="number"
// //               value={maxGuests}
// //               onChange={(ev) => setMaxGuests(ev.target.value)}
// //               placeholder="5"
// //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //             />
// //           </div>
// //           <div>
// //             <h3 className="mt-2 -mb-1">Price per night</h3>
// //             <input
// //               type="number"
// //               value={price}
// //               onChange={(ev) => setPrice(ev.target.value)}
// //               placeholder="5"
// //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //             />
// //           </div>
// //         </div>
// //         <button className="bg-sky-500 p-2 w-full text-white rounded-2xl my-4">
// //           Save
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }




// // import PhotosUploader from "../PhotosUploader.jsx";
// // import Perks from "../Perks.jsx";
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import AccountNav from "../AccountNav.jsx";
// // import { Navigate, useParams } from "react-router-dom";
// // import { toast } from "react-toastify";

// // export default function PlacesFormPage() {
// //   const { id } = useParams();
// //   const [title, setTitle] = useState('');
// //   const [address, setAddress] = useState('');
// //   const [addedPhotos, setAddedPhotos] = useState([]);
// //   const [description, setDescription] = useState('');
// //   const [perks, setPerks] = useState([]);
// //   const [extraInfo, setExtraInfo] = useState('');
// //   const [checkIn, setCheckIn] = useState('');
// //   const [checkOut, setCheckOut] = useState('');
// //   const [maxGuests, setMaxGuests] = useState(1);
// //   const [price, setPrice] = useState(100);
// //   const [redirect, setRedirect] = useState(false);

// //   useEffect(() => {
// //     if (!id) return;
// //     axios.get(`http://localhost:5000/places/${id}`).then((response) => {
// //       const { data } = response;
// //       setTitle(data.title || '');
// //       setAddress(data.address || '');
// //       setAddedPhotos(data.photos || []);
// //       setDescription(data.description || '');
// //       setPerks(data.perks || []);
// //       setExtraInfo(data.extraInfo || '');
// //       setCheckIn(data.checkIn || '');
// //       setCheckOut(data.checkOut || '');
// //       setMaxGuests(data.maxGuests || 1);
// //       setPrice(data.price || 1);
// //     }).catch((err) => {
// //         console.error("Failed to fetch place:", err);
// //         toast.error("Failed to load place data.");
// //       });
// //   }, [id]);

// //   function inputHeader(text) {
// //     return <h2 className="text-2xl mt-4">{text}</h2>;
// //   }

// //   function inputDescription(text) {
// //     return <p className="text-gray-500 text-sm">{text}<br /></p>;
// //   }

// //   function preInput(header, description) {
// //     return (
// //       <>
// //         {inputHeader(header)}
// //         {inputDescription(description)}
// //       </>
// //     );
// //   }

// //   async function savePlace(ev) {
// //     ev.preventDefault();

// //     // Validate all required fields
// //     if (!title?.trim()) {
// //       toast.error("Please fill in the Title field.");
// //       return;
// //     }
// //     if (!address?.trim()) {
// //       toast.error("Please fill in the Address field.");
// //       return;
// //     }
// //     if (!addedPhotos || addedPhotos.length === 0) {
// //       toast.error("Please upload at least one photo.");
// //       return;
// //     }
// //     if (!description?.trim()) {
// //       toast.error("Please fill in the Description field.");
// //       return;
// //     }
// //     if (!perks || perks.length === 0) {
// //       toast.error("Please select at least one perk.");
// //       return;
// //     }
// //     if (!extraInfo?.trim()) {
// //       toast.error("Please fill in the Extra Info field.");
// //       return;
// //     }
// //     if (!checkIn?.trim()) {
// //       toast.error("Please fill in the Check-in time field.");
// //       return;
// //     }
// //     if (!checkOut?.trim()) {
// //       toast.error("Please fill in the Check-out time field.");
// //       return;
// //     }
// //     if (!maxGuests || maxGuests < 1) {
// //       toast.error("Please specify a valid number of maximum guests (at least 1).");
// //       return;
// //     }
// //     if (!price || price < 1) {
// //       toast.error("Please specify a valid price per night (at least 1).");
// //       return;
// //     }

// //     const placeData = {
// //       title,
// //       address,
// //       addedPhotos,
// //       description,
// //       perks,
// //       extraInfo,
// //       checkIn,
// //       checkOut,
// //       maxGuests,
// //       price,
// //     };

// //     try {
// //       if (id) {
// //         // Update existing place
// //         await axios.put("http://localhost:5000/places", { id, ...placeData });
// //         toast.success("Place updated successfully!");
// //       } else {
// //         // Add new place
// //         await axios.post("http://localhost:5000/places", placeData);
// //         toast.success("Place added successfully!");
// //       }
// //       setRedirect(true);
// //     } catch (err) {
// //       toast.error("Failed to save place. Please try again.");
// //       console.error(err);
// //     }
// //   }

// //   if (redirect) {
// //     return <Navigate to={"/account/places"} />;
// //   }

// //   return (
// //     <div>
// //       <AccountNav />
// //       <form onSubmit={savePlace}>
// //         {preInput("Title", "Make it short and catchy")}
// //         <input
// //           type="text"
// //           value={title}
// //           onChange={(ev) => setTitle(ev.target.value)}
// //           placeholder="Eg: My lovely apartment"
// //           className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //         />

// //         {preInput("Address", "Address to this place")}
// //         <input
// //           type="text"
// //           value={address}
// //           onChange={(ev) => setAddress(ev.target.value)}
// //           placeholder="Eg: Pokhara"
// //           className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //         />
// //         {preInput("Photos", "Upload quality photos and more = better")}
// //         <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

// //         {preInput("Description", "Describe about the place")}
// //         <textarea
// //           value={description}
// //           onChange={(ev) => setDescription(ev.target.value)}
// //           className="w-full h-[140px] border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //         />

// //         {preInput("Perks", "Highlights about the your place")}
// //         <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
// //           <Perks selected={perks} onChange={setPerks} />
// //         </div>

// //         {preInput("Extra info", "House rules, etc")}
// //         <textarea
// //           value={extraInfo}
// //           onChange={(ev) => setExtraInfo(ev.target.value)}
// //           className="w-full h-[140px] border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //         />

// //         {preInput("Check in&out time", "Add check in and out times")}
// //         <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
// //           <div>
// //             <h3 className="mt-2 -mb-1">Check in time</h3>
// //             <input
// //               type="text"
// //               value={checkIn}
// //               onChange={(ev) => setCheckIn(ev.target.value)}
// //               placeholder="14:00"
// //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //             />
// //           </div>
// //           <div>
// //             <h3 className="mt-2 -mb-1">Check out time</h3>
// //             <input
// //               type="text"
// //               value={checkOut}
// //               onChange={(ev) => setCheckOut(ev.target.value)}
// //               placeholder="22:00"
// //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //             />
// //           </div>
// //           <div>
// //             <h3 className="mt-2 -mb-1">Max number of guests</h3>
// //             <input
// //               type="number"
// //               value={maxGuests}
// //               onChange={(ev) => setMaxGuests(ev.target.value)}
// //               placeholder="5"
// //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //             />
// //           </div>
// //           <div>
// //             <h3 className="mt-2 -mb-1">Price per night</h3>
// //             <input
// //               type="number"
// //               value={price}
// //               onChange={(ev) => setPrice(ev.target.value)}
// //               placeholder="5"
// //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //             />
// //           </div>
// //         </div>
// //         <button className="bg-sky-500 p-2 w-full text-white rounded-2xl my-4">
// //           Save
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }


// // import PhotosUploader from "../PhotosUploader.jsx";
// // import Perks from "../Perks.jsx";
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import AccountNav from "../AccountNav.jsx";
// // import { Navigate, useParams } from "react-router-dom";
// // import { toast } from "react-toastify";

// // export default function PlacesFormPage() {
// //   const { id } = useParams();
// //   const [title, setTitle] = useState('');
// //   const [address, setAddress] = useState('');
// //   const [addedPhotos, setAddedPhotos] = useState([]);
// //   const [description, setDescription] = useState('');
// //   const [perks, setPerks] = useState([]);
// //   const [extraInfo, setExtraInfo] = useState('');
// //   const [checkIn, setCheckIn] = useState('');
// //   const [checkOut, setCheckOut] = useState('');
// //   const [maxGuests, setMaxGuests] = useState(1);
// //   const [price, setPrice] = useState(100);
// //   const [redirect, setRedirect] = useState(false);

// //   useEffect(() => {
// //     if (!id) return;
// //     axios.get(`http://localhost:5000/places/${id}`).then((response) => {
// //       const { data } = response;
// //       setTitle(data.title || '');
// //       setAddress(data.address || '');
// //       setAddedPhotos(data.photos || []);
// //       setDescription(data.description || '');
// //       setPerks(data.perks || []);
// //       setExtraInfo(data.extraInfo || '');
// //       setCheckIn(data.checkIn || ''); // Ensure string or empty string
// //       setCheckOut(data.checkOut || ''); // Ensure string or empty string
// //       setMaxGuests(data.maxGuests || 1);
// //       setPrice(data.price || 100);
// //     }).catch((err) => {
// //       console.error("Failed to fetch place:", err);
// //       toast.error("Failed to load place data.");
// //     });
// //   }, [id]);

// //   function inputHeader(text) {
// //     return <h2 className="text-2xl mt-4">{text}</h2>;
// //   }

// //   function inputDescription(text) {
// //     return <p className="text-gray-500 text-sm">{text}<br /></p>;
// //   }

// //   function preInput(header, description) {
// //     return (
// //       <>
// //         {inputHeader(header)}
// //         {inputDescription(description)}
// //       </>
// //     );
// //   }

// //   async function savePlace(ev) {
// //     ev.preventDefault();

// //     // Validate all required fields with safe checks
// //     if (!title?.trim()) {
// //       toast.error("Please fill in the Title field.");
// //       return;
// //     }
// //     if (!address?.trim()) {
// //       toast.error("Please fill in the Address field.");
// //       return;
// //     }
// //     if (!addedPhotos || addedPhotos.length === 0) {
// //       toast.error("Please upload at least one photo.");
// //       return;
// //     }
// //     if (!description?.trim()) {
// //       toast.error("Please fill in the Description field.");
// //       return;
// //     }
// //     if (!perks || perks.length === 0) {
// //       toast.error("Please select at least one perk.");
// //       return;
// //     }
// //     if (!extraInfo?.trim()) {
// //       toast.error("Please fill in the Extra Info field.");
// //       return;
// //     }
// //     if (!checkIn?.trim()) {
// //       toast.error("Please fill in the Check-in time field.");
// //       return;
// //     }
// //     if (!checkOut?.trim()) {
// //       toast.error("Please fill in the Check-out time field.");
// //       return;
// //     }
// //     if (!maxGuests || maxGuests < 1) {
// //       toast.error("Please specify a valid number of maximum guests (at least 1).");
// //       return;
// //     }
// //     if (!price || price < 1) {
// //       toast.error("Please specify a valid price per night (at least 1).");
// //       return;
// //     }

// //     const placeData = {
// //       title,
// //       address,
// //       addedPhotos,
// //       description,
// //       perks,
// //       extraInfo,
// //       checkIn,
// //       checkOut,
// //       maxGuests,
// //       price,
// //     };

// //     try {
// //       if (id) {
// //         // Update existing place
// //         await axios.put("http://localhost:5000/places", { id, ...placeData });
// //         toast.success("Place updated successfully!");
// //       } else {
// //         // Add new place
// //         await axios.post("http://localhost:5000/places", placeData);
// //         toast.success("Place added successfully!");
// //       }
// //       setRedirect(true);
// //     } catch (err) {
// //       toast.error("Failed to save place. Please try again.");
// //       console.error(err);
// //     }
// //   }

// //   if (redirect) {
// //     return <Navigate to={"/account/places"} />;
// //   }

// //   return (
// //     <div>
// //       <AccountNav />
// //       <form onSubmit={savePlace}>
// //         {preInput("Title", "Make it short and catchy")}
// //         <input
// //           type="text"
// //           value={title}
// //           onChange={(ev) => setTitle(ev.target.value)}
// //           placeholder="Eg: My lovely apartment"
// //           className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //         />

// //         {preInput("Address", "Address to this place")}
// //         <input
// //           type="text"
// //           value={address}
// //           onChange={(ev) => setAddress(ev.target.value)}
// //           placeholder="Eg: Pokhara"
// //           className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //         />
// //         {preInput("Photos", "Upload quality photos and more = better")}
// //         <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

// //         {preInput("Description", "Describe about the place")}
// //         <textarea
// //           value={description}
// //           onChange={(ev) => setDescription(ev.target.value)}
// //           className="w-full h-[140px] border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //         />

// //         {preInput("Perks", "Highlights about the your place")}
// //         <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
// //           <Perks selected={perks} onChange={setPerks} />
// //         </div>

// //         {preInput("Extra info", "House rules, etc")}
// //         <textarea
// //           value={extraInfo}
// //           onChange={(ev) => setExtraInfo(ev.target.value)}
// //           className="w-full h-[140px] border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //         />

// //         {preInput("Check in&out time", "Add check in and out times")}
// //         <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
// //           <div>
// //             <h3 className="mt-2 -mb-1">Check in time</h3>
// //             <input
// //               type="text"
// //               value={checkIn}
// //               onChange={(ev) => setCheckIn(ev.target.value)}
// //               placeholder="14:00"
// //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //             />
// //           </div>
// //           <div>
// //             <h3 className="mt-2 -mb-1">Check out time</h3>
// //             <input
// //               type="text"
// //               value={checkOut}
// //               onChange={(ev) => setCheckOut(ev.target.value)}
// //               placeholder="22:00"
// //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //             />
// //           </div>
// //           <div>
// //             <h3 className="mt-2 -mb-1">Max number of guests</h3>
// //             <input
// //               type="number"
// //               value={maxGuests}
// //               onChange={(ev) => setMaxGuests(ev.target.value)}
// //               placeholder="5"
// //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //             />
// //           </div>
// //           <div>
// //             <h3 className="mt-2 -mb-1">Price per night</h3>
// //             <input
// //               type="number"
// //               value={price}
// //               onChange={(ev) => setPrice(ev.target.value)}
// //               placeholder="5"
// //               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
// //             />
// //           </div>
// //         </div>
// //         <button className="bg-sky-500 p-2 w-full text-white rounded-2xl my-4">
// //           Save
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }



// import PhotosUploader from "../PhotosUploader.jsx";
// import Perks from "../Perks.jsx";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import AccountNav from "../AccountNav.jsx";
// import { Navigate, useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useNotification } from '../NotificationContext.jsx';

// export default function PlacesFormPage() {
//   const { id } = useParams();
//   const [title, setTitle] = useState('');
//   const [address, setAddress] = useState('');
//   const [addedPhotos, setAddedPhotos] = useState([]);
//   const [description, setDescription] = useState('');
//   const [perks, setPerks] = useState([]);
//   const [extraInfo, setExtraInfo] = useState('');
//   const [checkIn, setCheckIn] = useState('');
//   const [checkOut, setCheckOut] = useState('');
//   const [maxGuests, setMaxGuests] = useState(1);
//   const [price, setPrice] = useState(100.0); // Default to decimal
//   const { triggerNotificationRefresh} = useNotification();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: '',
//   });

//   const [redirect, setRedirect] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/account/places', formData, { withCredentials: true });
//       console.log('Place added successfully');
//       triggerNotificationRefresh();
//       navigate('/account/places');
//     } catch (error) {
//       console.error('Error adding place:', error);
//     }
//   };

//   useEffect(() => {
//     if (!id) return;
//     axios
//       .get(`http://localhost:5000/places/${id}`)
//       .then((response) => {
//         const { data } = response;
//         console.log("API Response:", data); // Debug the response
//         setTitle(data.title || '');
//         setAddress(data.address || '');
//         setAddedPhotos(data.photos || []);
//         setDescription(data.description || '');
//         setPerks(data.perks || []);
//         setExtraInfo(data.extraInfo || '');
//         setCheckIn(data.checkIn || '');
//         setCheckOut(data.checkOut || '');
//         setMaxGuests(data.maxGuests || 1);
//         setPrice(Number(data.price) || 100.0); // Handle decimal
//       })
//       .catch((err) => {
//         console.error("Failed to fetch place:", err);
//         toast.error("Failed to load place data.");
//       });
//   }, [id]);

//   function inputHeader(text) {
//     return <h2 className="text-2xl mt-4">{text}</h2>;
//   }

//   function inputDescription(text) {
//     return <p className="text-gray-500 text-sm">{text}<br /></p>;
//   }

//   function preInput(header, description) {
//     return (
//       <>
//         {inputHeader(header)}
//         {inputDescription(description)}
//       </>
//     );
//   }

//   async function savePlace(ev) {
//     ev.preventDefault();

//     // Validate all required fields
//     if (!title?.trim()) {
//       toast.error("Please fill in the Title field.");
//       return;
//     }
//     if (!address?.trim()) {
//       toast.error("Please fill in the Address field.");
//       return;
//     }
//     if (!addedPhotos || addedPhotos.length === 0) {
//       toast.error("Please upload at least one photo.");
//       return;
//     }
//     if (!description?.trim()) {
//       toast.error("Please fill in the Description field.");
//       return;
//     }
//     if (!perks || perks.length === 0) {
//       toast.error("Please select at least one perk.");
//       return;
//     }
//     if (!extraInfo?.trim()) {
//       toast.error("Please fill in the Extra Info field.");
//       return;
//     }
//     if (!checkIn?.trim()) {
//       toast.error("Please fill in the Check-in time field.");
//       return;
//     }
//     if (!checkOut?.trim()) {
//       toast.error("Please fill in the Check-out time field.");
//       return;
//     }
//     // Optional: Validate time format (HH:MM, 00:00-23:59)
//     const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
//     if (!timeRegex.test(checkIn)) {
//       toast.error("Please enter a valid Check-in time (HH:MM, 00:00-23:59).");
//       return;
//     }
//     if (!timeRegex.test(checkOut)) {
//       toast.error("Please enter a valid Check-out time (HH:MM, 00:00-23:59).");
//       return;
//     }
//     if (!maxGuests || maxGuests < 1) {
//       toast.error("Please specify a valid number of maximum guests (at least 1).");
//       return;
//     }
//     if (!price || price <= 0) {
//       toast.error("Please specify a valid price per night (greater than 0).");
//       return;
//     }

//     const placeData = {
//       title,
//       address,
//       addedPhotos,
//       description,
//       perks,
//       extraInfo,
//       checkIn,
//       checkOut,
//       maxGuests,
//       price,
//     };

//     try {
//       if (id) {
//         await axios.put("http://localhost:5000/places", { id, ...placeData });
//         toast.success("Place updated successfully!");
//       } else {
//         await axios.post("http://localhost:5000/places", placeData);
//         toast.success("Place added successfully!");
//       }
//       setRedirect(true);
//     } catch (err) {
//       toast.error("Failed to save place. Please try again.");
//       console.error("Save error:", err);
//     }
//   }

//   if (redirect) {
//     return <Navigate to={"/account/places"} />;
//   }

//   return (
//     <div>
//       <AccountNav />
//       <form onSubmit={savePlace}>
//         {preInput("Title", "Make it short and catchy")}
//         <input
//           type="text"
//           value={title}
//           onChange={(ev) => setTitle(ev.target.value)}
//           placeholder="Eg: My lovely apartment"
//           className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
//         />

//         {preInput("Address", "Address to this place")}
//         <input
//           type="text"
//           value={address}
//           onChange={(ev) => setAddress(ev.target.value)}
//           placeholder="Eg: Pokhara"
//           className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
//         />
//         {preInput("Photos", "Upload quality photos and more = better")}
//         <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

//         {preInput("Description", "Describe about the place")}
//         <textarea
//           value={description}
//           onChange={(ev) => setDescription(ev.target.value)}
//           className="w-full h-[140px] border border-gray-300 my-1 py-2 px-3 rounded-2xl"
//         />

//         {preInput("Perks", "Highlights about the your place")}
//         <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
//           <Perks selected={perks} onChange={setPerks} />
//         </div>

//         {preInput("Extra info", "House rules, etc")}
//         <textarea
//           value={extraInfo}
//           onChange={(ev) => setExtraInfo(ev.target.value)}
//           className="w-full h-[140px] border border-gray-300 my-1 py-2 px-3 rounded-2xl"
//         />

//         {preInput("Check in&out time", "Add check in and out times")}
//         <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
//           <div>
//             <h3 className="mt-2 -mb-1">Check in time</h3>
//             <input
//               type="text"
//               value={checkIn}
//               onChange={(ev) => setCheckIn(ev.target.value)}
//               placeholder="14:00"
//               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
//             />
//           </div>
//           <div>
//             <h3 className="mt-2 -mb-1">Check out time</h3>
//             <input
//               type="text"
//               value={checkOut}
//               onChange={(ev) => setCheckOut(ev.target.value)}
//               placeholder="12:00"
//               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
//             />
//           </div>
//           <div>
//             <h3 className="mt-2 -mb-1">Max number of guests</h3>
//             <input
//               type="number"
//               value={maxGuests}
//               onChange={(ev) => setMaxGuests(Number(ev.target.value))}
//               placeholder="5"
//               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
//             />
//           </div>
//           <div>
//             <h3 className="mt-2 -mb-1">Price per night</h3>
//             <input
//               type="number"
//               step="0.01" // Allow decimals
//               value={price}
//               onChange={(ev) => setPrice(Number(ev.target.value))}
//               placeholder="100.00"
//               className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
//             />
//           </div>
//         </div>
//         <button className="bg-sky-500 p-2 w-full text-white rounded-2xl my-4">
//           Save
//         </button>
//       </form>
//     </div>
//   );
// }




import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNotification } from '../NotificationContext.jsx';

export default function PlacesFormPage() {
  const { id } = useParams();
  const { triggerNotificationRefresh } = useNotification();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100.0);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:5000/places/${id}`).then((response) => {
      const { data } = response;
      console.log("API Response:", data);
      setTitle(data.title || '');
      setAddress(data.address || '');
      setAddedPhotos(data.photos || []);
      setDescription(data.description || '');
      setPerks(data.perks || []);
      setExtraInfo(data.extraInfo || '');
      setCheckIn(data.checkIn || '');
      setCheckOut(data.checkOut || '');
      setMaxGuests(data.maxGuests || 1);
      setPrice(Number(data.price) || 100.0);
    }).catch((err) => {
      console.error("Failed to fetch place:", err);
      toast.error("Failed to load place data.");
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}<br /></p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();

    // Validate all required fields
    if (!title?.trim()) {
      toast.error("Please fill in the Title field.");
      return;
    }
    if (!address?.trim()) {
      toast.error("Please fill in the Address field.");
      return;
    }
    if (!addedPhotos || addedPhotos.length === 0) {
      toast.error("Please upload at least one photo.");
      return;
    }
    if (!description?.trim()) {
      toast.error("Please fill in the Description field.");
      return;
    }
    if (!perks || perks.length === 0) {
      toast.error("Please select at least one perk.");
      return;
    }
    if (!extraInfo?.trim()) {
      toast.error("Please fill in the Extra Info field.");
      return;
    }
    if (!checkIn?.trim()) {
      toast.error("Please fill in the Check-in time field.");
      return;
    }
    if (!checkOut?.trim()) {
      toast.error("Please fill in the Check-out time field.");
      return;
    }
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(checkIn)) {
      toast.error("Please enter a valid Check-in time (HH:MM, 00:00-23:59).");
      return;
    }
    if (!timeRegex.test(checkOut)) {
      toast.error("Please enter a valid Check-out time (HH:MM, 00:00-23:59).");
      return;
    }
    if (!maxGuests || maxGuests < 1) {
      toast.error("Please specify a valid number of maximum guests (at least 1).");
      return;
    }
    if (!price || price <= 0) {
      toast.error("Please specify a valid price per night (greater than 0).");
      return;
    }

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    try {
      if (id) {
        await axios.put("http://localhost:5000/places", { id, ...placeData });
        toast.success("Place updated successfully!");
        // Trigger refresh if updates generate notifications
        triggerNotificationRefresh();
      } else {
        await axios.post("http://localhost:5000/places", placeData);
        toast.success("Place added successfully!");
        triggerNotificationRefresh();
      }
      setRedirect(true);
    } catch (err) {
      toast.error("Failed to save place. Please try again.");
      console.error("Save error:", err);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput("Title", "Make it short and catchy")}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Eg: My lovely apartment"
          className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
        />
        {preInput("Address", "Address to this place")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="Eg: Pokhara"
          className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
        />
        {preInput("Photos", "Upload quality photos and more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Describe about the place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          className="w-full h-[140px] border border-gray-300 my-1 py-2 px-3 rounded-2xl"
        />
        {preInput("Perks", "Highlights about the your place")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra info", "House rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
          className="w-full h-[140px] border border-gray-300 my-1 py-2 px-3 rounded-2xl"
        />
        {preInput("Check in&out time", "Add check in and out times")}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14:00"
              className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="12:00"
              className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(Number(ev.target.value))}
              placeholder="5"
              className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(ev) => setPrice(Number(ev.target.value))}
              placeholder="100.00"
              className="w-full border border-gray-300 my-1 py-2 px-3 rounded-2xl"
            />
          </div>
        </div>
        <button className="bg-sky-500 p-2 w-full text-white rounded-2xl my-4">
          Save
        </button>
      </form>
    </div>
  );
}