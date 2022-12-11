const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./Router/users");
const authRoute = require("./Router/auth");
const postRoute = require("./Router/posts");

dotenv.config();

// mongoose.connect(
//   process.env.MONGO_URL,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("Connected to MongoDB");
//   }
// );
const Connect = async () => {
  try {
    const uri = process.env.MONGO_URL;
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useFindAndModify", false);
    await mongoose.connect(uri);
    console.log("MongoDB Connected...");
    return;
  } catch (err) {
    process.exit(1);
  }
};
Connect();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.send("welcome to homepage");
});
app.listen(8800, () => {
  console.log("Backend server is running!");
});
