import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Input from "../input/Input";
import "./Comment.scss";

const Comment = ({ dataComment, post }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [postIdCM, sePostIdCM] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { handleSubmit, control, reset } = useForm({
    mode: "onSubmit",
    defaultValues: {
      descComment: "",
    },
  });

  // console.log(postIdCM);

  const handleSubmitComemnt = async (values) => {
    // const newComments = {
    //   postId: "63a09125669b1829f47cd4ef",
    //   userId: currentUser?._id,
    //   profilePicture: currentUser?.profilePicture,
    //   desc: values.descComment,
    //   username: currentUser?.username,
    // };
    try {
      await axios.post("/comments", {
        postId: "63a09125669b1829f47cd4ef",
        userId: currentUser?._id,
        profilePicture: currentUser?.profilePicture,
        descComment: values.descComment,
        usernameComnent: "kkkk",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comment">
      <form
        className="comment-input"
        onSubmit={handleSubmit(handleSubmitComemnt)}
      >
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
          onClick={() => sePostIdCM(post?._id)}
        ></Input>
        <button type="submit">button</button>
      </form>
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
                <h3 className="comment-content--desc-name">
                  {item?.usernameComnent}
                </h3>
                <span className="comment-content--desc-text">
                  {item?.descComment}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comment;
