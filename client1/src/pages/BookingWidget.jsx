// import { useContext, useEffect, useState } from "react";
// import { differenceInCalendarDays } from "date-fns";
// import axios from "axios";
// import { UserContext } from "../UserContext.jsx";

// export default function BookingWidget({ place }) {
//     const [checkIn, setCheckIn] = useState('');
//     const [checkOut, setCheckOut] = useState('');
//     const [numberOfGuests, setNumberOfGuests] = useState(1);
//     const [name, setName] = useState('');
//     const [phone, setPhone] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const { user } = useContext(UserContext);

//     useEffect(() => {
//         if (user) {
//             setName(user.username);
//         }
//     }, [user]);

//     console.log('Frontend eSewa product code:', import.meta.env.VITE_REACT_APP_ESEWA_PRODUCT_CODE);

//     let numberOfNights = 0;
//     if (checkIn && checkOut) {
//         numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
//     }

//     async function bookThisPlace() {
//         if (isSubmitting) return;
//         setIsSubmitting(true);

//         try {
//             // Step 1: Create the booking
//             const bookingResponse = await axios.post('http://localhost:5000/bookings', {
//                 checkIn,
//                 checkOut,
//                 numberOfGuests,
//                 name,
//                 phone,
//                 place: place.id,
//                 price: numberOfNights * place.price,
//             }, { withCredentials: true });

//             if (!bookingResponse.data.success) {
//                 throw new Error(bookingResponse.data.message || "Failed to create booking");
//             }

//             const { pendingBookingId } = bookingResponse.data;
//             console.log('Pending booking created with ID:', pendingBookingId);

//             // Step 2: Initialize eSewa payment
//             const paymentResponse = await axios.post('http://localhost:5000/initialize-esewa', {
//                 pendingBookingId,
//             }, { withCredentials: true });

//             if (!paymentResponse.data.success) {
//                 throw new Error(paymentResponse.data.message || "Failed to initialize eSewa payment");
//             }

//             const { transaction_uuid, signature, payment } = paymentResponse.data;
//             console.log('eSewa payment initialized:', { transaction_uuid, signature, payment });

//             // Step 3: Submit to eSewa
//             const form = document.createElement("form");
//             form.method = "POST";
//             form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

//             // Format amount to 2 decimal places
//             const formattedAmount = Number(payment.amount).toFixed(2);

//             const esewaPayload = {
//                 amount: formattedAmount,
//                 tax_amount: "0",
//                 total_amount: formattedAmount,
//                 transaction_uuid: transaction_uuid,
//                 product_code: import.meta.env.VITE_REACT_APP_ESEWA_PRODUCT_CODE || "EPAYTEST",
//                 product_service_charge: "0",
//                 product_delivery_charge: "0",
//                 success_url: "http://localhost:5000/complete-payment",
//                 failure_url: "http://localhost:5173/failure",
//                 signed_field_names: payment.signed_field_names,
//                 signature: signature,
//             };

//             console.log('eSewa payload:', esewaPayload);

//             Object.entries(esewaPayload).forEach(([key, value]) => {
//                 const input = document.createElement("input");
//                 input.type = "hidden";
//                 input.name = key;
//                 input.value = value;
//                 form.appendChild(input);
//             });

//             document.body.appendChild(form);
//             form.submit();
//             document.body.removeChild(form);
//         } catch (error) {
//             console.error("Error creating booking or initializing payment:", error.stack);
//             alert("Error: " + error.message);
//             setIsSubmitting(false);
//         }
//     }

//     return (
//         <div className="bg-white shadow p-4 rounded-2xl">
//             <div className="text-2xl text-center">
//                 Price: NPR {place.price}/per night
//             </div>

//             <div className="border rounded-2xl mt-4">
//                 <div className="flex">
//                     <div className="py-3 px-4">
//                         <label>Check in:</label>
//                         <input
//                             type="date"
//                             value={checkIn}
//                             onChange={ev => setCheckIn(ev.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="py-3 px-4 border-l">
//                         <label>Check out:</label>
//                         <input
//                             type="date"
//                             value={checkOut}
//                             onChange={ev => setCheckOut(ev.target.value)}
//                             required
//                         />
//                     </div>
//                 </div>

//                 <div className="py-3 px-4 border-t">
//                     <label>Number of guests:</label>
//                     <input
//                         className="w-full border my-1 py-2 px-3 rounded-2xl"
//                         type="number"
//                         value={numberOfGuests}
//                         onChange={ev => setNumberOfGuests(ev.target.value)}
//                         min="1"
//                         required
//                     />
//                 </div>
//                 {numberOfNights > 0 && (
//                     <div className="py-3 px-4 border-t">
//                         <label>Your full name:</label>
//                         <input
//                             className="w-full border my-1 py-2 px-3 rounded-2xl"
//                             type="text"
//                             value={name}
//                             onChange={ev => setName(ev.target.value)}
//                             required
//                         />

//                         <label>Phone number:</label>
//                         <input
//                             className="w-full border my-1 py-2 px-3 rounded-2xl"
//                             type="tel"
//                             value={phone}
//                             onChange={ev => setPhone(ev.target.value)}
//                             required
//                         />
//                     </div>
//                 )}
//             </div>

//             <button
//                 onClick={bookThisPlace}
//                 disabled={isSubmitting}
//                 className={`bg-sky-500 p-2 w-full text-white rounded-2xl mt-4 ${
//                     isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                 }`}
//             >
//                 {isSubmitting ? 'Processing...' : 'Book and Pay via eSewa'}
//                 {numberOfNights > 0 && !isSubmitting && (
//                     <span> NPR {numberOfNights * place.price}/-</span>
//                 )}
//             </button>
//         </div>
//     );
// }


import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays, addDays } from "date-fns";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [numberOfNights, setNumberOfNights] = useState(0);
    const { user } = useContext(UserContext);

    // Set user's name from context
    useEffect(() => {
        if (user) {
            setName(user.username);
        }
    }, [user]);

    // Log environment variable for debugging
    console.log('Frontend eSewa product code:', import.meta.env.VITE_REACT_APP_ESEWA_PRODUCT_CODE);

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Calculate numberOfNights and validate dates
    useEffect(() => {
        if (checkIn && checkOut) {
            const nights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
            setNumberOfNights(nights);
            // MODIFIED: Check for same-day or earlier check-out
            if (nights < 1) {
                setError('Check-out date must be at least one day after check-in date.');
            } else {
                setError('');
            }
        } else {
            setNumberOfNights(0);
            setError('');
        }
    }, [checkIn, checkOut]);

    async function bookThisPlace() {
        if (isSubmitting) return;

        // Validate inputs before submitting
        if (!checkIn || !checkOut) {
            setError('Please select both check-in and check-out dates.');
            return;
        }
        // MODIFIED: Ensure at least one night
        if (numberOfNights < 1) {
            setError('Check-out date must be at least one day after check-in date.');
            return;
        }
        if (!name.trim()) {
            setError('Please enter your full name.');
            return;
        }
        if (!phone.trim()) {
            setError('Please enter your phone number.');
            return;
        }
        if (numberOfGuests < 1) {
            setError('Please select at least one guest.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // Step 1: Create the booking
            const bookingResponse = await axios.post('http://localhost:5000/bookings', {
                checkIn,
                checkOut,
                numberOfGuests,
                name,
                phone,
                place: place.id,
                price: Number(numberOfNights * place.price).toFixed(2),
            }, { withCredentials: true });

            if (!bookingResponse.data.success) {
                throw new Error(bookingResponse.data.message || "Failed to create booking");
            }

            const { pendingBookingId } = bookingResponse.data;
            console.log('Pending booking created with ID:', pendingBookingId);

            // Step 2: Initialize eSewa payment
            const paymentResponse = await axios.post('http://localhost:5000/initialize-esewa', {
                pendingBookingId,
            }, { withCredentials: true });

            if (!paymentResponse.data.success) {
                throw new Error(paymentResponse.data.message || "Failed to initialize eSewa payment");
            }

            const { transaction_uuid, signature, payment } = paymentResponse.data;
            console.log('eSewa payment initialized:', { transaction_uuid, signature, payment });

            // Validate eSewa response
            if (!transaction_uuid || !signature || !payment || !payment.signed_field_names) {
                throw new Error('Invalid eSewa payment response');
            }

            // Step 3: Submit to eSewa
            const form = document.createElement("form");
            form.method = "POST";
            form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

            // Format amount to 2 decimal places
            const formattedAmount = Number(payment.amount).toFixed(2);

            const esewaPayload = {
                amount: formattedAmount,
                tax_amount: "0",
                total_amount: formattedAmount,
                transaction_uuid,
                product_code: import.meta.env.VITE_REACT_APP_ESEWA_PRODUCT_CODE || "EPAYTEST",
                product_service_charge: "0",
                product_delivery_charge: "0",
                success_url: "http://localhost:5000/complete-payment",
                failure_url: "http://localhost:5173/failure",
                signed_field_names: payment.signed_field_names,
                signature,
            };

            console.log('eSewa payload:', esewaPayload);

            // Ensure all payload values are strings and non-null
            Object.entries(esewaPayload).forEach(([key, value]) => {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = value != null ? String(value) : '';
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
        } catch (error) {
            console.error("Error creating booking or initializing payment:", error.stack);
            alert("Error: " + error.message);
            setIsSubmitting(false);
        }
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: NPR {place.price}/per night
            </div>

            {error && (
                <div className="text-red-500 text-center mt-2">
                    {error}
                </div>
            )}

            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check in:</label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(ev) => {
                                const selectedCheckIn = ev.target.value;
                                setCheckIn(selectedCheckIn);
                                // MODIFIED: Reset checkOut if checkIn is same day or after checkOut
                                if (checkOut && selectedCheckIn >= checkOut) {
                                    setCheckOut('');
                                }
                            }}
                            min={today}
                            required
                        />
                    </div>

                    <div className="py-3 px-4 border-l">
                        <label>Check out:</label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(ev) => setCheckOut(ev.target.value)}
                            // MODIFIED: Set min to at least one day after checkIn or today
                            min={checkIn ? addDays(new Date(checkIn), 1).toISOString().split('T')[0] : today}
                            required
                        />
                    </div>
                </div>

                <div className="py-3 px-4 border-t">
                    <label>Number of guests:</label>
                    <input
                        className="w-full border my-1 py-2 px-3 rounded-2xl"
                        type="number"
                        value={numberOfGuests}
                        onChange={(ev) => setNumberOfGuests(Number(ev.target.value))}
                        min="1"
                        required
                    />
                </div>

                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your full name:</label>
                        <input
                            className="w-full border my-1 py-2 px-3 rounded-2xl"
                            type="text"
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                            required
                        />

                        <label>Phone number:</label>
                        <input
                            className="w-full border my-1 py-2 px-3 rounded-2xl"
                            type="tel"
                            value={phone}
                            onChange={(ev) => setPhone(ev.target.value)}
                            required
                        />
                    </div>
                )}
            </div>

            <button
                onClick={bookThisPlace}
                disabled={isSubmitting || numberOfNights < 1}
                className={`bg-lime-500 p-2 w-full text-white rounded-2xl mt-4 ${
                    (isSubmitting || numberOfNights < 1) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {isSubmitting ? 'Processing...' : 'Book and Pay via eSewa'}
                {numberOfNights > 0 && !isSubmitting && (
                    <span> NPR {(numberOfNights * place.price).toFixed(2)}/-</span>
                )}
            </button>
        </div>
    );
}