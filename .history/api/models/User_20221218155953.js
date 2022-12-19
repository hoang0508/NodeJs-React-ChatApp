const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      // required: true,
      max: 50,
      unique: true,
    },
    sdt: {
      type: Number,
    },
    password: {
      type: String,
      // required: true,
      max: 8,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      default: "",
      max: 50,
    },
    address: {
      type: String,
      default: "",
      max: 50,
    },
    country: {
      type: String,
      default: "",
      max: 50,
    },
    schools: {
      type: String,
      default: "",
      max: 50,
    },
    company: {
      type: String,
      default: "",
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
