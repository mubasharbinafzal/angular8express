const express = require ("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors     = require("cors");    
dotenv.config();
// connect to mongo db 
mongoose.connect(process.env.DB_CONNECT,
    {useUnifiedTopology: true , useNewUrlParser: true },
    () => console.log("Connected to Mongooes db")
);

// import routes
const listingRoutes = require("./routes/listing");
const userRoutes = require("./routes/user");
// Middleware
app.use(express.json());  // use for bodyparser
app.use(cors());
// routes Middlewares 
app.use("/api/listings",listingRoutes);
app.use("/api/user",userRoutes);
// Running Server
app.listen(4000, () => console.log("App listening on port 4000"));