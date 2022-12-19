import React, { useState } from "react";
import { IoIosImages } from "react-icons/io";
import "./Modal.scss";
const ModalUser = ({ userId }) => {
  const [fileCover, setFileCover] = useState();
  const [filePicture, setFilePicture] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCoutry] = useState("");
  const [schools, setSchools] = useState("");
  const [company, setCompany] = useState("");

  console.log(userId);

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
            <label htmlFor="address">Tên của bạn</label>
            <input
              type="text"
              name=""
              id="address"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="modal-user--group">
            <label htmlFor="address">Địa chỉ</label>
            <input
              type="text"
              name=""
              id="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="modal-user--group">
            <label htmlFor="address">Quê quán</label>
            <input
              type="text"
              name=""
              id="address"
              onChange={(e) => setCoutry(e.target.value)}
            />
          </div>
          <div className="modal-user--group">
            <label htmlFor="address">Trường học</label>
            <input
              type="text"
              name=""
              id="address"
              onChange={(e) => setSchools(e.target.value)}
            />
          </div>
          <div className="modal-user--group">
            <label htmlFor="address">Công ty</label>
            <input
              type="text"
              name=""
              id="address"
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <button type="submit">Cập nhật</button>
        </form>
      </div>
    </div>
  );
};

export default ModalUser;
