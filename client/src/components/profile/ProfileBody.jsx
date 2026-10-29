import { useSelector } from "react-redux";
import { selectToken } from "../../redux/authSlice.js";
import AuthSwitch from "../auth/AuthSwitch.jsx";
import ProfileData from "./ProfileData.jsx";

const ProfileBody = () => {
  const token = useSelector(selectToken);

  return token ? (
    <ProfileData />
  ) : (
    <AuthSwitch
      text="Para ver tu perfil necesitás una cuenta."
      linkText="Ingresar"
      to="/login"
    />
  );
};

export default ProfileBody;
