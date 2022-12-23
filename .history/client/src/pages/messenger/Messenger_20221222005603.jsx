import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
export default function Messenger() {
  // return
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu"><div className="Wrapper"></div></div>
        <div className="chatBox"><div className="Wrapper"></div></div>
        <div className="chatOnline"><div className="Wrapper"></div></div>
      </div>
      ;
    </>
  );
}
