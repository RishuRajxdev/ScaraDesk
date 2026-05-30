import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/connectDB.js";
const PORT = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.json("Hello from the server");
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
  connectDB();
});
