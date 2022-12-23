import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
export default function Messenger() {
  // return
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu"><div className="chatMenuWrapper"></div></div>
        <div className="chatBox"><div className="chatBoxWrapper">box</div></div>
        <div className="chatOnline"><div className="chatOnlineWrapper">online</div></div>
      </div>
      ;
    </>
  );
}
