import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import "./Comment.scss";
import useValueToggle from "../../hooks/useValueToggle";
import {
  BsFillEmojiLaughingFill,
  BsFillTrashFill,
  BsThreeDots,
} from "react-icons/bs";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import useClickOutSide from "../../hooks/UseClickOutSide";
import { IoIosImages } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work
moment.locale("vi");

const Comment = ({ post, countComment, commentData, setcommentData }) => {
  const {
    user: currentUser,
    handleFileImage,
    file,
    setFile,
  } = useContext(AuthContext);

  const { valueToggle, handleValueToggle } = useValueToggle();
  const { valueToggle: updateComToggle, setValueToggle: setUpdateComToggle } =
    useValueToggle();
  const { valueToggle: toggleEmoji, setValueToggle: setToggleEmoji } =
    useValueToggle();
  const [valueTextCm, setValueTextCm] = useState("");
  const [imageIdComment, setImageIdComment] = useState();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [fileUpdateCM, setFileUpdateCM] = useState(null);
  const [fileIdUpdate, setFileUpdate] = useState();

  // hook form
  const { handleSubmit, reset } = useForm({
    mode: "onSubmit",
    defaultValues: {
      descComment: "",
    },
  });

  // text comment
  const handleChangeTextComment = (e) => {
    setValueTextCm(e.target.value);
  };

  const onEmojiClick = (emojiData, event) => {
    setValueTextCm(valueTextCm + emojiData.emoji);
  };

  const handleFileImageComment = (id) => {
    setImageIdComment(id);
  };

  // Post commnent
  const handleSubmitComemnt = async (e) => {
    e.preventDefault();
    const newComment = {
      postId: post?._id,
      userId: currentUser?._id,
      profilePicture: currentUser?.profilePicture,
      descComment: valueTextCm,
      usernameComment: currentUser?.username,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newComment.imageComent = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post("/comments", newComment);
      setcommentData([res.data, ...commentData]);
      setValueTextCm("");
      setToggleEmoji(false);
      setFile(null);
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
    setValueTextCm(itemData?.descComment);
    setFileUpdate(itemData);
    setUpdateComToggle(itemData);
  };

  // remove update
  const handleRemoveUpdate = () => {
    setValueTextCm("");
    setUpdateComToggle(false);
  };

  // submit update comment
  const handleSubmitUpdateComment = async (e) => {
    e.preventDefault();
    const updateNewComment = {
      postId: post?._id,
      descComment: valueTextCm,
    };
    if (fileUpdateCM) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updateNewComment.imageComent = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

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
    setValueTextCm("");
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
          onSubmit={(e) => handleSubmitUpdateComment(e)}
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
            <div className="comment-input--desc">
              <input
                value={valueTextCm}
                onChange={(e) => handleChangeTextComment(e)}
                placeholder="Viết bình luận..."
              />
              <div className="comment-input--select">
                <label htmlFor="file" className="">
                  <span
                    className="option-icon"
                    onClick={() => handleFileImageComment(post?._id)}
                  >
                    <IoIosImages />
                  </span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name=""
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFileUpdateCM(e.target.files[0])}
                  />
                </label>
                <span
                  onClick={() => setToggleEmoji(!toggleEmoji)}
                  className="icon-emoji"
                >
                  <BsFillEmojiLaughingFill />
                </span>
              </div>
            </div>
            <div className="comment-input--update-file">
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
              {commentData &&
                commentData.length > 0 &&
                commentData.map((item) => (
                  <>
                    {!fileUpdateCM &&
                    item?.imageComent &&
                    fileIdUpdate?._id === item?._id ? (
                      <div className="comment-input--image comment-input--image-file">
                        <img
                          src={item?.imageComent ? PF + item?.imageComent : ""}
                          alt=""
                        />
                      </div>
                    ) : (
                      <>
                        {fileUpdateCM && fileIdUpdate?._id === item?._id && (
                          <div className="comment-input--image">
                            <img
                              src={URL.createObjectURL(fileUpdateCM)}
                              alt="#"
                            />
                            <div
                              className="comment-input--remove"
                              onClick={() => setFileUpdateCM(null)}
                            >
                              <BsFillTrashFill />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                ))}
            </div>
            {toggleEmoji && (
              <div className="comment-input--emoji">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
        </form>
      ) : (
        <form onSubmit={(e) => handleSubmitComemnt(e)}>
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
            <div className="comment-input--desc">
              <input
                value={valueTextCm}
                onChange={(e) => handleChangeTextComment(e)}
                placeholder="Viết bình luận..."
              />
              <div className="comment-input--select">
                <label htmlFor="file" className="">
                  <span
                    className="option-icon"
                    onClick={() => handleFileImageComment(post?._id)}
                  >
                    <IoIosImages />
                  </span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name=""
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => handleFileImage(e)}
                  />
                </label>
                <span
                  onClick={() => setToggleEmoji(!toggleEmoji)}
                  className="icon-emoji"
                >
                  <BsFillEmojiLaughingFill />
                </span>
              </div>
            </div>
            {toggleEmoji && (
              <div className="comment-input--emoji">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
          {file && post?._id === imageIdComment && (
            <div className="comment-input--image">
              <img src={URL.createObjectURL(file)} alt="#" />
              <div
                className="comment-input--remove"
                onClick={() => setFile(null)}
              >
                <BsFillTrashFill />
              </div>
            </div>
          )}
          <button type="submit" hidden></button>
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
                        {item?.imageComent && (
                          <div className="comment-content--image">
                            <img
                              src={
                                item?.imageComent ? PF + item?.imageComent : ""
                              }
                              alt=""
                            />
                          </div>
                        )}
                        <div className="comment-content--time">
                          <span>Thích</span>
                          <span>Phản hồi</span>
                          <span>{moment(item?.createdAt).fromNow()}</span>
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
                      {currentUser?._id === item?.userId && (
                        <span
                          className="postTopRight-dots"
                          onClick={() => setDotsToggle(item)}
                        >
                          <BsThreeDots />
                        </span>
                      )}
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

                        {item?.imageComent && (
                          <div className="comment-content--image">
                            <img
                              src={
                                item?.imageComent ? PF + item?.imageComent : ""
                              }
                              alt=""
                            />
                          </div>
                        )}

                        <div className="comment-content--time">
                          <span>Thích</span>
                          <span>Phản hồi</span>
                          <span>{moment(item?.createdAt).fromNow()}</span>
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
                      {currentUser?._id === item?.userId && (
                        <span
                          className="postTopRight-dots"
                          onClick={() => setDotsToggle(item)}
                        >
                          <BsThreeDots />
                        </span>
                      )}
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
