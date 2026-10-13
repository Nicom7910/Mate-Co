import useFetch from "../../hooks/useFetch.js";
import FetchState from "../common/FetchState.jsx";
import ProfileAccount from "./ProfileAccount.jsx";
import ProfileForm from "./ProfileForm.jsx";

const ProfileData = ({ token }) => {
  const { data: user, loading, error } = useFetch("/users/me", token);

  return (
    <FetchState
      loading={loading}
      error={error}
      loadingText="Cargando tu perfil..."
    >
      {user && (
        <>
          <ProfileAccount email={user.email} />
          <ProfileForm user={user} token={token} />
        </>
      )}
    </FetchState>
  );
};

export default ProfileData;
