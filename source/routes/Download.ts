// Importing Required Packages And Dependencies
import express,{ Request,Response } from "express";
import Link from "../models/Link";
import isValidUrl from "../util/ValidUrl";
import runPython from "../util/RunPython";

// Initializing The Route
const route = express.Router();

// The req.body Interface
interface Body {
    url: String
}

// The Download Route
route.post("/", async (req:Request,res:Response) =>{
    const {
        url
    }:Body = req.body;
    // Checking if url Value is Not Undefined, Unknown or ""
    if(!url) return res.status(400).send({ error: "URL Must Be Provided" });
    // Checking if The Given URL is a Valid Youtube URL
    const ValidUrl = isValidUrl(url)
    if(!ValidUrl) return res.status(400).send({ error: "An Invalid URL Has Been Provided" })
    console.log(url)
    // Checking if The Given Valid URL is Already Existed Inside The Database
    const linkExists:any = await Link.findOne({ url })
    // If The Given Valid URL is Existed in The DB The API Will Send The Availaible Data Inside The DB Without Running The Python Script
    if(linkExists) return res.status(200).send({ url: linkExists.download_link.split('\r')[0] })
    // If The Given Valid URL Doesn't Exist In The DB The Python Script Will Run And Send The Needed Data  
    return runPython(res,url)
})

export default route;
