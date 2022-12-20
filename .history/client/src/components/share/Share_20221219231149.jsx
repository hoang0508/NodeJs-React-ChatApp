import "./share.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BsFillTrashFill, BsFillEmojiLaughingFill } from "react-icons/bs";
import { IoIosImages } from "react-icons/io";
import ModalShare from "../modal/ModalShare";
import { FaVideo } from "react-icons/fa";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Input from "../input/Input";
import { useForm } from "react-hook-form";

export default function Share() {
  const {
    user,
    desc,
    file,
    setFile,
    showShare,
    handleClickShowShare,
    setShowShare,
    inputDesc,
    setInputDesc,
    handleInputDesc,
    setPosts,
    posts,
  } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { handleSubmit } = useForm({
    mode: "onSubmit",
    defaultValues: {
      inputDesc: "",
    },
  });

  const handleSubmitShare = async (values) => {
    console.log("🚀 ~ file: Share.jsx:40 ~ handleSubmitShare ~ values", values);
    // e.preventDefault();
    // const newPost = {
    //   userId: user._id,
    //   desc: inputDesc,
    // };
    // if (file) {
    //   const data = new FormData();
    //   const fileName = Date.now() + file.name;
    //   data.append("name", fileName);
    //   data.append("file", file);
    //   newPost.img = fileName;
    //   try {
    //     await axios.post("/upload", data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // try {
    //   const res = await axios.post("/posts", newPost);
    //   setPosts([res.data, ...posts]);
    //   setFile(null);
    //   setInputDesc("");
    //   setShowShare(false);
    //   toast.success("Đăng bài viết thành công!!");
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Đăng bài thất bại!!");
    // }
  };

  const handleCloseModalShare = () => {
    handleClickShowShare();
    setInputDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <div className="shareProfile">
            <div className="shareProfileImg">
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <input
              placeholder={`${user?.username
                ?.split(" ")
                .pop()} ơi, bạn đang nghĩ gì thế?`}
              className="shareInput"
              ref={desc}
              onClick={() => handleCloseModalShare()}
            />
          </div>
          <div className="shareVideo">
            <div className="shareVideo-item">
              <span className="shareVideo-item--video">
                <FaVideo />
              </span>
              <span className="shareVideo-item--text">Video trực tiếp</span>
            </div>

            <div className="shareVideo-item">
              <span className="shareVideo-item--image">
                <IoIosImages />
              </span>
              <span className="shareVideo-item--text">Ảnh/video</span>
            </div>
            <div className="shareVideo-item">
              <span className="shareVideo-item--emjoy">
                <BsFillEmojiLaughingFill />
              </span>
              <span className="shareVideo-item--text">Cảm xúc/hoạt động</span>
            </div>
          </div>
          {showShare && (
            <ModalShare
              heading="Tạo bài viết"
              textBtn="Chia sẻ"
              handleSubmit={handleSubmit(handleSubmitShare)}
              closeModal={() => setShowShare(false)}
            >
              <>
                <div className="modal-share--info">
                  <div className="modal-share--avatar">
                    <img
                      src={
                        user.profilePicture
                          ? PF + user.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                    />
                  </div>
                  <span className="modal-share--name">{user?.username}</span>
                </div>
                {/* {inputDesc ? (
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                  />
                ) : (
                  
                )} */}
                <Input
                  placeholder={`${user?.username
                    ?.split(" ")
                    .pop()} ơi, bạn đang nghĩ gì thế?`}
                  className="modal-share--input"
                  name="inputDesc"
                />
                <div className={`${file ? "modal-share--upload" : ""}`}>
                  {file ? <img src={URL.createObjectURL(file)} alt="#" /> : ""}
                  {file && (
                    <span
                      className="modal-share--upload-remove"
                      onClick={() => setFile(null)}
                    >
                      <BsFillTrashFill />
                    </span>
                  )}
                </div>
              </>
            </ModalShare>
          )}
        </div>
      </div>
    </div>
  );
}
