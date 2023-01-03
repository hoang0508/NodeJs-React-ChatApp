import "./sidebar.scss";
import { ImHome } from "react-icons/im";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <span className="sidebarListItem-icon">
              <ImHome />
            </span>
            <span className="sidebarListItemText">Trang chủ</span>
          </li>
          <li className="sidebarListItem">
            <div className="sidebarListItem-image">
              <img
                src={
                  user?.profilePicture
                    ? PF + user?.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <span className="sidebarListItem-name">{user?.username}</span>
          </li>
          <li className="sidebarListItem">
            <span className="sidebarListItem-icon">
              <ImHome />
            </span>
            <span className="sidebarListItemText">Bạn bè</span>
          </li>
          <li className="sidebarListItem">
            <span className="sidebarListItem-icon">
              <ImHome />
            </span>
            <span className="sidebarListItemText">Giải trí</span>
          </li>
          <li className="sidebarListItem">
            <span className="sidebarListItem-icon">
              <ImHome />
            </span>
            <span className="sidebarListItemText">Đã lưu</span>
          </li>
          <li className="sidebarListItem">
            <span className="sidebarListItem-icon">
              <ImHome />
            </span>
            <span className="sidebarListItemText">Gần đây nhất</span>
          </li>
          <li className="sidebarListItem">
            <span className="sidebarListItem-icon">
              <ImHome />
            </span>
            <span className="sidebarListItemText">Nhóm</span>
          </li>
          <li className="sidebarListItem">
            <span className="sidebarListItem-icon">
              <ImHome />
            </span>
            <span className="sidebarListItemText">Sự kiện</span>
          </li>
          <li className="sidebarListItem">
            <span className="sidebarListItem-icon">
              <ImHome />
            </span>
            <span className="sidebarListItemText">Khóa học</span>
          </li>
        </ul>
        <button className="sidebarButton">Xem tất cả</button>
      </div>
    </div>
  );
}
