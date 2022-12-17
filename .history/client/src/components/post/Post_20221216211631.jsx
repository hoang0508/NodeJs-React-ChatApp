import "./post.scss";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { BsFillFileEarmarkPostFill, BsFillTrashFill } from "react-icons/bs";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [textLike, setTextLike] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post?.like?.includes(currentUser?._id));
  }, [post?.like, currentUser?._id]);

  const Likehandle = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  // lấy user data
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const userLike =
    friends &&
    friends.length > 0 &&
    friends
      .slice(0, 3)
      .map((item) => item?.username)
      .join(",");

  useEffect(() => {
    if (like === 0) {
      setTextLike("Chưa có lượt thích!");
    } else if (like < 3) {
      setTextLike(`${like} lượt thích`);
    } else if (like >= 3) {
      setTextLike(`${userLike} và ${friends.length} người khác`);
    }
  }, [like]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user?.username}`}>
              <div className="postProfileImg">
                <img
                  src={
                    user?.profilePicture
                      ? user?.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
              </div>
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <span>
              <MoreVert />
            </span>
            <div className="postUpdate">
              <div className="postUpdate-info">
                <span className="postUpdate-info--icon">
                  <BsFillFileEarmarkPostFill />
                </span>
                <span className="postUpdate-info--text">Chỉnh bài viết</span>
              </div>
              <div className="postUpdate-info">
                <span className="postUpdate-info--icon">
                  <BsFillTrashFill />
                </span>
                <span className="postUpdate-info--text">Xóa bài viết</span>
              </div>
            </div>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={Likehandle}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={Likehandle}
              alt=""
            />
            <span className="postLikeCounter">{textLike}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
