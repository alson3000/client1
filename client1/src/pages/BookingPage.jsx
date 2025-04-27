import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axios.get('http://localhost:5000/bookings', { withCredentials: true })
                .then(response => {
                    console.log('Bookings response:', response.data); // Debug: Log the response
                    console.log('Looking for ID:', id, 'Type:', typeof id); // Debug: Log the ID and its type
                    const foundBooking = response.data.find(({ id: bookingId }) => {
                        console.log('Comparing:', bookingId, 'with', Number(id)); // Debug: Log each comparison
                        return bookingId === Number(id);
                    });
                    if (foundBooking) {
                        setBooking(foundBooking);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching bookings:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div className="text-center mt-8">Loading booking...</div>;
    }

    if (!booking) {
        return <div className="text-center mt-8">Booking not found.</div>;
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place?.title || 'Untitled'}</h1>
            <AddressLink className="my-2 block">{booking.place?.address || 'No address'}</AddressLink>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">Your booking information</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="bg-sky-500 p-6 text-white rounded-2xl">
                        <div>Total price</div>
                        <div className="text-3xl">NPR {booking.price || 0}/-</div>
                    </div>
                    <div
                        className={`p-3 text-white rounded-2xl text-center ${
                            booking.payment_status === 'paid'
                                ? 'bg-green-500'
                                : booking.payment_status === 'failed'
                                ? 'bg-red-500'
                                : 'bg-yellow-500'
                        }`}
                    >
                        Payment Status: {booking.payment_status || 'Unknown'}
                    </div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    );
}