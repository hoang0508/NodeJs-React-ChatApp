import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import Input from "../input/Input";
import "./Comment.scss";
import { timeSince } from "../../util/ComvertTime";
import useValueToggle from "../../hooks/useValueToggle";
import { BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import useClickOutSide from "../../hooks/UseClickOutSide";
import { IoMdImages } from "react-icons/io";
import Picker from "emoji-picker-react";
// import "emoji-mart/css/emoji-mart.css";

const Comment = ({ post, countComment }) => {
  const {
    user: currentUser,
    setcommentData,
    commentData,
  } = useContext(AuthContext);

  const { valueToggle, handleValueToggle } = useValueToggle();
  const { valueToggle: updateComToggle, setValueToggle: setUpdateComToggle } =
    useValueToggle();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // hook form
  const { handleSubmit, control, reset } = useForm({
    mode: "onSubmit",
    defaultValues: {
      descComment: "",
    },
  });

  const [valueTextCm, setValueTextCm] = useState("");

  const handleChangeTextComment = (e) => {
    setValueTextCm(e.target.value);
  };

  const onEmojiClick = (event, emojiObject) => {
    console.log(
      "🚀 ~ file: Comment.jsx:44 ~ onEmojiClick ~ emojiObject",
      emojiObject
    );
    setValueTextCm(valueTextCm + emojiObject.srcElement);
  };

  // Post commnent
  const handleSubmitComemnt = async (values) => {
    try {
      const res = await axios.post("/comments", {
        postId: post?._id,
        userId: currentUser?._id,
        profilePicture: currentUser?.profilePicture,
        descComment: valueTextCm.descComment,
        usernameComment: currentUser?.username,
      });
      setcommentData([res.data, ...commentData]);
      // reset({
      //   descComment: "",
      // });
      valueTextCm("");
    } catch (error) {
      console.log(error);
    }
  };

  // Delte comnent
  const handleDeleteComment = (commentId) => {
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
        await axios.delete(`/comments/${commentId}`, {
          data: {
            postId: post?._id,
          },
        });
        const commentFilter =
          commentData &&
          commentData.length > 0 &&
          commentData.filter((item) => item._id !== commentId);
        setcommentData(commentFilter);
        Swal.fire("Xóa bài viết!", "Đã xóa bài viết.", "success");
      }
    });
  };

  // update commnet
  const handleUpdateComment = (itemData) => {
    reset({
      descComment: itemData?.descComment,
    });
    setUpdateComToggle(itemData);
  };

  // remove update
  const handleRemoveUpdate = () => {
    reset({
      descComment: "",
    });
    setUpdateComToggle(false);
  };

  // submit update comment
  const handleSubmitUpdateComment = async (values) => {
    const updateNewComment = {
      postId: post?._id,
      descComment: values?.descComment,
    };
    await axios.put(`/comments/${updateComToggle?._id}`, updateNewComment);
    const updateComment =
      commentData &&
      commentData.length > 0 &&
      commentData.map((item) => {
        if (item?._id === updateComToggle?._id) {
          return {
            ...item,
            ...updateNewComment,
          };
        }
        return item;
      });
    setcommentData(updateComment);
    setUpdateComToggle(false);
    reset({
      descComment: "",
    });
  };

  const {
    nodeRef,
    show: dotsToggle,
    setShow: setDotsToggle,
  } = useClickOutSide();

  // remove reset text input khi update
  useEffect(() => {
    if (updateComToggle === false) {
      reset({
        descComment: "",
      });
    }
  }, [reset, updateComToggle]);

  return (
    <div className="comment" ref={nodeRef}>
      {!!updateComToggle ? (
        <form
          className="comment-input"
          onSubmit={handleSubmit(handleSubmitUpdateComment)}
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
          <div className="comment-input--update">
            <Input
              placeholder={"Viết bình luận..."}
              className="comment-desc"
              name={"descComment"}
              control={control}
            >
              <IoMdImages />
            </Input>
            <div className="comment-input--update-btn">
              <span
                className="text-remove"
                onClick={() => handleRemoveUpdate()}
              >
                Hủy
              </span>
              <button className="btn-update" type="submit">
                Cập nhật
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form className="comment-input" onSubmit={handleSubmitComemnt}>
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
          {/* <Input
            placeholder={"Viết bình luận..."}
            className="comment-desc"
            name={"descComment"}
            control={control}
          >
            <IoMdImages />
          </Input> */}
          <input
            value={valueTextCm}
            onChange={(e) => handleChangeTextComment(e)}
            placeholder="Viết bình luận..."
          />
          <Picker onEmojiClick={onEmojiClick} />
        </form>
      )}
      <div className="comment-content">
        {valueToggle ? (
          <>
            {commentData &&
              commentData.length > 0 &&
              commentData.map((item) => {
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
                        {!!dotsToggle && dotsToggle?._id === item?._id && (
                          <div className="comment-func">
                            <span onClick={() => handleUpdateComment(item)}>
                              Chỉnh sửa bình luận
                            </span>
                            <span
                              onClick={() => handleDeleteComment(item?._id)}
                            >
                              Xóa bình luận
                            </span>
                          </div>
                        )}
                      </div>
                      <span
                        className="postTopRight-dots"
                        onClick={() => setDotsToggle(item)}
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
            {commentData &&
              commentData.length > 0 &&
              commentData.slice(0, 1).map((item) => {
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
                        {!!dotsToggle && dotsToggle?._id === item?._id && (
                          <div className="comment-func" ref={nodeRef}>
                            <span onClick={() => handleUpdateComment(item)}>
                              Chỉnh sửa bình luận
                            </span>
                            <span
                              onClick={() => handleDeleteComment(item?._id)}
                            >
                              Xóa bình luận
                            </span>
                          </div>
                        )}
                      </div>

                      <span
                        className="postTopRight-dots"
                        onClick={() => setDotsToggle(item)}
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
