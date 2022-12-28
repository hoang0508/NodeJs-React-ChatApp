import axios from "axios";
import React, { useContext } from "react";
import { RiUserFollowLine, RiUserUnfollowFill } from "react-icons/ri";
import { AuthContext } from "../../context/AuthContext";

const FollowerProfile = ({ user }) => {
  const {
    user: currentUser,
    dispatch,
    followed,
    setFollowed,
  } = useContext(AuthContext);

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
  return (
    <div>
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
              <span>Đang theo dõi</span>
            </div>
          ) : (
            <div className="FollowButton-yet">
              <span>
                <RiUserUnfollowFill />
              </span>
              <span>Theo dõi</span>
            </div>
          )}
        </button>
      )}
    </div>
  );
};

export default FollowerProfile;
