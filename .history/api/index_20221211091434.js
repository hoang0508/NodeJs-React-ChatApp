import express, { json } from "express";
const app = express();
import { connect } from "mongoose";
import { config } from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./Router/users";
import authRouter from "./Router/auth";
import postRouter from "./Router/posts";

config();

connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log(`successfully connected`);
  })
  .catch((e) => {
    console.log(`not connected`);
  });

//middleware
app.use(json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(8088, () => {
  console.log("backend server is running!");
});
