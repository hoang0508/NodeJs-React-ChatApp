import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.scss";
import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
export default function Feed({ username }) {
  const { user, posts, setPosts } = useContext(AuthContext);

  // lấy bài post data
  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`);
      setPosts(
        res?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        )
      );
    };
    fetchPost();
  }, [username, user._id, setPosts]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts &&
          posts.length > 0 &&
          posts.map((p) => <Post key={p._id} post={p} />)}
      </div>
    </div>
  );
}
