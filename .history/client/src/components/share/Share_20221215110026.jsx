import "./share.scss";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {
  BsFillTrashFill,
  BsFillCameraVideoFill,
  BsFillEmojiLaughingFill,
} from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { IoIosImages } from "react-icons/io";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [showShare, setShowShare] = useState(false);

  const handleSubmitShare = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickShowShare = () => {
    setShowShare(!showShare);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
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
          <div className="shareVideo">
            <span>
              <BsFillCameraVideoFill />
            </span>
            <span>
              <IoIosImages />
            </span>
            <span>
              <BsFillEmojiLaughingFill />
            </span>
          </div>
          {showShare && (
            <div className="modal-share">
              <div className="modal-share--content">
                <span
                  className="modal-share--close"
                  onClick={() => setShowShare(false)}
                >
                  <GrFormClose />
                </span>
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
                  className="shareInput"
                  ref={desc}
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
                <form className="shareBottom" onSubmit={handleSubmitShare}>
                  <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                      <PermMedia htmlColor="tomato" className="shareIcon" />
                      <span className="shareOptionText">Ảnh/Video</span>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        name=""
                        id="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                    <div className="shareOption">
                      <Label htmlColor="blue" className="shareIcon" />
                      <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                      <Room htmlColor="green" className="shareIcon" />
                      <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                      <EmojiEmotions
                        htmlColor="goldenrod"
                        className="shareIcon"
                      />
                      <span className="shareOptionText">Feelings</span>
                    </div>
                  </div>
                  <button className="shareButton" type="submit">
                    Chia sẻ
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
