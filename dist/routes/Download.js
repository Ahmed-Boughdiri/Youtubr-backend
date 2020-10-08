"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var child_process_1 = require("child_process");
var route = express_1.default.Router();
function isValidUrl(url) {
    var suffix = url.slice(0, 17);
    if (suffix === "https://youtu.be/")
        return true;
    return false;
}
route.get("/", function (req, res) {
    var url = req.body.url;
    if (!url)
        return res.status(400).send({ error: "URL Must Be Provided" });
    var ValidUrl = isValidUrl(url);
    if (!ValidUrl)
        return res.status(400).send({ error: "An Invalid URL Has Been Provided" });
    var python = child_process_1.spawn("python", ["../../python/main.py"]);
    python.stdout.on("data", function (data) {
        console.log("Hello");
        console.log(data);
    });
    res.status(200).send("Done");
});
exports.default = route;
