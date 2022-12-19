import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GrFormClose } from "react-icons/gr";
import { IoIosImages } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import Label from "../label/Label";
import "./Modal.scss";
const ModalUser = ({ userId, closeModal = () => {} }) => {
  const [fileCover, setFileCover] = useState();
  const [filePicture, setFilePicture] = useState();
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCoutry] = useState("");
  const [schools, setSchools] = useState("");
  const [company, setCompany] = useState("");

  const { user: currentUser } = useContext(AuthContext);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      desc: "",
      address: "",
      country: "",
      scholls: "",
      company: "",
    },
  });

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    const updateValue = {
      userId: userId,
      desc: desc,
      address: address,
      country: country,
      schools: schools,
      company: company,
    };
    if (fileCover) {
      const data = new FormData();
      const fileName = Date.now() + fileCover.name;
      data.append("name", fileName);
      data.append("file", fileCover);
      updateValue.coverPicture = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    if (filePicture) {
      const data = new FormData();
      const fileName = Date.now() + filePicture.name;
      data.append("name", fileName);
      data.append("file", filePicture);
      updateValue.profilePicture = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.put(`/users/${userId}`, updateValue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${currentUser?._id}`);
      if (res?.data) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...currentUser, ...res?.data })
        );
      }
    };
    fetchUser();
  }, [currentUser, userId]);

  return (
    <div className="modal-share">
      <div className="modal-share--content">
        <span className="modal-share--close" onClick={closeModal}>
          <GrFormClose />
        </span>
        <div className="modal-user--image">
          <Label>Ảnh nền</Label>
          <div>
            <Label htmlFor="file" className="">
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
            </Label>
          </div>
        </div>
        <div className="modal-user--image">
          <Label>Ảnh đại diện</Label>
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
        <form className="modal-user--form" onSubmit={handleSubmitUser}>
          <div className="modal-user--group">
            <Label htmlFor="address">Biệt danh</Label>
            <input
              type="text"
              name=""
              id="address"
              value={currentUser?.desc}
              onChange={(e) =>
                setDesc((prev) => ({ ...prev, desc: e.target.value }))
              }
            />
          </div>
          <div className="modal-user--group">
            <Label htmlFor="address">Địa chỉ</Label>
            <input
              type="text"
              name=""
              id="address"
              onChange={(e) => setAddress(e.target.value)}
              value={currentUser?.address}
            />
          </div>
          <div className="modal-user--group">
            <Label htmlFor="address">Quê quán</Label>
            <input
              type="text"
              name=""
              id="address"
              onChange={(e) => setCoutry(e.target.value)}
              value={currentUser?.country}
            />
          </div>
          <div className="modal-user--group">
            <Label htmlFor="address">Trường học</Label>
            <input
              type="text"
              name=""
              id="address"
              onChange={(e) => setSchools(e.target.value)}
              value={currentUser?.schools}
            />
          </div>
          <div className="modal-user--group">
            <Label htmlFor="address">Công ty</Label>
            <input
              type="text"
              name=""
              id="address"
              onChange={(e) => setCompany(e.target.value)}
              value={currentUser?.company}
            />
          </div>
          <button type="submit">Cập nhật</button>
        </form>
      </div>
    </div>
  );
};

export default ModalUser;
