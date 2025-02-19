"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing Required Packages And Dependencies
var express_1 = __importStar(require("express"));
var Search_1 = __importDefault(require("./routes/Search"));
var Download_1 = __importDefault(require("./routes/Download"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
// Initializing Express
var app = express_1.default();
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () { return console.log("Server Running On Port " + PORT + " ..."); });
// Initializing Dotenv
dotenv_1.default.config();
// Connecting To The DataBase
mongoose_1.default.connect((process.env.DB_CONNECT || ""), { useNewUrlParser: true, useUnifiedTopology: true }, function () { return console.log("Successfully Connected To The DB ..."); });
// Middlewares
app.use(cors_1.default());
app.use(express_1.json());
app.use("/api/search", Search_1.default);
app.use("/api/download", Download_1.default);
