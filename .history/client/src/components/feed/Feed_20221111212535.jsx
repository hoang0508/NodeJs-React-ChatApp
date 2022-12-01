import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { useEffect, useState } from "react";
import axios from "axios";
import { post } from "../../../../api/Router/users";
export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`posts/timeline/636c5223e818cb1979970694`);
      setPosts(res.data);
    };
    fetchPost();
  }, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts &&
          post.length > 0 &&
          posts.map((p) => <Post key={p.id} post={p} />)}
      </div>
    </div>
  );
}
