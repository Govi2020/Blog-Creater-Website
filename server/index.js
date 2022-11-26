// import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRouters from "./routes/auth.js";
import multer from "multer";
import path from 'path';
import fs from "fs"

const __dirname = path.resolve();
const port = process.env.PORT || 8000;

const app = express();

var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200, // For legacy browser support
};

app.use(express.static(__dirname + "/build")); //use static files in ROOT/public folder
app.use(express.json());
// app.use(cors(corsOptions));
app.use(cookieParser());
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });
var dir = __dirname;
app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRouters);

app.get("/test", (req, res) => {
    res.json("It works");
});

app.listen(port, () => {
    console.log("Connected To Port " + port);
});
