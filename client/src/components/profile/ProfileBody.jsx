import AuthSwitch from "../auth/AuthSwitch.jsx";
import ProfileData from "./ProfileData.jsx";

const ProfileBody = ({ token }) =>
  token ? (
    <ProfileData token={token} />
  ) : (
    <AuthSwitch
      text="Para ver tu perfil necesitás una cuenta."
      linkText="Ingresar"
      to="/login"
    />
  );

export default ProfileBody;
