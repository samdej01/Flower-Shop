require('dotenv').config();
const express = require("express");
const app = express();
const userRoutes = require('./routes/routes'); 
const port = process.env.PORT || 3200;
const cors = require("cors");

app.use(express.json());

app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the specified methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow the specified headers, including Authorization
  }));


const db = require("./config/db");
db.connect().then(() => {
    // Define routes
    app.get('/', (req, res) => {
        res.send("Hello");
    });

    //use route
    app.use("/api/v1",userRoutes);

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}).catch(err => {
    console.error("Error connecting to the database:", err);
});
