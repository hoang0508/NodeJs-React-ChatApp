import "./topbar.scss";
import { Search } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { toast } from "react-toastify";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  const handleProfileLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");

    toast.success("Đăng xuất thành công!!");
    navigate("/login");
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to={"/"}>
          <span className="logo">HH social media</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <FaFacebookMessenger />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <IoNotificationsSharp />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          {" "}
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <button
          className="profile-logout"
          onClick={(e) => handleProfileLogout(e)}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
