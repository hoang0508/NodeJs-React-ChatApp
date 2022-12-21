import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Input from "../input/Input";
import "./Comment.scss";

const Comment = ({ dataComment }) => {
  console.log("🚀 ~ file: Comment.jsx:9 ~ Comment ~ dataComment", dataComment);
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const userId =
    dataComment &&
    dataComment.length > 0 &&
    dataComment.map((item) => [...new Set(item?.userId)]);
  console.log("🚀 ~ file: Comment.jsx:14 ~ Comment ~ userId", userId);

  const { handleSubmit, control } = useForm({
    mode: "onSubmit",
  });
  return (
    <div className="comment">
      <div className="comment-input">
        <div className="postProfileImg">
          <img
            src={
              currentUser?.profilePicture
                ? PF + currentUser?.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
        </div>
        <Input
          placeholder={"Viết bình luận..."}
          className="comment-desc"
          name={"descComment"}
          control={control}
        ></Input>
      </div>
      <div className="commnent-content">
        {dataComment &&
          dataComment.length > 0 &&
          dataComment.map((item) => (
            <div className="commnent-content--item">{item?.desc}</div>
          ))}
      </div>
    </div>
  );
};

export default Comment;
