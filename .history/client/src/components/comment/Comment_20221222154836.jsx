import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import Input from "../input/Input";
import "./Comment.scss";
import { timeSince } from "../../util/ComvertTime";
import useValueToggle from "../../hooks/useValueToggle";
import { BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

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

  // Post commnent
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

  // Delte comnent
  const handleDeleteComment = ({ commentId }) => {
    Swal.fire({
      title: "Bạn có chắc chắn xóa?",
      text: "Nội dung này sẽ xóa bài viết của bạn",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Tôi đồng ý!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/posts/${commentId}`, {
          data: {
            postId: post?.postId,
          },
        });
        // const postData =
        //   posts &&
        //   posts.length > 0 &&
        //   posts.filter((item) => item._id !== postId);
        // setPosts(postData);
        Swal.fire("Xóa bài viết!", "Đã xóa bài viết.", "success");
      }
    });
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
                      <div className="comment-content--list">
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
                          <span onClick={() => handleDeleteComment(item?._id)}>
                            Xóa bình luận
                          </span>
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
                      <div className="comment-content--list">
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
                          <span onClick={() => handleDeleteComment(item?._id)}>
                            Xóa bình luận
                          </span>
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
