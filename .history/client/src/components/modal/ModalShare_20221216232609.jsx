import { EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons";
import React, { useContext } from "react";
import { GrFormClose } from "react-icons/gr";
import { AuthContext } from "../../context/AuthContext";
const ModalShare = ({
  children,
  heading = "",
  textBtn = "",
  handleSubmitShare,
  ...props
}) => {
  const { setFile, setShowShare } = useContext(AuthContext);
  return (
    <div className="modal-share">
      <div className="modal-share--content">
        <h3 className="modal-share--title">{heading}</h3>
        <span
          className="modal-share--close"
          onClick={() => setShowShare(false)}
        >
          <GrFormClose />
        </span>
        {children}
        <form className="shareBottom" onSubmit={handleSubmitShare}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Ảnh/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                name=""
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            {textBtn}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalShare;
