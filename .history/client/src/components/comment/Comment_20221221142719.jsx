import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Input from "../input/Input";
import "./Comment.scss";

const Comment = () => {
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
          className="commnent-desc"
          name={"descComment"}
          control={control}
        />
      </div>
    </div>
  );
};

export default Comment;
