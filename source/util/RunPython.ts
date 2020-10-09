// Importing Required Packages And Dependencies
import { spawn } from "child_process";
import { Response } from "express";
import saveLink from "./SaveLink";

// This Function Handls The Running Of The Python Script And The Sending Of The Data
export default function(res:Response,url:String):void {
    try {
        // Running of The Python Script
        const python = spawn("python" , ["C:/Youtubr/node/python/main.py",url.toString()])
        let pythonData:String;
        // Listening For The Given Data From The Python Script
        python.stdout.on("data", data =>{
            pythonData = data.toString()
        })
        // Handling Errors Inside The Pyhton Script
        python.stderr.on("data", data =>{
            console.log(data.toString())
            res.status(500).send({ error: "An Error Has Occured, Please Try Again" })
        })
        // Handling The Ending of The Python Script
        python.on("close", code =>{
            // The Python Script Ends Successfully Without Errors
            if(code === 0) {
                const extractedUrl = pythonData.split("\n")[0];
                res.status(200).send({ url: extractedUrl.split('\r')[0] })
                // Saving The Data Inside The Database
                return saveLink(extractedUrl, url)
            } else {
                // Pyhton Script Ends With Errors
                res.status(500).send({ error: "An Error Has Occured Please Try Again" })
            }
            console.log(`Programme Exist With ${code} Code`)
        })
    }catch(err) {
        // Errors Happening While Running The Python Script
        res.status(500).send({ error: "An Error Has Occured" })
    }
}
