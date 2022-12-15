import "./post.scss";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";

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

  console.log(friends);

  const userLike =
    friends &&
    friends.length > 0 &&
    friends
      .slice(0, 3)
      .map((item) => item?.username)
      .join(",");

  useEffect(() => {
    switch (like) {
      case 0:
        return setTextLike("Chưa có lượt thích!");
      case 1:
        return setTextLike("lllll");
      case +like < 3:
        return setTextLike(`Có ${like} lượt thích`);
      case +like >= 3:
        return setTextLike(`${userLike} và ${friends.length} người khác`);
      default:
        setTextLike("Chưa có lượt thích!");
        break;
    }
  }, [like]);

  console.log(textLike);

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
            <MoreVert />
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
