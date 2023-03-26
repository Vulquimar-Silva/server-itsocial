import express from 'express';
import cors from 'cors';
import multer from "multer";
import cookieParser from 'cookie-parser';

import userRoutes from './routes/usersRoutes.js'
import postsRoutes from './routes/postsRoutes.js'
import commentsRoutes from './routes/commentsRoutes.js'
import likesRoutes from './routes/likesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import relationshipRoutes from "./routes/relationshipsRoutes.js";

const app = express();
const port = 3333;

// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next()
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/relationships", relationshipRoutes);

app.listen(port, () => {
  console.log(`API listening on ${port}`);
});