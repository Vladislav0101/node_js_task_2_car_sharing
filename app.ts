import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/mongoDB";
import parkRouter from "./routes/park/park.route";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use("", parkRouter);

connectDB();

app.listen(PORT, () => console.log("Server started on port " + PORT));

