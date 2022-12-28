import "./profile.scss";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import FollowerProfile from "../../components/follow/FollowerProfile";
import { BsMessenger } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const {
    user: currentUser,
    conversations,
    setConversations,
  } = useContext(AuthContext);
  const username = useParams().username;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const handleNavigateMessenger = async () => {
    if (conversations?.members?.includes(user?._id)) {
      navigate("/messenger");
    } else {
      const idMember = [user?._id, currentUser?._id];
      await axios.post(`/conversations`, {
        idMember,
      });
      navigate("/messenger");
    }
  };

  console.log(conversations);

  console.log(conversations?.members?.includes(user?._id));

  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
            </div>
            <div className="profileUserInfo">
              <div className="profileUserImg">
                <img
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
              </div>
              <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
              </div>
            </div>
          </div>
          <div className="profileFlMess">
            <FollowerProfile user={user} />
            {user?._id !== currentUser?._id && (
              <div
                className="profileFlMess-messenger"
                onClick={() => handleNavigateMessenger()}
              >
                <span>
                  <BsMessenger />
                </span>
                <span>Nhắn tin</span>
              </div>
            )}
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
