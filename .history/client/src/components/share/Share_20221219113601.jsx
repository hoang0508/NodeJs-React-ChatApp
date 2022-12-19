import "./share.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { BsFillTrashFill, BsFillEmojiLaughingFill } from "react-icons/bs";
import { IoIosImages } from "react-icons/io";
import ModalShare from "../modal/ModalShare";
import { FaVideo } from "react-icons/fa";

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
    handleInputDesc,
    setPosts,
    posts,
  } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmitShare = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: inputDesc,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      setPosts([res.data, ...posts]);
      setShowShare(false);
    } catch (error) {
      console.log(error);
    }
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
              placeholder={`${user?.username} ơi, bạn đang nghĩ gì thế?`}
              className="shareInput"
              ref={desc}
              onClick={() => handleClickShowShare()}
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
              handleSubmit={handleSubmitShare}
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
                <input
                  placeholder={`${user?.username} ơi, bạn đang nghĩ gì thế?`}
                  className="modal-share--input"
                  onChange={(e) => handleInputDesc(e)}
                />
                <div className={`${file ? "modal-share--upload" : ""}`}>
                  {file ? <img src={URL.createObjectURL(file)} /> : ""}
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
