import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Comment = () => {
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <div>
        <div className="postProfileImg">
          <img
            src={
              currentUser?.profilePicture
                ? PF + currentUser?.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
