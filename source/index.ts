import express,{ json, Request, Response } from "express";
import search from "./routes/Search";
import download from "./routes/Download";

const app = express();
const PORT = 5000;
app.listen(PORT, () =>console.log(`Server Running On Port ${PORT} ...`));

app.use(json())
app.use("/api/search", search);
app.use("/api/download", download);
