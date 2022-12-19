import React, { useState } from "react";
import { IoIosImages } from "react-icons/io";
import "./Modal.scss";
const ModalUser = () => {
  const [fileCover, setFileCover] = useState();

  return (
    <div className="modal-share">
      <div className="modal-share--content">
        <div>
          <span></span>
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
        <div></div>
      </div>
    </div>
  );
};

export default ModalUser;
