import express, { Request, Response } from "express";
import searchYTB from "../util/SearchYTB";

const route = express.Router();

interface Body {
    search: String;
}

route.get("/", async(req: Request, res: Response) => {
    const {
        search
    }:Body = req.body;
    if(!search) return res.status(400).send({ error: "Search Value Must Be Provided" })
    const youtube_result = await searchYTB(search);
    if(!youtube_result) return res.status(400).send({ error: "There is No YouTube Music Search That Match Your Search" });
    res.status(200).send(youtube_result)
});

export default route;
