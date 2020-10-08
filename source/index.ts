import express,{ json } from "express";
import search from "./routes/Search";
import download from "./routes/Download";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;
app.listen(PORT, () =>console.log(`Server Running On Port ${PORT} ...`));

mongoose.connect(
    "mongodb+srv://ahmed:ahmed123@cluster0.ptoti.mongodb.net/youtubr?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true  },
    () =>console.log("Successfully Connected To The DB ...")    
)

app.use(json())
app.use("/api/search", search);
app.use("/api/download", download);
