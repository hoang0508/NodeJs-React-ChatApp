import "./post.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import {
  BsFillFileEarmarkPostFill,
  BsFillTrashFill,
  BsThreeDots,
} from "react-icons/bs";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import ModalShare from "../modal/ModalShare";
import ModalUpdate from "../modal/ModalUpdate";
import Input from "../input/Input";
import { useForm } from "react-hook-form";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [textLike, setTextLike] = useState("");
  const [dataUserOne, setDataUserOne] = useState(undefined);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {
    user: currentUser,
    setPosts,
    posts,
    showPostUpdate,
    setShowPostUpdate,
    file,
    setFile,
  } = useContext(AuthContext);

  const { handleSubmit, control, reset } = useForm({
    mode: "onSubmit",
    defaultValues: {
      desc: "",
    },
  });

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

  // Delete Post
  const handleDeletePost = async (postId) => {
    Swal.fire({
      title: "Bạn có chắc chắn xóa?",
      text: "Nội dung này sẽ xóa bài viết của bạn",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Tôi đồng ý!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/posts/${postId}`, {
          data: {
            userId: post?.userId,
          },
        });
        const postData =
          posts &&
          posts.length > 0 &&
          posts.filter((item) => item._id !== postId);
        setPosts(postData);
        Swal.fire("Xóa bài viết!", "Đã xóa bài viết.", "success");
      }
    });
  };

  const handleClickShowUpdate = (postItem) => {
    setShowPostUpdate(postItem);
  };

  useEffect(() => {
    reset({
      desc: showPostUpdate?.desc,
    });
  }, [showPostUpdate, reset]);

  const handleCloseUpdate = () => {
    setShowPostUpdate(false);
    reset({
      desc: "",
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const resUser = await axios.get(`/users?userId=${currentUser?._id}`);
      setDataUserOne(resUser?.data);
    };
    fetchUserData();
  }, [currentUser?._id]);

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
                      ? PF + user?.profilePicture
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
            <span className="postTopRight-dots">
              <BsThreeDots />
            </span>
            <div className="postUpdate">
              <div
                className="postUpdate-info"
                onClick={() => handleClickShowUpdate(post)}
              >
                <span className="postUpdate-info--icon">
                  <BsFillFileEarmarkPostFill />
                </span>
                <span className="postUpdate-info--text">
                  Chỉnh sửa bài viết
                </span>
              </div>
              <div
                className="postUpdate-info"
                onClick={() => handleDeletePost(post?._id)}
              >
                <span className="postUpdate-info--icon">
                  <BsFillTrashFill />
                </span>
                <span className="postUpdate-info--text">Xóa bài viết</span>
              </div>
            </div>
          </div>
          {!!showPostUpdate && (
            <ModalUpdate
              heading="Sửa bài viết"
              closeModal={() => handleCloseUpdate()}
              textBtn="Lưu bài viết"
              // handleSubmit={handleSubmit(han)}
            >
              <>
                <div className="modal-share--info">
                  <div className="modal-share--avatar">
                    <img
                      src={
                        user.profilePicture
                          ? PF + user.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                    />
                  </div>
                  <span className="modal-share--name">
                    {dataUserOne?.username ? dataUserOne?.username : ""}
                  </span>
                </div>
                <Input
                  placeholder={`${
                    dataUserOne?.username ? dataUserOne?.username : ""
                  } ơi, bạn đang nghĩ gì thế?`}
                  className="modal-share--input"
                  name="desc"
                  control={control}
                />
                <div className={`${file ? "modal-share--upload" : ""}`}>
                  {file ? (
                    <img
                      src={
                        // showPostUpdate.img
                        PF + showPostUpdate.img
                        // : URL.createObjectURL(file)
                      }
                      alt="#"
                    />
                  ) : (
                    ""
                  )}
                  {file && (
                    <span
                      className="modal-share--upload-remove"
                      onClick={() => setFile(null)}
                    >
                      <BsFillTrashFill />
                    </span>
                  )}
                </div>
              </>
            </ModalUpdate>
          )}
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
