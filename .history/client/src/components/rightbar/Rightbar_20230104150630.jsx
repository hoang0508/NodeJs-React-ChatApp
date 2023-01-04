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
import { MdLocationPin, MdOutlineCastConnected, MdWork } from "react-icons/md";
import Button from "../button/Button";
import Follow from "../follow/Follow";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work
import { AiFillClockCircle } from "react-icons/ai";
moment.locale("vi");

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [showModalUser, setShowModalUser] = useState(false);
  const [userBirthDay, setUserBirthDay] = useState([]);
  //
  // get user All
  useEffect(() => {
    const fetchDataUserAll = async () => {
      const res = await axios.get(`/users/userAll`);
      setUserBirthDay(res?.data);
    };
    fetchDataUserAll();
  }, []);

  // filter user date birthday
  const filterUserBirthday =
    userBirthDay &&
    userBirthDay.length > 0 &&
    userBirthDay.filter(
      (item) =>
        moment(item?.birthDate).format("l") ===
        moment(userBirthDay[0]?.birthDate).format("l")
    );

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
            {filterUserBirthday.length === 1 ? (
              <span>{filterUserBirthday?.username}</span>
            ) : (
              <span>kk</span>
            )}
            {/* <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today. */}
          </span>
        </div>
        <Follow />
        <h4 className="rightbarTitle">Bạn bè hoạt động</h4>
        <ul className="rightbarFriendList">
          <Online />
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
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              <MdOutlineCastConnected />
            </span>
            <span className="rightbarInfoValue">
              {user?.followers ? (
                <span>
                  Có<strong>{user?.followers?.length}</strong> người theo dõi
                </span>
              ) : (
                "Chưa cập nhật..."
              )}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              <AiFillClockCircle />
            </span>
            <span className="rightbarInfoValue">
              {user?.createdAt ? (
                <span>
                  Tham gia vào
                  <strong>{moment(user?.createdAt).format("ll")}</strong>
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
