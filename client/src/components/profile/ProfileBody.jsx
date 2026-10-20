import AuthSwitch from "../auth/AuthSwitch.jsx";
import ProfileData from "./ProfileData.jsx";

const ProfileBody = ({ token, user, loading, onSaved }) =>
  token ? (
    <ProfileData
      token={token}
      user={user}
      loading={loading}
      onSaved={onSaved}
    />
  ) : (
    <AuthSwitch
      text="Para ver tu perfil necesitás una cuenta."
      linkText="Ingresar"
      to="/login"
    />
  );

export default ProfileBody;
