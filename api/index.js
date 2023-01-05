const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routers/users");
const authRoute = require("./routers/auth");
const postRoute = require("./routers/posts");
const commentRouter = require("./routers/comments");
const conversationRoute = require("./routers/conversations");
const messageRoute = require("./routers/messages");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Kết nối database thành công");
  }
);

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// Upaload Image

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File được cập nhật thành công!");
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRouter);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("Chào mừng đến trang chủ");
});
app.listen(8800, () => {
  console.log("Backend server đã chạy!");
});
// $push: toán tử nối thêm một giá trị đã chỉ định vào một mảng.
//$pull:Cáctoán tử loại bỏ khỏi một mảng hiện có tất cả các phiên bản của một giá trị hoặc các giá trị khớp với một điều kiện đã chỉ định.
//$set: Cáctoán tử thay thế giá trị của một trường bằng giá trị đã chỉ định.
// $all Cáctoán tử chọn các tài liệu trong đó giá trị của một trường là một mảng chứa tất cả các phần tử đã chỉ định
// $in: Cáctoán tử chọn các tài liệu trong đó giá trị của một trường bằng với bất kỳ giá trị nào trong mảng đã chỉ định.
