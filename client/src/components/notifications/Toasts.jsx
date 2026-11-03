import { useSelector } from "react-redux";
import { selectNotices } from "../../redux/notificationsSlice.js";
import Toast from "./Toast.jsx";
import "./Toasts.css";

const Toasts = () => {
  const notices = useSelector(selectNotices);

  return (
    <div className="toasts" role="status" aria-live="polite">
      {notices.map((notice) => (
        <Toast key={notice.id} notice={notice} />
      ))}
    </div>
  );
};

export default Toasts;
