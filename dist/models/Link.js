"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing Required Packages And Dependencies
var mongoose_1 = __importDefault(require("mongoose"));
// The Link Schema
var linkSchema = new mongoose_1.default.Schema({
    url: String,
    download_link: String
});
// Exporting The Link Model
exports.default = mongoose_1.default.model("Link", linkSchema);
