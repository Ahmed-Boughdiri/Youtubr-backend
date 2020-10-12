"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing Required Packages And Dependencies
var child_process_1 = require("child_process");
var SaveLink_1 = __importDefault(require("./SaveLink"));
// This Function Handls The Running Of The Python Script And The Sending Of The Data
function default_1(res, url) {
    try {
        // Running of The Python Script
        var python = child_process_1.spawn("python", ["C:/Youtubr/node/python/main.py", url.toString()]);
        var pythonData_1;
        // Listening For The Given Data From The Python Script
        python.stdout.on("data", function (data) {
            pythonData_1 = data.toString();
        });
        // Handling Errors Inside The Pyhton Script
        python.stderr.on("data", function (data) {
            console.log(data.toString());
            res.status(500).send({ error: "An Error Has Occured, Please Try Again" });
        });
        // Handling The Ending of The Python Script
        python.on("close", function (code) {
            // The Python Script Ends Successfully Without Errors
            if (code === 0) {
                var extractedUrl = pythonData_1.split("\n")[0];
                res.status(200).send({ url: extractedUrl.split('\r')[0] });
                // Saving The Data Inside The Database
                return SaveLink_1.default(extractedUrl, url);
            }
            else {
                // Pyhton Script Ends With Errors
                res.status(500).send({ error: "An Error Has Occured Please Try Again" });
            }
            console.log("Programme Exist With " + code + " Code");
        });
    }
    catch (err) {
        // Errors Happening While Running The Python Script
        res.status(500).send({ error: "An Error Has Occured" });
    }
}
exports.default = default_1;
