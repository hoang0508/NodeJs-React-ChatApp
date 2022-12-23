import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Input from "../input/Input";
import "./Comment.scss";
import moment from "moment";
import { timeSince } from "../../util/ComvertTime";
import useValueToggle from "../../hooks/useValueToggle";
import { BsThreeDots } from "react-icons/bs";

const Comment = ({ dataComment, post, countComment }) => {
  const {
    user: currentUser,
    setcommentData,
    commentData,
  } = useContext(AuthContext);

  const { valueToggle, handleValueToggle } = useValueToggle();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
        ></Input>
      </form>
      <div className="comment-content">
        {valueToggle ? (
          <>
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
                      <div>
                        <div className="comment-content--desc">
                          <h3 className="comment-content--desc-name">
                            {item?.usernameComment}
                          </h3>
                          <span className="comment-content--desc-text">
                            {item?.descComment}
                          </span>
                        </div>
                        <div className="comment-content--time">
                          <span>Thích</span>
                          <span>Phản hồi</span>
                          <span>{timeSince(new Date(item?.createdAt))}</span>
                        </div>
                      </div>
                      <span
                        className="postTopRight-dots"
                        // onClick={() => handleValueToggle()}
                      >
                        <BsThreeDots />
                      </span>
                    </div>
                  );
                }
              })}
          </>
        ) : (
          <>
            {dataComment &&
              dataComment.length > 0 &&
              dataComment.slice(0, 1).map((item) => {
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
                      <div>
                        <div className="comment-content--desc">
                          <h3 className="comment-content--desc-name">
                            {item?.usernameComment}
                          </h3>
                          <span className="comment-content--desc-text">
                            {item?.descComment}
                          </span>
                        </div>
                        <div className="comment-content--time">
                          <span>Thích</span>
                          <span>Phản hồi</span>
                          <span>{timeSince(new Date(item?.createdAt))}</span>
                        </div>
                        <div className="comment-func">
                          <span>Chỉnh sửa bình luận</span>
                          <span>Xóa bình luận</span>
                        </div>
                      </div>

                      <span
                        className="postTopRight-dots"
                        // onClick={() => handleValueToggle()}
                      >
                        <BsThreeDots />
                      </span>
                    </div>
                  );
                }
              })}
          </>
        )}
      </div>
      {countComment > 0 && (
        <div
          className={valueToggle ? "comment-more--hidden" : "comment-more"}
          onClick={handleValueToggle}
        >
          Xem thêm bình luận
        </div>
      )}
    </div>
  );
};

export default Comment;
