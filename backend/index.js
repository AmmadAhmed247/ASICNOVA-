const express = require('express')
const app = express()
const dotenv = require('dotenv')
const ConnectToDB = require('./config/db')
const AuthRouter = require('./routes/auth.route')
const ContactRouter = require('./routes/contact.route')
const ProductRouter = require('./routes/product.route')
const CartRouter = require('./routes/cart.route')
const paymentRoutes=require('./routes/payment.route')
const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config()
ConnectToDB()
require("./cronJobs/expireOrders");
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

app.use('/auth', AuthRouter)
app.use('/contact', ContactRouter)
app.use('/product', ProductRouter)
app.use('/cart', CartRouter)
app.use("/api/payments", paymentRoutes);
app.get("/",()=>{
    console.log("server is running on ngrok");
    
})


app.listen(3000, (req,res)=>{
    console.log("Listning To PORT")
})