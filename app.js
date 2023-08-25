const express = require('express');

const app = express();
const port = 3000;
const CategoriesRouter = require('./routes/categories');

// Midleware
app.use(express.json())
app.use((req, res, next)=>{
    console.log("Hellow midleware nya jalan 👍😁");
    req.requestTime =  new Date().toISOString()
    next()
})

// Routing
app.use('/api/v1/categories', CategoriesRouter)

// Server
app.listen(port, ()=>{
    console.log(`Aplikasi Server berjalan di Port = ${port}`);
})

// app.listen();