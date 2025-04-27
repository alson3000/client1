require('dotenv').config();

console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('ESEWA_SECRET_KEY:', process.env.ESEWA_SECRET_KEY);
console.log('ESEWA_GATEWAY_URL:', process.env.ESEWA_GATEWAY_URL);
console.log('ESEWA_PRODUCT_CODE:', process.env.ESEWA_PRODUCT_CODE);
console.log('BACKEND_URI:', process.env.BACKEND_URI);

// core modules
const path = require('path');
const fs = require('fs');

// external modules
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const imageDownloader = require('image-downloader');
const bodyParser = require("body-parser");
const { validationResult, check} = require('express-validator');
const { differenceInCalendarDays } = require('date-fns');

// internal modules
const pool = require('./db')

// initialize app
const app = express();

const jwtSecret = process.env.JWT_SECRET;
const { getEsewaPaymentHash, verifyEsewaPayment } = require("./esewa");


// middleware
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// request logger middleware
app.use((req, res, next) => {
  console.log('Received Cookies:', req.cookies);
  next();
});


// Function to extract user data from JWT token
async function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    const token = req.cookies.token;
    if(!token) {
      reject('No token provided');
      return;
    }

    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) {
        reject(err);
      } else {
        resolve(userData);
      }
    });
  });
}

app.get('/test', (req,res) => {
    res.json('test ok');
});

app.post('/register', [
  check("name", "Name is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({ min:6})
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({ message: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //Insert new user and get he inserted ID
        const [result] = await pool.execute('INSERT INTO users(username, email, password1) VALUES (?,?,?)', [name, email, hashedPassword]);

        const userId = result.insertId;

        // Send a successful response
        res.status(201).json({ id:userId, username: name, email });
    } catch (err) {
        // Log the error
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});



// Login an existing user
app.post('/login', [
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
],
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()})
    }

    const { email, password } = req.body;
  
    try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

      if (rows.length === 0) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const user = rows[0];

      // Compare hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password1)

      if(!isPasswordValid){
        return res.status(400).json({ message: "Invalid credentials"});
      }

      // Generate JWT Token
      const token = jwt.sign({
        email:user.email, 
        id:user.id, 
      }, jwtSecret, { expiresIn: '1d'});
      
      // Store token in a cookie and return user data
      res.cookie('token',token, {
        httpOnly: true, // Ensures JavaScript cannot access the cookie
        secure: false,
        sameSite: 'lax', 
        path: "/",
        maxAge: 24 * 60 * 60 * 1000, // 1day
      }).json({
        id:user.id,
        username: user.username,
        email: user.email,
        token,
      });

    } catch (err) {
      console.error("Error in Login:", err);
      res.status(500).json({ message: 'Error logging in' });
    }
  });


app.get('/profile', async (req,res) => {
  const {token} = req.cookies;

  if (!token) {
    console.log('No token received!');
    return res.json(null);
  }

  try 
  {
    // Verify JWT token
    const userData = jwt.verify(token, jwtSecret);
    
    // Fetch user data from MySQL
    const [rows] = await pool.execute('SELECT username, email, id FROM users WHERE id = ?', [userData.id]);

    if (rows.length > 0) {
        const { username, email, id } = rows[0];
        return res.json({ username, email, id });
    } else {
        return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(401).json({ message: 'Unauthorized or internal error' });
  }
});



app.post('/logout', (req, res) => {
  res.cookie('token', '', {expires: new Date(0)}).json(true);
});




console.log({ __dirname });
app.post('/upload-by-link', async(req,res) => {
  const {link} = req.body;
  // if (!link) return res.status(400).json({ error: 'No link provided' });

  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: path.join(__dirname, '/uploads/', newName),
  });
  res.json(newName);
});


const photoMiddleware = multer({dest:'uploads/'});
app.post('/upload', photoMiddleware.array('photos', 100), (req,res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const {path,originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace(/^uploads[\/\\]/, ''));
  }
  res.json(uploadedFiles);
});



app.post('/places', async (req,res) => {
  // MY CODE
  console.log("Received cookies:", req.cookies); // Debugging

  const {token} = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const {
    title,address,addedPhotos,description,
    perks,extraInfo,checkIn,checkOut,maxGuests,price,
  } = req.body;

    // Validate all required fields
    if (!title?.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }
    if (!address?.trim()) {
      return res.status(400).json({ error: "Address is required" });
    }
    if (!addedPhotos || addedPhotos.length === 0) {
      return res.status(400).json({ error: "At least one photo is required" });
    }
    if (!description?.trim()) {
      return res.status(400).json({ error: "Description is required" });
    }
    if (!perks || perks.length === 0) {
      return res.status(400).json({ error: "At least one perk is required" });
    }
    if (!extraInfo?.trim()) {
      return res.status(400).json({ error: "Extra info is required" });
    }
    if (!checkIn?.trim()) {
      return res.status(400).json({ error: "Check-in time is required" });
    }
    if (!checkOut?.trim()) {
      return res.status(400).json({ error: "Check-out time is required" });
    }
    if (!maxGuests || maxGuests < 1) {
      return res.status(400).json({ error: "Maximum guests must be at least 1" });
    }
    if (!price || price < 1) {
      return res.status(400).json({ error: "Price must be at least 1" });
    }
  

  try {
    // verify JWT token
    const userData = jwt.verify(token, jwtSecret);
    console.log("Decoded Token:", userData); // Debugging
    const owner = userData.id;

    // Insert into MySql
    const query = `
      INSERT INTO places (owner, title, address, photos, description, 
      perks, extraInfo, checkIn, checkOut, maxGuests, price)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      owner, title, address, JSON.stringify(addedPhotos), description,
      JSON.stringify(perks), extraInfo, checkIn, checkOut, maxGuests, price
    ];

    const [result] = await pool.execute(query, values);
    const insertedId = result.insertId;

    // Create a notification for the user
    const notificationQuery = `
      INSERT INTO notifications (user_id, message)
      VALUES (?, ?)
    `;
    const notificationMessage = `You added a new place: ${title}`;
    await pool.execute(notificationQuery, [owner, notificationMessage]);

    // Fetch the newly inserted place
    const [newPlace] = await pool.execute(`SELECT * FROM places WHERE id = ?`, [insertedId]);

    // Return the full inserted object
    res.json(newPlace[0]);
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error : "Invalid token" });
  }
});


app.get('/user-places', async (req,res) => {
  try {
    console.log("GET request received at /places");

    const { token } = req.cookies;
    console.log("Received token", token);

    if(!token) {
      return res.status(401).json({error: "Unauthorized, token missing"});
    }

    const userData = jwt.verify(token, jwtSecret);
    console.log("Decoded userData: ", userData);

    // Fetch places based on owner ID
    const query = "SELECT * FROM places WHERE owner = ?";
    const [results] = await pool.query(query, [userData.id]);
    
    console.log("Fetched places, results");
    res.json(results);
  
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({error: "Server error"})
  }
});


app.get('/places/:id', async (req,res) => {
  const {id} = req.params;
  try {
    const [rows] = await pool.execute('SELECT * FROM places WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Place not found"});
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error"});
  }
})


app.put('/places', async (req,res) => {

  // MY CODE
  const {token} = req.cookies;
  const {
    id,title,address,addedPhotos,description,
    perks,extraInfo,checkIn,checkOut,maxGuests,price,
  } = req.body;

  if (!token) {
    return res.status(401).json({error: 'Unauthorized'});
  }

   // Validate all required fields
   if (!title?.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }
  if (!address?.trim()) {
    return res.status(400).json({ error: "Address is required" });
  }
  if (!addedPhotos || addedPhotos.length === 0) {
    return res.status(400).json({ error: "At least one photo is required" });
  }
  if (!description?.trim()) {
    return res.status(400).json({ error: "Description is required" });
  }
  if (!perks || perks.length === 0) {
    return res.status(400).json({ error: "At least one perk is required" });
  }
  if (!extraInfo?.trim()) {
    return res.status(400).json({ error: "Extra info is required" });
  }
  if (!checkIn?.trim()) {
    return res.status(400).json({ error: "Check-in time is required" });
  }
  if (!checkOut?.trim()) {
    return res.status(400).json({ error: "Check-out time is required" });
  }
  if (!maxGuests || maxGuests < 1) {
    return res.status(400).json({ error: "Maximum guests must be at least 1" });
  }
  if (!price || price < 1) {
    return res.status(400).json({ error: "Price must be at least 1" });
  }

  try {
    // Verify JWT token
    const userData = jwt.verify(token, jwtSecret);

    // Fetch place details to check ownership
    const [rows] = await pool.query('SELECT owner FROM places WHERE id = ?', [id]);

    if(rows.length === 0) {
      return res.status(404).json({error: 'Place not found'})
    }

    const place = rows[0];

    // Check if the logged-in user is the owner
    if (userData.id !== place.owner) {
      return res.status(403).json({errror: 'Forbidden'});
    }

    // Update the place in MySQL
    await pool.query(
      `UPDATE places
      SET title = ?, address = ?, photos = ?, description = ?, perks = ?,
        extraInfo = ?, checkIn = ?, checkOut = ?, maxGuests = ?, price = ?
      WHERE id = ?`,
      [
      title, address, JSON.stringify(addedPhotos), description, JSON.stringify(perks),
      extraInfo, checkIn, checkOut, maxGuests, price, id,
      ]
    );

    res.json({ message : 'Place updated successfully'});

  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Internal server error'});
  }
});



app.get('/places', async (req,res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM places');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});


app.post('/bookings', async (req, res) => {
  try {
      console.log('Received booking request:', req.body);

      const userData = await getUserDataFromReq(req);
      console.log('User data:', userData);

      const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;

      // Validate required fields
      if (!place || !checkIn || !checkOut || !numberOfGuests || !name || !phone || !price) {
          return res.status(400).json({ error: 'Missing required fields' });
      }

      // Validate dates
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      if (isNaN(checkInDate) || isNaN(checkOutDate)) {
          return res.status(400).json({ error: 'Invalid date format' });
      }

      // Validate price
      const [placeRows] = await pool.execute('SELECT price FROM places WHERE id = ?', [place]);
      console.log('Place data:', placeRows);
      if (placeRows.length === 0) {
          return res.status(404).json({ error: 'Place not found' });
      }
      const placePrice = placeRows[0].price;
      const numberOfNights = differenceInCalendarDays(checkOutDate, checkInDate);
      console.log('Number of nights:', numberOfNights);
      if (numberOfNights <= 0) {
          return res.status(400).json({ error: 'Check-out date must be after check-in date' });
      }

      const expectedPrice = Number(numberOfNights * placePrice).toFixed(2);
      console.log('Expected price:', expectedPrice, 'Received price:', price);
      if (Number(price).toFixed(2) !== expectedPrice) {
          return res.status(400).json({ error: 'Invalid price' });
      }

      // Store booking
      const [result] = await pool.execute(
          `INSERT INTO pending_bookings (place_id, user_id, check_in, check_out, name, phone, price)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [place, userData.id, checkIn, checkOut, name, phone, expectedPrice]
      );
      console.log('Pending booking inserted:', result);

      const pendingBookingId = result.insertId;
      res.json({
          success: true,
          message: 'Pending booking created successfully.',
          pendingBookingId,
      });
  } catch (err) {
      console.error('Error in /bookings endpoint:', err.stack);
      res.status(500).json({ error: 'Server error', details: err.message });
  }
});


app.get('/bookings', async (req, res) => {
  try {
      const userData = await getUserDataFromReq(req);
      console.log('Fetching bookings for user ID:', userData.id); // Debug

      const [bookings] = await pool.execute(
          `SELECT bookings.id, bookings.place_id, bookings.user_id, bookings.check_in, bookings.check_out, 
                  bookings.name, bookings.phone, bookings.price, bookings.payment_status,
                  places.title AS place_title, places.address AS place_address, places.photos AS place_photos, 
                  places.description AS place_description, places.perks AS place_perks, places.extraInfo AS place_extraInfo,
                  places.checkIn AS place_checkIn, places.checkOut AS place_checkOut, places.maxGuests AS place_maxGuests, places.price AS place_price
           FROM bookings
           INNER JOIN places ON bookings.place_id = places.id
           WHERE bookings.user_id = ? AND bookings.payment_status = 'paid'`,
          [userData.id]
      );

      console.log('Found bookings:', bookings); // Debug
      const formattedBookings = bookings.map(booking => {
          // Parse JSON fields if they are stored as strings
          const photos = typeof booking.place_photos === 'string' ? JSON.parse(booking.place_photos) : booking.place_photos;
          const perks = typeof booking.place_perks === 'string' ? JSON.parse(booking.place_perks) : booking.place_perks;

          return {
              id: booking.id,
              place_id: booking.place_id,
              user_id: booking.user_id,
              check_in: booking.check_in,
              check_out: booking.check_out,
              name: booking.name,
              phone: booking.phone,
              price: booking.price,
              payment_status: booking.payment_status,
              place: {
                  title: booking.place_title,
                  address: booking.place_address,
                  photos,
                  description: booking.place_description,
                  perks,
                  extraInfo: booking.place_extraInfo,
                  checkIn: booking.place_checkIn,
                  checkOut: booking.place_checkOut,
                  maxGuests: booking.place_maxGuests,
                  price: booking.place_price
              }
          };
      });

      res.json(formattedBookings);
  } catch (err) {
      console.error('Error fetching bookings:', err.stack); // Include stack trace for better debugging
      res.status(500).json({ error: 'Failed to fetch bookings', details: err.message });
  }
});


app.get("/search", async (req,res)=> {
  try {
    const {location, guests, minPrice, maxPrice } = req.query;

    // Start SQL query
    let sql = "SELECT * FROM places WHERE 1=1"; // Fetch all places
    const values = [];

    // Filter by location
    if (location) {
      sql += " AND address LIKE ?";
      values.push(`%${location}%`);
    }

    // Filter by price range
    if (minPrice) {
      sql += " AND price >= ?";
      values.push(parseFloat(minPrice));
    }

    // Filter by guest capacity
    if (guests) {
      sql += " AND maxGuests >= ?";
      values.push(parseInt(guests));
    }

    
    if (maxPrice) {
      sql += " AND price <= ?";
      values.push(parseFloat(maxPrice));
    }


    const [results] = await pool.query(sql, values);
    res.json(results); // Send results to the frontend
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.post('/initialize-esewa', async (req, res) => {
  try {
      const { pendingBookingId } = req.body;
      const userData = await getUserDataFromReq(req);

      const [pendingBookings] = await pool.execute(
          `SELECT * FROM pending_bookings WHERE id = ? AND user_id = ?`,
          [pendingBookingId, userData.id]
      );

      if (pendingBookings.length === 0) {
          return res.status(404).json({ error: 'Pending booking not found' });
      }

      const pendingBooking = pendingBookings[0];
      console.log('Pending booking found:', pendingBooking);

      const paymentHash = await getEsewaPaymentHash(pendingBooking);
      console.log('Payment hash generated:', paymentHash);

      // Format amount to 2 decimal places before storing
      const formattedAmount = Number(paymentHash.amount).toFixed(2);

      // Include user_id in the INSERT query
      const [paymentResult] = await pool.execute(
          `INSERT INTO payments (pending_booking_id, user_id, amount, transaction_uuid, payment_status)
           VALUES (?, ?, ?, ?, ?)`,
          [pendingBookingId, pendingBooking.user_id, formattedAmount, paymentHash.transaction_uuid, 'pending']
      );

      res.json({
          success: true,
          message: 'eSewa payment initialized successfully.',
          transaction_uuid: paymentHash.transaction_uuid,
          signature: paymentHash.signature,
          payment: {
              amount: formattedAmount,
              signed_field_names: paymentHash.signed_field_names,
          },
      });
  } catch (err) {
      console.error('Error initializing eSewa payment:', err.stack);
      res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.post('/complete-payment', async (req, res) => {
  const { data } = req.body;
  console.log(data,"data");
  

  let decodedData = atob(data);
  decodedData = await JSON.parse(decodedData)
  const amount = decodedData.total_amount
  console.log(amount, "decoded amount");
  

  // try {
  //     console.log('Received payment data:', data); // Debug
  //     const decodedData = Buffer.from(data, 'base64').toString('utf-8');
  //     const params = new URLSearchParams(decodedData);
  //     const transactionCode = params.get('refId');
  //     const transaction_uuid = params.get('oid');
  //     const amount = parseFloat(params.get('amt'));
  //     console.log('Parsed payment params:', { transactionCode, transaction_uuid, amount }); // Debug

  //     // Find the payment record
  //     const [payments] = await pool.execute(
  //         `SELECT * FROM payments WHERE transaction_uuid = ? AND payment_status = 'pending'`,
  //         [transaction_uuid]
  //     );

  //     console.log('Found payments:', payments); // Debug
  //     if (payments.length === 0) {
  //         console.log('Payment not found or already processed for transaction_uuid:', transaction_uuid);
  //         return res.status(404).json({ message: 'Payment not found or already processed' });
  //     }

  //     const payment = payments[0];

  //     // Verify the amount
  //     console.log('Verifying amount:', { expected: payment.amount, received: amount }); // Debug
  //     if (payment.amount !== amount) {
  //         console.log('Amount mismatch, marking payment as failed'); // Debug
  //         await pool.execute(
  //             `UPDATE payments SET payment_status = 'failed', transaction_id = ? WHERE id = ?`,
  //             [transactionCode, payment.id]
  //         );
  //         if (payment.pending_booking_id) {
  //             await pool.execute(
  //                 `DELETE FROM pending_bookings WHERE id = ?`,
  //                 [payment.pending_booking_id]
  //             );
  //         }
  //         return res.redirect('http://localhost:5173/failure');
  //     }

  //     // Verify payment signature
  //     const verificationResult = await verifyEsewaPayment(data);
  //     if (verificationResult.status !== 'SUCCESS') {
  //         console.log('Payment verification failed, marking payment as failed'); // Debug
  //         await pool.execute(
  //             `UPDATE payments SET payment_status = 'failed', transaction_id = ? WHERE id = ?`,
  //             [transactionCode, payment.id]
  //         );
  //         return res.redirect('http://localhost:5173/failure');
  //     }

  //     // Update payment status to success
  //     console.log('Payment successful, updating status to success'); // Debug
  //     await pool.execute(
  //         `UPDATE payments SET payment_status = 'success', transaction_id = ? WHERE id = ?`,
  //         [transactionCode, payment.id]
  //     );

  //     // Fetch the pending booking
  //     const [pendingBookings] = await pool.execute(
  //         `SELECT * FROM pending_bookings WHERE id = ?`,
  //         [payment.pending_booking_id]
  //     );

  //     console.log('Found pending bookings:', pendingBookings); // Debug
  //     if (pendingBookings.length === 0) {
  //         console.log('Pending booking not found for ID:', payment.pending_booking_id);
  //         return res.status(404).json({ message: 'Pending booking not found' });
  //     }

  //     const pendingBooking = pendingBookings[0];

  //     // Create a confirmed booking
  //     console.log('Creating confirmed booking...'); // Debug
  //     const [bookingResult] = await pool.execute(
  //         `INSERT INTO bookings (place_id, user_id, check_in, check_out, name, phone, price, payment_status)
  //          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  //         [
  //             pendingBooking.place_id,
  //             pendingBooking.user_id,
  //             pendingBooking.check_in,
  //             pendingBooking.check_out,
  //             pendingBooking.name,
  //             pendingBooking.phone,
  //             pendingBooking.price,
  //             'paid'
  //         ]
  //     );

  //     const bookingId = bookingResult.insertId;
  //     console.log('Created booking with ID:', bookingId); // Debug

  //     // Update the payment with the confirmed booking ID
  //     console.log('Updating payment with booking ID:', bookingId); // Debug
  //     await pool.execute(
  //         `UPDATE payments SET pending_booking_id = NULL, booking_id = ? WHERE id = ?`,
  //         [bookingId, payment.id]
  //     );

  //     // Delete the pending booking
  //     console.log('Deleting pending booking with ID:', pendingBooking.id); // Debug
  //     await pool.execute(
  //         `DELETE FROM pending_bookings WHERE id = ?`,
  //         [pendingBooking.id]
  //     );

  //     // Redirect to the booking details page
  //     console.log('Redirecting to booking details page:', `/account/bookings/${bookingId}`); // Debug
  //     res.redirect(`http://localhost:5173/account/bookings/${bookingId}`);
  // } catch (err) {
  //     console.error('Error completing payment:', err);
  //     res.redirect('http://localhost:5173/failure');
  // }
});

app.get('/complete-payment', async (req, res) => {
  try {
    const { data } = req.query;
    console.log('Received payment data:', data);

    if (!data) {
      console.log('No data parameter provided in callback');
      return res.redirect('http://localhost:5173/failure?error=no_data');
    }

    let decodedData;
    try {
      decodedData = Buffer.from(data, 'base64').toString('utf-8');
      console.log('Raw decoded data:', decodedData);
    } catch (err) {
      console.error('Error decoding base64 data:', err.message);
      return res.redirect('http://localhost:5173/failure?error=invalid_data_format');
    }

    let paymentData;
    try {
      paymentData = JSON.parse(decodedData);
      console.log('Parsed JSON data:', paymentData);
    } catch (err) {
      console.error('Error parsing JSON data:', err.message);
      return res.redirect('http://localhost:5173/failure?error=invalid_json');
    }

    const { transaction_uuid, total_amount, signed_field_names, status , transaction_code} = paymentData;
    console.log('Extracted payment params:', { transaction_uuid, total_amount, signed_field_names, status,transaction_code });

    if (!transaction_uuid) {
      console.log('Missing transaction_uuid in payment data');
      return res.redirect('http://localhost:5173/failure?error=missing_transaction_uuid');
    }

    if (!total_amount) {
      console.log('Missing total_amount in payment data');
      return res.redirect('http://localhost:5173/failure?error=invalid_total_amount');
    }

    // Check if payment exists
    const [paymentRows] = await pool.execute(
      'SELECT * FROM payments WHERE transaction_uuid = ?',
      [transaction_uuid]
    );

    if (paymentRows.length === 0) {
      console.log('Payment not found for transaction_uuid:', transaction_uuid);
      return res.redirect('http://localhost:5173/failure?error=payment_not_found');
    }

    const payment = paymentRows[0];
    console.log('Found payment:', payment);

    // Check if already processed
    if (payment.payment_status === 'success') {
      console.log('Payment already processed for transaction_uuid:', transaction_uuid);
      return res.redirect('http://localhost:5173/account/bookings/' + payment.booking_id);
    }

    if (payment.payment_status !== 'pending') {
      console.log('Payment is not pending:', payment.payment_status);
      return res.redirect('http://localhost:5173/failure?error=invalid_payment_status');
    }

    // Normalize amounts for comparison
    const storedAmount = Number(payment.amount).toFixed(2);
    const receivedAmount = Number(total_amount).toFixed(2);
    console.log('Comparing amounts:', { storedAmount, receivedAmount });

    const normalizedStoredAmount = parseFloat(storedAmount).toString();
    const normalizedReceivedAmount = parseFloat(receivedAmount).toString();
    // if (normalizedStoredAmount !== normalizedReceivedAmount) {
    //   console.log('Amount mismatch:', { normalizedStoredAmount, normalizedReceivedAmount });
    //   return res.redirect('http://localhost:5173/failure?error=amount_mismatch');
    // }

    // Re-enable signature verification once fixed
    let verificationResult;
    try {
      verificationResult = await verifyEsewaPayment(paymentData);
      console.log('Signature verification result:', verificationResult);
    } catch (err) {
      console.error('Error verifying eSewa payment:', err.message);
      return res.redirect('http://localhost:5173/failure?error=signature_verification_error');
    }
    
    if (!verificationResult.success) {
      console.log('Signature verification failed');
      return res.redirect('http://localhost:5173/failure?error=signature_verification_failed');
    }

    if (status !== 'COMPLETE') {
      console.log('Payment status is not COMPLETE:', status);
      await pool.execute(
        'UPDATE payments SET payment_status = ? WHERE transaction_uuid = ?',
        ['failed', transaction_uuid]
      );
      return res.redirect('http://localhost:5173/failure?error=invalid_status');
    }

    const [pendingBookingRows] = await pool.execute(
      'SELECT * FROM pending_bookings WHERE id = ?',
      [payment.pending_booking_id]
    );

    if (pendingBookingRows.length === 0) {
      console.log('Pending booking not found for ID:', payment.pending_booking_id);
      return res.redirect('http://localhost:5173/failure?error=pending_booking_not_found');
    }

    const pendingBooking = pendingBookingRows[0];
    const [bookingResult] = await pool.execute(
      `INSERT INTO bookings (place_id, user_id, check_in, check_out, name, phone, price, payment_status,paymentId)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pendingBooking.place_id,
        pendingBooking.user_id,
        pendingBooking.check_in,
        pendingBooking.check_out,
        pendingBooking.name,
        pendingBooking.phone,
        pendingBooking.price,
        'paid',
        transaction_code,
      ]
    );

    const bookingId = bookingResult.insertId;
    await pool.execute(
      'UPDATE payments SET payment_status = ?, booking_id = ? WHERE transaction_uuid = ?',
      ['success', bookingId, transaction_uuid]
    );

    console.log('Updated payments', bookingId);
    console.log('Deleting pending booking with ID:', payment.pending_booking_id);
    await pool.execute('DELETE FROM pending_bookings WHERE id = ?', [payment.pending_booking_id]);
    console.log('Pending booking deleted');

    console.log('Payment completed successfully, redirecting to booking page:', bookingId);
    res.redirect('http://localhost:5173/account/bookings/' + bookingId);
    // res.json({success: true, bookingId: bookingId, amount: total_amount, paymentId: transaction_code })
  } catch (err) {
    console.error('Error completing payment:', err.stack);
    return res.redirect('http://localhost:5173/failure?error=server_error');
  }
});

app.get("/create-dummy-booking", async (req, res) => {
  try {
    const userId = 17;
    const placeId = 50;
    const checkIn = "2025-04-15";
    const checkOut = "2025-04-20";
    const name = "Test User";
    const phone = "9800000000";
    const price = 500.00;

    const [result] = await pool.query(
      `INSERT INTO pending_bookings (place_id, user_id, check_in, check_out, name, phone, price)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [placeId, userId, checkIn, checkOut, name, phone, price]
    );

    const pendingBookingId = result.insertId;

    const [bookingRows] = await pool.query(
      "SELECT * FROM pending_bookings WHERE id = ?",
      [pendingBookingId]
    );

    res.json({
      success: true,
      message: "Dummy pending booking created successfully. Proceed to payment.",
      pendingBooking: bookingRows[0],
      pendingBookingId,
    });
  } catch (error) {
    console.error("Error creating dummy pending booking: ", error.message);
    res.status(500).json({
      success: false,
      message: "Could not create dummy pending booking",
      error: error.message
    });
  }
});

// index.js
app.get('/notifications', async (req, res) => {
  const { token } = req.cookies;
  console.log('/notifications - Received token:', token ? 'Present' : 'Missing');
  if (!token) {
    console.log('/notifications - No token provided');
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const userData = jwt.verify(token, jwtSecret);
    console.log('/notifications - Decoded userData:', userData);
    const userId = userData.id;
    const query = `
      SELECT id, message, is_read, created_at 
      FROM notifications 
      WHERE user_id = ? 
      ORDER BY created_at DESC
    `;
    console.log('/notifications - Executing query:', query, 'with user_id:', userId);
    const [notifications] = await pool.execute(query, [userId]);
    console.log('/notifications - Fetched notifications:', notifications);
    res.json(notifications);
  } catch (err) {
    console.error('/notifications - Error:', err.message);
    return res.status(401).json({ error: `Invalid token or query error: ${err.message}` });
  }
});

// index.js
app.put('/notifications/:id/read', async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;
  console.log('/notifications/:id/read - Received request:', { id, token: token ? 'Present' : 'Missing' });
  if (!token) {
    console.log('/notifications/:id/read - No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    console.log('/notifications/:id/read - Connection acquired:', connection.connectionId || 'undefined');
    await connection.beginTransaction();

    const userData = jwt.verify(token, jwtSecret);
    console.log('/notifications/:id/read - Decoded userData:', { id: userData.id, email: userData.email });
    const notificationId = parseInt(id);
    if (isNaN(notificationId)) {
      console.log('/notifications/:id/read - Invalid notificationId:', id);
      await connection.rollback();
      return res.status(400).json({ error: 'Invalid notification ID' });
    }

    const [current] = await connection.execute(
      'SELECT id, user_id, message, is_read, created_at FROM notifications WHERE id = ? AND user_id = ?',
      [notificationId, userData.id]
    );
    console.log('/notifications/:id/read - Current notification state:', current);

    if (current.length === 0) {
      console.log('/notifications/:id/read - Notification not found');
      await connection.rollback();
      return res.status(404).json({ error: 'Notification not found or not owned by user' });
    }

    if (current[0].is_read) {
      console.log('/notifications/:id/read - Notification already read');
      await connection.commit();
      return res.json({ success: true, alreadyRead: true });
    }

    const query = 'UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?';
    console.log('/notifications/:id/read - Executing query:', query, 'with params:', [notificationId, userData.id]);
    const [result] = await connection.execute(query, [notificationId, userData.id]);
    console.log('/notifications/:id/read - Query result:', {
      affectedRows: result.affectedRows,
      changedRows: result.changedRows
    });

    const [updated] = await connection.execute(
      'SELECT id, user_id, message, is_read, created_at FROM notifications WHERE id = ? AND user_id = ?',
      [notificationId, userData.id]
    );
    console.log('/notifications/:id/read - Updated notification state:', updated);

    if (result.affectedRows === 0 || result.changedRows === 0 || (updated.length > 0 && updated[0].is_read !== 1)) {
      console.log('/notifications/:id/read - Update failed or not committed');
      await connection.rollback();
      return res.status(500).json({ error: 'Failed to mark notification as read', details: 'No rows updated or is_read not set to 1' });
    }

    await connection.commit();
    console.log('/notifications/:id/read - Transaction committed');
    res.json({ success: true });
  } catch (err) {
    console.error('/notifications/:id/read - Error:', {
      message: err.message,
      stack: err.stack,
      code: err.code
    });
    if (connection) await connection.rollback();
    res.status(500).json({ error: `Server error: ${err.message}` });
  } finally {
    if (connection) {
      console.log('/notifications/:id/read - Releasing connection:', connection.connectionId || 'undefined');
      connection.release();
    }
  }
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/test.html");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
