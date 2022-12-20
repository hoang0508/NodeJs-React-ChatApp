import React, { useContext } from "react";
import { GrFormClose } from "react-icons/gr";
import { IoIosImages } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { AiTwotoneTags } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";
import "./Modal.scss";
import { BsFillEmojiLaughingFill, BsThreeDots } from "react-icons/bs";
import Button from "../button/Button";
const ModalUpdate = ({
  children,
  heading = "",
  textBtn = "",
  handleSubmit,
  closeModal = () => {},
  ...props
}) => {
  const { file, handleFileImage, setShowPostUpdate } = useContext(AuthContext);
  const handleSetModalFileImg = (e) => {
    handleFileImage(e);
    // setShowPostUpdate(null);
  };
  return (
    <div className="modal-share">
      <div className="modal-share--content">
        <div className="modal-share--heading">
          <h3 className="modal-share--title">{heading}</h3>
          <span className="modal-share--close" onClick={closeModal}>
            <GrFormClose />
          </span>
        </div>
        <div className={file ? "modal-share--scroll" : ""}>
          <form className="modal-share--add" onSubmit={handleSubmit}>
            {children}
            <div className="modal-share--add-option">
              <p className="option-text">Thêm vào bài viết của bạn</p>
              <div className="option-select">
                <label htmlFor="file" className="">
                  <span className="option-icon">
                    <IoIosImages />
                  </span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name=""
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => handleSetModalFileImg(e)}
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
            </div>
            <Button className="modal-share--button" type="submit">
              {textBtn}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
