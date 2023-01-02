import "./topbar.scss";
import { Search } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
import { debounce } from "lodash";
import useLocalStorage from "../../hooks/useLocalStrorage";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const [usernameFriend, setUserNameFriend] = useState();
  const [changeUserName, setChangeUserName] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  // Logout
  const handleProfileLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Đăng xuất thành công!!");
    window.location.reload();
  };

  // change input search friends
  const handleChangeUserFriend = debounce((e) => {
    setChangeUserName(e.target.value);
  }, 500);

  useEffect(() => {
    const fetchUserFriends = async () => {
      const res = await axios.get(`/users/search?username=${changeUserName}`);
      setUserNameFriend(res?.data);
    };
    fetchUserFriends();
  }, [changeUserName]);

  //
  const { storedValue, setValue } = useLocalStorage("userInfoFriends", []);

  const handleInfoUserSearch = (data) => {
    navigate(`/profile/${data?.username}`);
    const isExcited = storedValue.some((item) => item?._id === data?._id);
    if (isExcited) {
      setValue([...storedValue]);
    } else {
      setValue([...storedValue, data]);
    }
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
            placeholder="Tìm kiếm bạn bè..."
            className="searchInput"
            onChange={(e) => handleChangeUserFriend(e)}
          />
        </div>
        <div className="search-friends">
          {changeUserName !== "" ? (
            <div>
              {usernameFriend &&
                usernameFriend.length > 0 &&
                usernameFriend.map((item) => (
                  <div
                    key={item?._id}
                    className="search-friends--change"
                    onClick={() => handleInfoUserSearch(item)}
                  >
                    <div className="search-friends--change-info">
                      <div className="search-friends--image">
                        <img
                          src={
                            item?.profilePicture
                              ? PF + item?.profilePicture
                              : PF + "person/noAvatar.png"
                          }
                          alt=""
                        />
                      </div>
                      <div className="search-friends--person">
                        <span className="person-username">
                          {item?.username}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <>
              <div className="search-friends--save">
                <span className="search-friends--save-near">
                  Tìm kiếm gần đây
                </span>
                <span className="search-friends--save-update">Chỉnh sửa</span>
              </div>
              <div>
                {storedValue.length <= 0 && (
                  <p className="search-friends--save--empty">
                    Không có tìm kiếm nào gần đây
                  </p>
                )}
                {storedValue &&
                  storedValue.length > 0 &&
                  storedValue.map((item) => (
                    <div
                      key={item?._id}
                      className="search-friends--change"
                      onClick={() => handleInfoUserSearch(item)}
                    >
                      <div className="search-friends--change-info">
                        <div className="search-friends--image">
                          <img
                            src={
                              item?.profilePicture
                                ? PF + item?.profilePicture
                                : PF + "person/noAvatar.png"
                            }
                            alt=""
                          />
                        </div>
                        <div className="search-friends--person">
                          <span className="person-username">
                            {item?.username}
                          </span>
                        </div>
                      </div>
                      <span></span>
                    </div>
                  ))}
              </div>
            </>
          )}
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
        <Link to={`/profile/${user?.username}`}>
          {" "}
          <img
            src={
              user?.profilePicture
                ? PF + user?.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <div className="profile-logout" onClick={(e) => handleProfileLogout(e)}>
          Đăng xuất
        </div>
      </div>
    </div>
  );
}
