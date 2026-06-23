import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/connectDB.js";
import authRouter from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/user.route.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);  

app.get("/", (req, res) => {
  res.json("Hello from the server");
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
  connectDB();
});