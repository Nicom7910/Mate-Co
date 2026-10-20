import FetchState from "../common/FetchState.jsx";
import ProfileAccount from "./ProfileAccount.jsx";
import ProfileForm from "./ProfileForm.jsx";

const ProfileData = ({ token, user, loading, onSaved }) => (
  <FetchState
    loading={loading}
    error={!loading && !user ? "tu sesión no es válida" : null}
    loadingText="Cargando tu perfil..."
  >
    {user && (
      <>
        <ProfileAccount email={user.email} />
        <ProfileForm user={user} token={token} onSaved={onSaved} />
      </>
    )}
  </FetchState>
);

export default ProfileData;
