import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);

  // lấy bài post data
  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get(`posts/profile${username}`)
        : await axios.get(`posts/timeline/636baf7bde36392dba30084e`);
      setPosts(res.data);
    };
    fetchPost();
  }, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts &&
          posts.length > 0 &&
          posts.map((p) => <Post key={p._id} post={p} />)}
      </div>
    </div>
  );
}
