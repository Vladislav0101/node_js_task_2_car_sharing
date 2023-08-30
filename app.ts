import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/mongoDB";
import parkRouter from "./routes/park/park.route";
import usersRouter from "./routes/users/users.route";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use("/park", parkRouter);
app.use("/users", usersRouter);

connectDB();

app.listen(PORT, () => console.log("Server started on port " + PORT));
