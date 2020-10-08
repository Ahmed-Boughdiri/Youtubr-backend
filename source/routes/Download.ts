import express,{ Request,Response } from "express";
import { spawn } from "child_process";
import Link from "../models/Link";

const route = express.Router();

interface Body {
    url: String
}

function isValidUrl(url: String) {
    const suffix = url.slice(0,17);
    if(suffix === "https://youtu.be/") return true
    return false
}

async function saveLink(link:String, url:String) {
    const SavedLink = new Link({
        url: url,
        download_link: link
    })
    await SavedLink.save();
    return 
}

route.get("/", async (req:Request,res:Response) =>{
    const {
        url
    }:Body = req.body;
    if(!url) return res.status(400).send({ error: "URL Must Be Provided" });
    const ValidUrl = isValidUrl(url)
    if(!ValidUrl) return res.status(400).send({ error: "An Invalid URL Has Been Provided" })
    const linkExists:any = await Link.findOne({ url })
    if(linkExists) return res.status(200).send({ url: linkExists.download_link.split('\r')[0] })
    try {
        const python = spawn("python" , ["C:/Youtubr/node/python/main.py",url.toString()])
        let pythonData:String;
        python.stdout.on("data", data =>{
            pythonData = data.toString()
        })
        python.stderr.on("data", data =>{
            console.log(data.toString())
            res.status(500).send({ error: "An Error Has Occured, Please Try Again" })
        })
        python.on("close", code =>{
            if(code === 0) {
                const extractedUrl = pythonData.split("\n")[0];
                res.status(200).send({ url: extractedUrl })
                return saveLink(extractedUrl, url)
            }
            console.log(`Programme Exist With ${code} Code`)
        })
    }catch(err) {
        res.status(500).send({ error: "An Error Has Occured" })
    }
})

export default route;
