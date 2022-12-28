import "./rightbar.scss";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ModalUser from "../modal/ModalUser";
import { IoSchoolSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { MdLocationPin, MdWork } from "react-icons/md";
import Button from "../button/Button";
import Follow from "../follow/Follow";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [showModalUser, setShowModalUser] = useState(false);

  // friends
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user?._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user?._id]);

  const handleShowModalUser = () => {
    setShowModalUser(!showModalUser);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <Follow />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Chi tiết:</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              <FaHome />
            </span>
            <span className="rightbarInfoValue">
              {user?.address ? (
                <span>
                  Sống tại<strong>{user.address}</strong>
                </span>
              ) : (
                "Chưa cập nhật..."
              )}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              <MdLocationPin />
            </span>
            <span className="rightbarInfoValue">
              {user?.country ? (
                <span>
                  Đến từ<strong>{user?.country}</strong>
                </span>
              ) : (
                "Chưa cập nhật..."
              )}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              <IoSchoolSharp />
            </span>
            <span className="rightbarInfoValue">
              {user?.schools ? (
                <span>
                  Học ở<strong>{user?.schools}</strong>
                </span>
              ) : (
                "Chưa cập nhật..."
              )}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              <MdWork />
            </span>
            <span className="rightbarInfoValue">
              {user?.company ? (
                <span>
                  Làm việc tại<strong>{user?.company}</strong>
                </span>
              ) : (
                "Chưa cập nhật..."
              )}
            </span>
          </div>
        </div>
        {user.username === currentUser.username && (
          <Button
            className="button-update"
            onClick={() => handleShowModalUser()}
          >
            Cập nhật thông tin
          </Button>
        )}
        {showModalUser && (
          <ModalUser
            userId={currentUser?._id}
            closeModal={() => setShowModalUser(false)}
            heading="Cập nhật thông tin"
          />
        )}
        <h4 className="rightbarTitle">Đang theo dõi</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend?._id}
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  loading="lazy"
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
