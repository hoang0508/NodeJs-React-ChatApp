import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Input from "../input/Input";
import "./Comment.scss";
import moment from "moment";

const Comment = ({ dataComment, post }) => {
  const {
    user: currentUser,
    setcommentData,
    commentData,
  } = useContext(AuthContext);
  const [postIdCM, sePostIdCM] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  const { handleSubmit, control, reset } = useForm({
    mode: "onSubmit",
    defaultValues: {
      descComment: "",
    },
  });

  // console.log(postIdCM);

  const handleSubmitComemnt = async (values) => {
    try {
      const res = await axios.post("/comments", {
        postId: post?._id,
        userId: currentUser?._id,
        profilePicture: currentUser?.profilePicture,
        descComment: values.descComment,
        usernameComment: currentUser?.username,
      });
      setcommentData([res.data, ...commentData]);
      reset({
        descComment: "",
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
      </form>
      <div className="comment-content">
        {dataComment &&
          dataComment.length > 0 &&
          dataComment.map((item) => {
            if (item?.postId === post?._id) {
              return (
                <div className="comment-content--item" key={item?._id}>
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
                      {item?.usernameComment}
                    </h3>
                    <span className="comment-content--desc-text">
                      {item?.descComment}
                    </span>
                    {/* {moment(item?.createdAt).fromNow()} */}
                    {timeSince(new Date(item?.createdAt))}
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Comment;
