import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GrFormClose } from "react-icons/gr";
import { IoIosImages } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import Input from "../input/Input";
import Label from "../label/Label";
import "./Modal.scss";
const ModalUser = ({ userId, closeModal = () => {} }) => {
  const [fileCover, setFileCover] = useState();
  const [filePicture, setFilePicture] = useState();

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
      schools: "",
      company: "",
    },
  });

  const handleSubmitUser = async (values) => {
    // const updateValue = {
    //   userId: userId,
    //   desc: desc,
    //   address: address,
    //   country: country,
    //   schools: schools,
    //   company: company,
    // };
    // if (fileCover) {
    //   const data = new FormData();
    //   const fileName = Date.now() + fileCover.name;
    //   data.append("name", fileName);
    //   data.append("file", fileCover);
    //   updateValue.coverPicture = fileName;
    //   try {
    //     await axios.post("/upload", data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // if (filePicture) {
    //   const data = new FormData();
    //   const fileName = Date.now() + filePicture.name;
    //   data.append("name", fileName);
    //   data.append("file", filePicture);
    //   updateValue.profilePicture = fileName;
    //   try {
    //     await axios.post("/upload", data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // try {
    //   await axios.put(`/users/${userId}`, updateValue);
    // } catch (error) {
    //   console.log(error);
    // }

    console.log(values);
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
      <div className="modal-share--content modal-share--content-user">
        <span className="modal-share--close" onClick={closeModal}>
          <GrFormClose />
        </span>
        <div className="modal-share--user">
          <div className="modal-user--image">
            <Label>Ảnh nền</Label>
            <div className="image-coverpicture">
              {fileCover ? (
                <img src={URL.createObjectURL(fileCover)} alt="#" />
              ) : (
                <Label htmlFor="fileCover" className="image-file">
                  <span className="option-icon">
                    <IoIosImages />
                  </span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name=""
                    id="fileCover"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFileCover(e.target.files[0])}
                  />
                </Label>
              )}
            </div>
          </div>
          <div className="modal-user--image">
            <Label>Ảnh đại diện</Label>
            <div className="image-profilePicture">
              {filePicture ? (
                <img src={URL.createObjectURL(filePicture)} alt="#" />
              ) : (
                <Label htmlFor="filePicture" className="image-file">
                  <span className="option-icon">
                    <IoIosImages />
                  </span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    name=""
                    id="filePicture"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFilePicture(e.target.files[0])}
                  />
                </Label>
              )}
            </div>
          </div>
          <form
            className="modal-user--form"
            onSubmit={handleSubmit(handleSubmitUser)}
          >
            <div className="modal-user--form-group">
              <div className="modal-user--group">
                <Label htmlFor="desc">Biệt danh</Label>
                <Input control={control} type="text" name="desc" id="desc" />
              </div>
              <div className="modal-user--group">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  control={control}
                  type="text"
                  name="address"
                  id="address"
                />
              </div>
            </div>
            <div className="modal-user--form-group">
              <div className="modal-user--group">
                <Label htmlFor="country">Quê quán</Label>
                <Input
                  control={control}
                  type="text"
                  name="country"
                  id="country"
                />
              </div>
              <div className="modal-user--group">
                <Label htmlFor="schools">Trường học</Label>
                <Input
                  control={control}
                  type="text"
                  name="schools"
                  id="schools"
                />
              </div>
            </div>
            <div className="modal-user--group">
              <Label htmlFor="company">Công ty</Label>
              <Input
                control={control}
                type="text"
                name="company"
                id="company"
              />
            </div>
            <button type="submit">Cập nhật</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUser;
