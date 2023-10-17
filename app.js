const express = require('express');

const app = express();
const dotenv = require('dotenv')
const cors = require('cors')

// 👇️ configure CORS
app.use(cors());

const CategoriesRouter = require('./routes/categories');
const mahasiswasRoutes =  require('./routes/mahasiswasRoutes')
dotenv.config()

// Midleware
app.use(express.json())
app.use((req, res, next)=>{
    console.log("Hellow midleware nya jalan 👍😁");
    req.requestTime =  new Date().toISOString()
    next()
})

// Routing
app.use('/api/v1/categories', CategoriesRouter)
app.use('/api/v2/mhs', mahasiswasRoutes)

// Server
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Aplikasi Server berjalan di Port = ${port}`);
})

// app.listen();