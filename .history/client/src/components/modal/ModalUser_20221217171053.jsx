import React, { useState } from "react";
import { IoIosImages } from "react-icons/io";
import "./Modal.scss";
const ModalUser = () => {
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
      </div>
    </div>
  );
};

export default ModalUser;
