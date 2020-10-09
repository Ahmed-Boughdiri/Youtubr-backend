"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var SaveLink_1 = __importDefault(require("./SaveLink"));
function default_1(res, url) {
    try {
        var python = child_process_1.spawn("python", ["C:/Youtubr/node/python/main.py", url.toString()]);
        var pythonData_1;
        python.stdout.on("data", function (data) {
            pythonData_1 = data.toString();
        });
        python.stderr.on("data", function (data) {
            console.log(data.toString());
            res.status(500).send({ error: "An Error Has Occured, Please Try Again" });
        });
        python.on("close", function (code) {
            if (code === 0) {
                var extractedUrl = pythonData_1.split("\n")[0];
                res.status(200).send({ url: extractedUrl.split('\r')[0] });
                return SaveLink_1.default(extractedUrl, url);
            }
            console.log("Programme Exist With " + code + " Code");
        });
    }
    catch (err) {
        res.status(500).send({ error: "An Error Has Occured" });
    }
}
exports.default = default_1;
