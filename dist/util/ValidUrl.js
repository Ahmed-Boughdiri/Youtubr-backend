"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This Function Checks If The Given URL is a Valid Youtube URL
function default_1(url) {
    var suffix = url.slice(0, 17);
    if (suffix === "https://youtu.be/")
        return true;
    return false;
}
exports.default = default_1;
