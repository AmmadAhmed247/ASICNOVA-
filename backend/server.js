const express = require('express')
const app = express()
const dotenv = require('dotenv')
const ConnectToDB = require('./config/db')
const AuthRouter = require('./routes/auth.route')
const ContactRouter = require('./routes/contact.route')
const ProductRouter = require('./routes/product.route')
const CartRouter = require('./routes/cart.route')
const paymentRoutes = require('./routes/payment.route');
const orderRoute = require('./routes/order.route')

const path = require('path');

const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config()

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true });
})

app.get("/health", () => {
  console.log("perfect");
})

// Initialize the app after database connection
const initializeApp = async () => {
  try {
    // Wait for database connection
    await ConnectToDB();
    console.log('Connected To DB!');
    
    // Import all models to ensure they are registered
    require('./models');
    
    // Require cron jobs after DB connection
    require("./cronJobs/expireOrders");
    
    // Mount routes
    app.use('/auth', AuthRouter)
    app.use('/contact', ContactRouter)
    app.use('/product', ProductRouter)
    app.use('/api', orderRoute);
    app.use('/cart', CartRouter)
    app.use('/api/payments', paymentRoutes);
    
    // Start server
    app.listen(3000, () => {
      console.log("Listening To PORT 3000")
    });
    
  } catch (error) {
    console.error('Failed to initialize app:', error);
    process.exit(1);
  }
};

// Initialize the app
initializeApp();
