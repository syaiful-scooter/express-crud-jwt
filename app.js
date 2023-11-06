
const express = require('express');

const app = express();
const dotenv = require('dotenv')
const cors = require('cors')


const CategoriesRouter = require('./routes/categories');
const mahasiswasRoutes =  require('./routes/mahasiswasRoutes')
const AuthRouter =  require('./routes/AuthRouter')
dotenv.config()

// 👇️ configure CORS
app.use(cors());

// Midleware
app.use(express.json())
app.use((req, res, next)=>{
    console.log("Hellow midleware nya jalan 👍😁");
    req.requestTime =  new Date().toISOString();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    next()
})

// Routing
app.use('/api/v1/categories', CategoriesRouter)
app.use('/api/v2/mhs', mahasiswasRoutes)
app.use('/api/v1/auth', AuthRouter)

// Server
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Aplikasi Server berjalan di Port = ${port}`);
})

// app.listen();