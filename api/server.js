require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const verifyToken = require('./middleware/verifyToken'); // 👈 لا تنسَ هذا السطر!

const app = express();
app.set('trust proxy', true);
// --- Middleware ---
app.use(express.json());
app.use(cookieParser());


const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [
          'https://next-commerce-admine.vercel.app',  // Your production frontend
          // Add www version if you ever use it: 'https://www.next-commerce-admine.vercel.app'
      ]
    : [
          'http://localhost:3000',
          'http://localhost:5173',
          // Add any other local dev ports if needed
      ];

app.use(cors({
    origin: function (origin, callback) {
        // Allow non-browser requests (e.g., Postman, server-side calls, mobile apps)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('Blocked CORS origin:', origin); // Helpful for debugging
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// const whitelist = ['localhost:3000', 'localhost:5173'];

// app.use(cors({
//     origin: function (origin, callback) {
//          if (!origin) return callback(null, true);
        
//         const isLocalhost = origin.includes('localhost:3000');
//         const isInWhitelist = whitelist.some(domain => origin.includes(domain));

//         if (isLocalhost || isInWhitelist) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true
// }));

// ---------------------------------------------------------
//  (Public Zone) 
// ---------------------------------------------------------

 app.use('/api/auth', require('./routes/authRoutes'));

 
app.use('/api/public/orders', require('./routes/publicOrderRoutes'));

 app.use('/api/public/products', require('./routes/publicProductRoutes'));

app.use('/api/public/visites', require('./routes/publicVisitesRoutes'));

app.use('/api/public/store', require('./routes/publicStoreRoutes'));

  
// ---------------------------------------------------------
app.use(verifyToken); 
 

// ---------------------------------------------------------
// 🔒  (Private Zone) 
// ---------------------------------------------------------

 

app.use('/api/me', require('./routes/meRoutes'))


app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/store', require('./routes/storeRoutes'));
app.use('/api/DeliveryPrice', require('./routes/DeliveryPriceRoutes'));
app.use('/api/offer', require('./routes/OfferRoutes'));
 
 app.use('/api/products', require('./routes/productRoutes'));


 app.get("/", (req, res)=>{
    res.send("hello")
 }
)

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
});