// Importing Required Packages And Dependencies
import express,{ json } from "express";
import search from "./routes/Search";
import download from "./routes/Download";
import mongoose from "mongoose";
import dotenv from "dotenv";


// Initializing Express
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>console.log(`Server Running On Port ${PORT} ...`));

// Initializing Dotenv
dotenv.config();

// Connecting To The DataBase
mongoose.connect(
    (process.env.DB_CONNECT || ""),
    { useNewUrlParser: true, useUnifiedTopology: true  },
    () =>console.log("Successfully Connected To The DB ...")    
)

// Middlewares
app.use(json())
app.use("/api/search", search);
app.use("/api/download", download);
