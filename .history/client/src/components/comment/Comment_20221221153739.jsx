import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Input from "../input/Input";
import "./Comment.scss";

const Comment = ({ dataComment }) => {
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
            loading="lazy"
          />
        </div>
        <Input
          placeholder={"Viết bình luận..."}
          className="comment-desc"
          name={"descComment"}
          control={control}
        ></Input>
      </div>
      <div className="comment-content">
        {dataComment &&
          dataComment.length > 0 &&
          dataComment.map((item) => (
            <div className="comment-content--item">
              <div className="postProfileImg">
                <img
                  src={
                    item?.profilePicture
                      ? PF + item?.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="comment-content--desc">
                <h3>{item?.username}</h3>
                <span>{item?.desc}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comment;
