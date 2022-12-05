import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`posts/timeline/636baf7bde36392dba30084e`);
      console.log("🚀 ~ file: Feed.jsx ~ line 13 ~ fetchPost ~ res", res);
    };
    fetchPost();
  }, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {/* {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}
      </div>
    </div>
  );
}
