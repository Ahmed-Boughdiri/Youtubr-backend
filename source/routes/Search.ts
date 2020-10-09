// Importing Required Packages And Dependencies
import express, { Request, Response } from "express";
import searchYTB from "../util/SearchYTB";

// Initializing The Route
const route = express.Router();

// The req.body Interface
interface Body {
    search: String;
}

// The Search Route
route.get("/", async(req: Request, res: Response) => {
    const {
        search
    }:Body = req.body;
    // Checking if seach Value is Not Undefined, Unknown or ""
    if(!search) return res.status(400).send({ error: "Search Value Must Be Provided" })
    // Grabing The Result From The Search Value From The Youtube API
    const youtube_result = await searchYTB(search);
    // Checking For Errors or Any Empty Response
    if(!youtube_result) return res.status(400).send({ error: "There is No YouTube Music Search That Match Your Search" });
    // Sending Data After Traitement
    res.status(200).send(youtube_result)
});

export default route;
