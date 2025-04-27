// // // import AccountNav from "../AccountNav";
// // // import PlaceImg from "../PlaceImg";
// // // import { Link } from "react-router-dom";
// // // import BookingDates from "../BookingDates";
// // // import { useEffect, useState } from "react";
// // // import axios from "axios";

// // // export default function BookingsPage() {
// // //     const [bookings, setBookings] = useState([]);
// // //     const [loading, setLoading] = useState(true);

// // //     useEffect(() => {
// // //         setLoading(true);
// // //         axios.get('http://localhost:5000/bookings')
// // //             .then(response => {
// // //                 console.log(response.data);
// // //                 setBookings(response.data);
// // //                 setLoading(false);
// // //             })
// // //             .catch(error => {
// // //                 console.error('Error fetching bookings:', error);
// // //                 setLoading(false);
// // //             });
// // //     }, []);

// // //     if (loading) {
// // //         return (
// // //             <div className="text-center mt-8">
// // //                 <p>Loading bookings...</p>
// // //             </div>
// // //         );
// // //     }

// // //     return (
// // //         <div>
// // //             <AccountNav />
// // //             <div>
// // //                 {bookings.length === 0 ? (
// // //                     <div className="text-center mt-8">
// // //                         <p>No bookings found.</p>
// // //                         <Link to="/" className="text-blue-500 underline">
// // //                             Browse places to book
// // //                         </Link>
// // //                     </div>
// // //                 ) : (
// // //                     bookings.map(booking => (
// // //                         <Link
// // //                             to={`/account/bookings/${booking.id}`}
// // //                             className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4"
// // //                             key={booking.id}
// // //                         >
// // //                             <div className="w-48">
// // //                                 <PlaceImg place={booking.place} />
// // //                             </div>

// // //                             <div className="py-3 pr-3 grow">
// // //                                 <h2 className="text-xl">{booking.place.title}</h2>

// // //                                 <div className="text-xl">
// // //                                     <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />
// // //                                     <div className="flex gap-1">
// // //                                         <svg
// // //                                             xmlns="http://www.w3.org/2000/svg"
// // //                                             fill="none"
// // //                                             viewBox="0 0 24 24"
// // //                                             strokeWidth={1.5}
// // //                                             stroke="currentColor"
// // //                                             className="w-8 h-8"
// // //                                         >
// // //                                             <path
// // //                                                 strokeLinecap="round"
// // //                                                 strokeLinejoin="round"
// // //                                                 d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
// // //                                             />
// // //                                         </svg>

// // //                                         <span className="text-2xl">
// // //                                             Total price: NPR {booking.price}/-
// // //                                         </span>
// // //                                     </div>
// // //                                     <br />
// // //                                     <h5 className="flex gap-2 items-center">
// // //                                         Payment Status:
// // //                                         <span
// // //                                             className={`px-3 py-1 rounded-full text-white ${
// // //                                                 booking.payment_status === 'paid'
// // //                                                     ? 'bg-green-500'
// // //                                                     : booking.payment_status === 'failed'
// // //                                                     ? 'bg-red-500'
// // //                                                     : 'bg-yellow-500'
// // //                                             }`}
// // //                                         >
// // //                                             {booking.payment_status}
// // //                                         </span>
// // //                                     </h5>
// // //                                 </div>
// // //                             </div>
// // //                         </Link>
// // //                     ))
// // //                 )}
// // //             </div>
// // //         </div>
// // //     );
// // // }

// import AccountNav from "../AccountNav";
// import PlaceImg from "../PlaceImg";
// import { Link } from "react-router-dom";
// import BookingDates from "../BookingDates";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function BookingsPage() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     axios.get("http://localhost:5000/bookings")
//       .then((response) => {
//         console.log(response.data);
//         setBookings(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching bookings:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center mt-8">
//         <p>Loading bookings...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <AccountNav />
//       <div>
//         {bookings.length === 0 ? (
//           <div className="text-center mt-8">
//             <p>No bookings found.</p>
//             <Link to="/" className="text-blue-500 underline">
//               Browse places to book
//             </Link>
//           </div>
//         ) : (
//           bookings.map((booking) => (
//             <Link
//               to={`/account/bookings/${booking.id}`}
//               className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4"
//               key={booking.id}
//             >
//               <div className="w-48 h-48 flex-shrink-0">
//                 <PlaceImg
//                   place={booking.place}
//                   className="w-full h-full"
//                 />
//               </div>

//               <div className="py-3 pr-3 grow">
//                 <h2 className="text-xl">{booking.place.title}</h2>

//                 <div className="text-xl">
//                   <BookingDates
//                     booking={booking}
//                     className="mb-2 mt-4 text-gray-500"
//                   />
//                   <div className="flex gap-1">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-8 h-8"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
//                       />
//                     </svg>

//                     <span className="text-2xl">
//                       Total price: NPR {booking.price}/-
//                     </span>
//                   </div>
//                   <br />
//                   <h5 className="flex gap-2 items-center">
//                     Payment Status:
//                     <span
//                       className={`px-3 py-1 rounded-full text-white ${
//                         booking.payment_status === "paid"
//                           ? "bg-green-500"
//                           : booking.payment_status === "failed"
//                           ? "bg-red-500"
//                           : "bg-yellow-500"
//                       }`}
//                     >
//                       {booking.payment_status}
//                     </span>
//                   </h5>
//                 </div>
//               </div>
//             </Link>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


import AccountNav from "../AccountNav";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/bookings")
      .then((response) => {
        console.log(response.data);
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-8">
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div>
      <AccountNav />
      <div>
        {bookings.length === 0 ? (
          <div className="text-center mt-8">
            <p>No bookings found.</p>
            <Link to="/" className="text-blue-500 underline">
              Browse places to book
            </Link>
          </div>
        ) : (
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking.id}`}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4"
              key={booking.id}
            >
              <div
                style={{ width: "192px", height: "192px" }}
                className="flex-shrink-0"
              >
                <PlaceImg
                  place={booking.place}
                  className="w-full h-full"
                />
              </div>

              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place.title}</h2>

                <div className="text-xl">
                  <BookingDates
                    booking={booking}
                    className="mb-2 mt-4 text-gray-500"
                  />
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>

                    <span className="text-2xl">
                      Total price: NPR {booking.price}/-
                    </span>
                  </div>
                  <br />
                  <h5 className="flex gap-2 items-center">
                    Payment Status:
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        booking.payment_status === "paid"
                          ? "bg-green-500"
                          : booking.payment_status === "failed"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {booking.payment_status}
                    </span>
                  </h5>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}


// import AccountNav from "../AccountNav";
// import PlaceImg from "../PlaceImg";
// import { Link } from "react-router-dom";
// import BookingDates from "../BookingDates";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function BookingsPage() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     axios.get("http://localhost:5000/bookings")
//       .then((response) => {
//         console.log(response.data);
//         setBookings(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching bookings:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center mt-8">
//         <p>Loading bookings...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <AccountNav />
//       <div>
//         {bookings.length === 0 ? (
//           <div className="text-center mt-8">
//             <p>No bookings found.</p>
//             <Link to="/" className="text-blue-500 underline">
//               Browse places to book
//             </Link>
//           </div>
//         ) : (
//           bookings.map((booking) => (
//             <Link
//               to={`/account/bookings/${booking.id}`}
//               className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4"
//               key={booking.id}
//             >
//               <div
//                 style={{
//                   width: "192px",
//                   height: "192px",
//                   padding: 0,
//                   margin: 0,
//                   overflow: "hidden",
//                 }}
//                 className="flex-shrink-0"
//               >
//                 <PlaceImg
//                   place={booking.place}
//                   className="w-full h-full"
//                 />
//               </div>

//               <div className="py-3 pr-3 grow">
//                 <h2 className="text-xl">{booking.place.title}</h2>

//                 <div className="text-xl">
//                   <BookingDates
//                     booking={booking}
//                     className="mb-2 mt-4 text-gray-500"
//                   />
//                   <div className="flex gap-1">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-8 h-8"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
//                       />
//                     </svg>

//                     <span className="text-2xl">
//                       Total price: NPR {booking.price}/-
//                     </span>
//                   </div>
//                   <br />
//                   <h5 className="flex gap-2 items-center">
//                     Payment Status:
//                     <span
//                       className={`px-3 py-1 rounded-full text-white ${
//                         booking.payment_status === "paid"
//                           ? "bg-green-500"
//                           : booking.payment_status === "failed"
//                           ? "bg-red-500"
//                           : "bg-yellow-500"
//                       }`}
//                     >
//                       {booking.payment_status}
//                     </span>
//                   </h5>
//                 </div>
//               </div>
//             </Link>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


// import AccountNav from "../AccountNav";
// import PlaceImg from "../PlaceImg";
// import { Link } from "react-router-dom";
// import BookingDates from "../BookingDates";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function BookingsPage() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     axios.get("http://localhost:5000/bookings")
//       .then((response) => {
//         console.log(response.data);
//         setBookings(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching bookings:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center mt-8">
//         <p>Loading bookings...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <AccountNav />
//       <div>
//         {bookings.length === 0 ? (
//           <div className="text-center mt-8">
//             <p>No bookings found.</p>
//             <Link to="/" className="text-blue-500 underline">
//               Browse places to book
//             </Link>
//           </div>
//         ) : (
//           bookings.map((booking) => (
//             <Link
//               to={`/account/bookings/${booking.id}`}
//               className="flex bg-gray-200 rounded-2xl overflow-hidden mb-4"
//               key={booking.id}
//             >
//               <div
//                 style={{
//                   width: "192px",
//                   height: "192px",
//                   padding: 0,
//                   margin: 0,
//                   overflow: "hidden",
//                 }}
//                 className="flex-shrink-0"
//               >
//                 <PlaceImg
//                   place={booking.place}
//                   className="w-full h-full"
//                 />
//               </div>

//               <div className="py-4 px-4 grow">
//                 <h2 className="text-xl">{booking.place.title}</h2>

//                 <div className="text-xl">
//                   <BookingDates
//                     booking={booking}
//                     className="mb-2 mt-4 text-gray-500"
//                   />
//                   <div className="flex gap-1">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-8 h-8"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
//                       />
//                     </svg>

//                     <span className="text-2xl">
//                       Total price: NPR {booking.price}/-
//                     </span>
//                   </div>
//                   <br />
//                   <h5 className="flex gap-2 items-center">
//                     Payment Status:
//                     <span
//                       className={`px-3 py-1 rounded-full text-white ${
//                         booking.payment_status === "paid"
//                           ? "bg-green-500"
//                           : booking.payment_status === "failed"
//                           ? "bg-red-500"
//                           : "bg-yellow-500"
//                       }`}
//                     >
//                       {booking.payment_status}
//                     </span>
//                   </h5>
//                 </div>
//               </div>
//             </Link>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }