import "./rightbar.scss";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, ContactsOutlined, Remove } from "@material-ui/icons";
import ModalUser from "../modal/ModalUser";
import { IoSchoolSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { MdLocationPin, MdWork } from "react-icons/md";
import Button from "../button/Button";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [showModalUser, setShowModalUser] = useState(false);
  const [userDataAll, setUserDataAll] = useState([]);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (currentUser.followings.includes(user?.id)) {
      setFollowed(currentUser.followings.includes(user?.id));
    } else {
      setFollowed(false);
    }
  }, [currentUser.followings, user?.id]);

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
        item?.followings.includes(currentUser?._id) === false
      ) {
        return item;
      }
    });

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (followed) {
        await axios.put(`/users/${user?._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user?._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      }
    } catch (err) {}
    setFollowed(!followed);
  };

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
        {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}
        <div className="friend-follow">
          <h3>B???n c?? th??? theo d??i</h3>
          {getUserAllFilter &&
            getUserAllFilter.length > 0 &&
            getUserAllFilter.map((item) => (
              <div key={item?._id}>
                <div>
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
                <div>
                  <div>{item?.username}</div>
                </div>
              </div>
            ))}
        </div>
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
        {user.username !== currentUser.username && (
          <button
            className="rightbarFollowButton"
            onClick={(e) => handleClick(e)}
          >
            {followed ? "Unfollow" : "follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">Chi ti???t:</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              <FaHome />
            </span>
            <span className="rightbarInfoValue">
              {user?.address ? (
                <span>
                  S???ng t???i<strong>{user.address}</strong>
                </span>
              ) : (
                "Ch??a c???p nh???t..."
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
                  ?????n t???<strong>{user?.country}</strong>
                </span>
              ) : (
                "Ch??a c???p nh???t..."
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
                  H???c ???<strong>{user?.schools}</strong>
                </span>
              ) : (
                "Ch??a c???p nh???t..."
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
                  L??m vi???c t???i<strong>{user?.company}</strong>
                </span>
              ) : (
                "Ch??a c???p nh???t..."
              )}
            </span>
          </div>
        </div>
        {user.username === currentUser.username && (
          <Button
            className="button-update"
            onClick={() => handleShowModalUser()}
          >
            C???p nh???t th??ng tin
          </Button>
        )}
        {showModalUser && (
          <ModalUser
            userId={currentUser?._id}
            closeModal={() => setShowModalUser(false)}
            heading="C???p nh???t th??ng tin"
          />
        )}
        <h4 className="rightbarTitle">B???n b??</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
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
