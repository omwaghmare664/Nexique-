const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const path = require('path')

const connectDB = require('./config/db')
const AuthRouter = require('./routes/AuthRoutes')
const productRouter = require('./routes/ProductRoutes')
const CartRouter = require('./routes/CartRoutes')
const OrderRouter = require('./routes/OrderRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(cors({
    origin: [
        "https://nexique.onrender.com",
        "https://nexique-admin.onrender.com",
        "https://nexique.vercel.app"
         // "http://localhost:5173",
         // "http://localhost:5174"
    ], // specify your frontend origins as an array
    credentials: true // allow cookies and credentials
}));

connectDB()

app.get("/", (req, res) => {
    res.send("API Working")
})

app.use('/auth', AuthRouter)
app.use('/product', productRouter)
app.use('/cart', CartRouter)
app.use('/order', OrderRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
});

