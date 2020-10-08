import express,{ Request,Response } from "express";
import { spawn } from "child_process";

const route = express.Router();

interface Body {
    url: String
}

function isValidUrl(url: String) {
    const suffix = url.slice(0,17);
    if(suffix === "https://youtu.be/") return true
    return false
}

route.get("/", (req:Request,res:Response) =>{
    const {
        url
    } = req.body;
    if(!url) return res.status(400).send({ error: "URL Must Be Provided" });
    const ValidUrl = isValidUrl(url)
    if(!ValidUrl) return res.status(400).send({ error: "An Invalid URL Has Been Provided" })
    const python = spawn("python" , ["../../python/main.py"])
    python.stdout.on("data", data =>{
        console.log("Hello")
        console.log(data)
    })
    res.status(200).send("Done")
})

export default route;
