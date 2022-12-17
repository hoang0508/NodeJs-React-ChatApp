import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
export default function Feed({ username }) {
  const { posts } = useContext(AuthContext);

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
