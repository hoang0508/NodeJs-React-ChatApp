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
import { RiUserFollowLine, RiUserUnfollowFill } from "react-icons/ri";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [showModalUser, setShowModalUser] = useState(false);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    if (currentUser.followings.includes(user?._id)) {
      setFollowed(currentUser.followings.includes(user?._id));
    } else {
      setFollowed(false);
    }
  }, [currentUser.followings, user?._id]);

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

  const handleFollowUn = async (e) => {
    e.preventDefault();
    try {
      if (followed) {
        await axios.put(`/users/${user?._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user?._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
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
        {user.username !== currentUser.username && (
          <button
            className="rightbarFollowButton"
            onClick={(e) => handleFollowUn(e)}
          >
            {followed ? (
              <div className="FollowButton-progress">
                <span>
                  <RiUserFollowLine />
                </span>
                <span>??ang theo d??i</span>
              </div>
            ) : (
              <div className="FollowButton-yet">
                <span>
                  <RiUserUnfollowFill />
                </span>
                <span>Theo d??i</span>
              </div>
            )}
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
        <h4 className="rightbarTitle">??ang theo d??i</h4>
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
