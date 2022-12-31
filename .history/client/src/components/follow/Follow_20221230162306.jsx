import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Follow = () => {
  const [userDataAll, setUserDataAll] = useState([]);
  const { user: currentUser, dispatch, setPosts } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // get user All
  useEffect(() => {
    const fetchDataUserAll = async () => {
      const res = await axios.get(`/users/userAll`);
      setUserDataAll(res?.data);
    };
    fetchDataUserAll();
  }, []);

  const getUserAllFilter =
    userDataAll &&
    userDataAll.length > 0 &&
    userDataAll.filter((item) => {
      if (
        item?._id !== currentUser?._id &&
        item?.followers.includes(currentUser?._id) === false
      ) {
        return item;
      }
    });

  const handleFollow = async (data) => {
    const res = await axios.put(`/users/${data?._id}/follow`, {
      userId: currentUser._id,
    });
    dispatch({ type: "FOLLOW", payload: data._id });
    if (res?.data === "user has been followed") {
      const dataTimelinePost = await axios.get(
        `/posts/timeline/${currentUser._id}`
      );
      setPosts(
        dataTimelinePost?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        )
      );
      toast.success(`Bạn đã theo dõi ${data?.username}`);
    }
  };

  return (
    <div className="friend-follow">
      <h3 className="friend-follow--title">Bạn có thể theo dõi</h3>
      {getUserAllFilter && getgetUserAllFilter.length < 0 && (
        <span>Chưa có người theo dõi!!</span>
      )}
      {getUserAllFilter &&
        getUserAllFilter.length > 0 &&
        getUserAllFilter.map((item) => (
          <div key={item?._id} className="friend-follow--item">
            <div className="friend-follow--item-img">
              <img
                src={
                  item?.profilePicture
                    ? PF + item?.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt="#"
                loading="lazy"
              />
            </div>
            <div className="friend-follow--item-info">
              <div className="friend-follow--item-name">{item?.username}</div>
              <button
                className="friend-follow--item-button"
                onClick={(e) => handleFollow(item)}
              >
                Theo dõi
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Follow;
