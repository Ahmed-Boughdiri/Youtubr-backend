import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    url: String,
    download_link: String
})

export default mongoose.model("Link", linkSchema);
