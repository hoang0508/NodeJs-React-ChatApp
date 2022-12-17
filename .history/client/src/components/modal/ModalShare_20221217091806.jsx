import { EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons";
import React, { useContext } from "react";
import { GrFormClose } from "react-icons/gr";
import { IoIosImages } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { AiTwotoneTags } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import "./Modal.scss";
import { BsFillEmojiLaughingFill, BsThreeDots } from "react-icons/bs";
const ModalShare = ({
  children,
  heading = "",
  textBtn = "",
  handleSubmit,
  closeModal = () => {},
  ...props
}) => {
  const { setFile } = useContext(AuthContext);
  return (
    <div className="modal-share">
      <div className="modal-share--content">
        <h3 className="modal-share--title">{heading}</h3>
        <span className="modal-share--close" onClick={closeModal}>
          <GrFormClose />
        </span>
        {children}
        <form className="modal-share--add" onSubmit={handleSubmit}>
          <div className="modal-share--add-option">
            <label htmlFor="file" className="">
              <span className="option-icon">
                <IoIosImages />
              </span>
              <span className="option-text">Ảnh/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                name=""
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <span className="option-icon">
              <AiTwotoneTags />
            </span>
            <span className="option-icon">
              <BsFillEmojiLaughingFill />
            </span>
            <span className="option-icon">
              <IoLocation />
            </span>
            <span className="option-icon">
              <BsThreeDots />
            </span>
          </div>
          <button className="moda-share--button" type="submit">
            {textBtn}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalShare;
