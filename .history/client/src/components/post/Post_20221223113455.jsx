import "./post.scss";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  BsFillFileEarmarkPostFill,
  BsFillTrashFill,
  BsThreeDots,
} from "react-icons/bs";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import ModalUpdate from "../modal/ModalUpdate";
import Input from "../input/Input";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useValueToggle from "../../hooks/useValueToggle";
import { IoMdShareAlt } from "react-icons/io";
import { BiMessage, BiLike } from "react-icons/bi";
import Comment from "../comment/Comment";
import { timeSince } from "../../util/ComvertTime";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [textLike, setTextLike] = useState("");
  const [dataUserOne, setDataUserOne] = useState(undefined);
  const { handleValueToggle, valueToggle, setValueToggle } = useValueToggle();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {
    user: currentUser,
    setPosts,
    posts,
    showPostUpdate,
    setShowPostUpdate,
    file,
    setFile,
    setcommentData,
    commentData,
  } = useContext(AuthContext);

  // useForm hook
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

  console.log(user);

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
      setTextLike("Ch??a c?? l?????t th??ch!");
    } else if (like < 3) {
      setTextLike(`${like} l?????t th??ch`);
    } else if (like >= 3) {
      setTextLike(`${userLike} v?? ${friends.length} ng?????i kh??c`);
    }
  }, [friends.length, like, userLike]);

  // Delete Post
  const handleDeletePost = async (postId) => {
    Swal.fire({
      title: "B???n c?? ch???c ch???n x??a?",
      text: "N???i dung n??y s??? x??a b??i vi???t c???a b???n",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "T??i ?????ng ??!",
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
        Swal.fire("X??a b??i vi???t!", "???? x??a b??i vi???t.", "success");
      }
    });
  };

  // Update Post

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

  const handleUpdateShare = async (values) => {
    const updatePost = {
      userId: user._id,
      desc: values.desc,
      img: showPostUpdate.img,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updatePost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.put(`/posts/${showPostUpdate?._id}`, updatePost);
      const updateDataPost =
        posts &&
        posts.map((item) => {
          if (item._id === showPostUpdate._id) {
            return {
              ...item,
              ...updatePost,
            };
          }
          return item;
        });
      setPosts(updateDataPost);
      setFile(null);
      reset({
        desc: "",
      });
      setShowPostUpdate("");
      toast.success("L??u b??i vi???t th??nh c??ng!!");
    } catch (error) {
      console.log(error);
      toast.error("L??u b??i th???t b???i!!");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const resUser = await axios.get(`/users?userId=${currentUser?._id}`);
      setDataUserOne(resUser?.data);
    };
    fetchUserData();
  }, [currentUser?._id]);

  const nodeRef = useRef(null);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (nodeRef.current && !nodeRef.current.contains(e.target)) {
        setValueToggle(false);
      }
    };
    document.body.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [setValueToggle]);

  // fetch data commnent
  useEffect(() => {
    const fetchDataComment = async () => {
      const res = await axios.get(`/comments/${post?._id}`);
      setcommentData(
        res?.data.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        )
      );
    };
    fetchDataComment();
  }, [post?._id, setcommentData]);

  const countComment =
    commentData &&
    commentData.length > 0 &&
    commentData.filter((item) => item?.postId === post?._id).map((item) => item)
      .length;

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
            <span className="postDate">
              {timeSince(new Date(post.createdAt))}
            </span>
          </div>
          <div className="postTopRight" ref={nodeRef}>
            <span
              className="postTopRight-dots"
              onClick={() => handleValueToggle()}
            >
              <BsThreeDots />
            </span>
            {valueToggle && currentUser?._id === post?.userId && (
              <div className="postUpdate">
                <div
                  className="postUpdate-info"
                  onClick={() => handleClickShowUpdate(post)}
                >
                  <span className="postUpdate-info--icon">
                    <BsFillFileEarmarkPostFill />
                  </span>
                  <span className="postUpdate-info--text">
                    Ch???nh s???a b??i vi???t
                  </span>
                </div>
                <div
                  className="postUpdate-info"
                  onClick={() => handleDeletePost(post?._id)}
                >
                  <span className="postUpdate-info--icon">
                    <BsFillTrashFill />
                  </span>
                  <span className="postUpdate-info--text">X??a b??i vi???t</span>
                </div>
              </div>
            )}
          </div>
          {!!showPostUpdate && (
            <ModalUpdate
              heading="S???a b??i vi???t"
              closeModal={() => handleCloseUpdate()}
              textBtn="L??u b??i vi???t"
              handleSubmit={handleSubmit(handleUpdateShare)}
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
                  placeholder={`${user?.username
                    ?.split(" ")
                    .pop()} ??i, b???n ??ang ngh?? g?? th????`}
                  className="modal-share--input"
                  name="desc"
                  control={control}
                />
                <div className={"modal-share--upload"}>
                  {file || showPostUpdate.img ? (
                    <img
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : PF + showPostUpdate.img
                      }
                      loading="lazy"
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
            <img className="likeIcon" src={`${PF}like.png`} alt="" />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={Likehandle}
              alt=""
            />
            <span className="postLikeCounter">{textLike}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {countComment >= 1
                ? `${countComment} b??nh lu???n`
                : "Ch??a c?? b??nh lu???n"}
            </span>
          </div>
        </div>
        <div className="postWatch">
          <div
            className={`${
              isLiked ? "postWatch-color postWatch-item" : "postWatch-item"
            }`}
            onClick={() => Likehandle()}
          >
            <span className="postWatch-item--icon">
              <BiLike />
            </span>
            <span className="postWatch-item--text">Th??ch</span>
          </div>
          <div className="postWatch-item">
            <span className="postWatch-item--icon">
              <BiMessage />
            </span>
            <span className="postWatch-item--text">B??nh lu???n</span>
          </div>
          <div className="postWatch-item">
            <span className="postWatch-item--icon">
              <IoMdShareAlt />
            </span>
            <span className="postWatch-item--text">Chia s???</span>
          </div>
        </div>
        <Comment post={post} countComment={countComment} />
      </div>
    </div>
  );
}
