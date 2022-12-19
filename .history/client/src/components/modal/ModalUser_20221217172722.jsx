import React, { useState } from "react";
import { IoIosImages } from "react-icons/io";
import "./Modal.scss";
const ModalUser = ({ userId }) => {
  const [fileCover, setFileCover] = useState();
  const [filePicture, setFilePicture] = useState();

  return (
    <div className="modal-share">
      <div className="modal-share--content">
        <div className="modal-user--image">
          <span>Ảnh nền</span>
          <div>
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
                onChange={(e) => setFileCover(e.target.files[0])}
              />
            </label>
          </div>
        </div>
        <div className="modal-user--image">
          <span>Ảnh đại diện</span>
          <div>
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
                onChange={(e) => setFilePicture(e.target.files[0])}
              />
            </label>
          </div>
        </div>
        <form className="modal-user--form">
          <div className="modal-user--group">
            <label htmlFor="address">Nơi ở</label>
            <input type="text" name="" id="address" />
          </div>
          <div className="modal-user--group">
            <label htmlFor="address">Quê quán</label>
            <input type="text" name="" id="address" />
          </div>
          <div className="modal-user--group">
            <label htmlFor="address">Trường học</label>
            <input type="text" name="" id="address" />
          </div>
          <div className="modal-user--group">
            <label htmlFor="address">Công ty</label>
            <input type="text" name="" id="address" />
          </div>
          <button type="submit">Cập nhật</button>
        </form>
      </div>
    </div>
  );
};

export default ModalUser;
