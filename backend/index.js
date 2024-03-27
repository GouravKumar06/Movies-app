import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
dotenv.config();

const app = express();
import userRoutes from "./routes/userRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",express.static("uploads"));
app.use(cookieParser());
app.use(cors(
    {
        origin:["http://localhost:3000","https://movies-app.onrender.com"],
        credentials:true,
    }
));

const port = process.env.PORT || 6000;

//routes
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/genre",genreRoutes);
app.use("/api/v1/movie",movieRoutes);
app.use("/api/v1/upload",uploadRoutes);

// const __dirname = path.resolve();
// app.use("/uploads",express.static(path.join(__dirname + "/uploads")));


connectDB();
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})