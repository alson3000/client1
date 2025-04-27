import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function EsewaSuccess() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const data = searchParams.get('data');
    console.log(data, 'data');

    if (!data) {
      setError('No payment data provided');
      return;
    }

    // Decode payment data
    let parsedData;
    try {
      const decodedData = atob(data);
      parsedData = JSON.parse(decodedData);
      console.log('Parsed payment data:', parsedData);
      setPaymentDetails(parsedData);
    } catch (err) {
      console.error('Error decoding payment data:', err);
      setError('Invalid payment data');
      return;
    }

    // Extract bookingId from URL (e.g., /account/bookings/40)
    const pathSegments = location.pathname.split('/');
    const bookingId = pathSegments[pathSegments.length - 1];
    console.log('Extracted bookingId:', bookingId);

    if (bookingId && !isNaN(bookingId)) {
      axios
        .get(`/account/bookings/${bookingId}`, { withCredentials: true })
        .then((response) => {
          console.log('Booking details:', response.data);
          setBookingDetails(response.data);
        })
        .catch((err) => {
          console.error('Error fetching booking:', err);
          if (err.response?.status === 401) {
            setError('Please log in to view booking details');
          } else if (err.response?.status === 404) {
            setError('Booking not found');
          } else {
            setError('Failed to fetch booking details');
          }
        });
    } else {
      setError('No booking ID found in URL');
    }
  }, [searchParams, location]);

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>{error}</p>
        {error.includes('log in') && (
          <a
            href="/login"
            className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Log In
          </a>
        )}
      </div>
    );
  }

  if (!paymentDetails || !bookingDetails) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Processing Payment...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
        <p><strong>Transaction Code:</strong> {paymentDetails.transaction_code}</p>
        <p><strong>Status:</strong> {paymentDetails.status}</p>
        <p><strong>Total Amount:</strong> NPR {paymentDetails.total_amount}</p>
        <p><strong>Transaction UUID:</strong> {paymentDetails.transaction_uuid}</p>
        <p><strong>Product Code:</strong> {paymentDetails.product_code}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
        <p><strong>Booking ID:</strong> {bookingDetails.id}</p>
        <p><strong>Place:</strong> {bookingDetails.place.title}</p>
        <p><strong>Address:</strong> {bookingDetails.place.address}</p>
        <p><strong>Name:</strong> {bookingDetails.name}</p>
        <p><strong>Phone:</strong> {bookingDetails.phone}</p>
        <p><strong>Check-in:</strong> {new Date(bookingDetails.check_in).toLocaleDateString()}</p>
        <p><strong>Check-out:</strong> {new Date(bookingDetails.check_out).toLocaleDateString()}</p>
        <p><strong>Price:</strong> NPR {bookingDetails.price}</p>
        <p><strong>Payment Status:</strong> {bookingDetails.payment_status}</p>
        <p><strong>Payment ID:</strong> {bookingDetails.paymentId}</p>
      </div>

      <a
        href="/account/bookings"
        className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        View All Bookings
      </a>
    </div>
  );
}