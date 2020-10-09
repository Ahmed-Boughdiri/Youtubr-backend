// Importing Required Packages And Dependencies
import mongoose from "mongoose";

// The Link Schema
const linkSchema = new mongoose.Schema({
    url: String,
    download_link: String
})

// Exporting The Link Model
export default mongoose.model("Link", linkSchema);
