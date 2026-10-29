import { useSelector } from "react-redux";
import { selectUser, selectUserLoading } from "../../redux/userSlice.js";
import FetchState from "../common/FetchState.jsx";
import ProfileAccount from "./ProfileAccount.jsx";
import ProfileForm from "./ProfileForm.jsx";

const ProfileData = () => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);

  return (
    <FetchState
      loading={loading}
      error={!loading && !user ? "tu sesión no es válida" : null}
      loadingText="Cargando tu perfil..."
    >
      {user && (
        <>
          <ProfileAccount email={user.email} />
          <ProfileForm user={user} />
        </>
      )}
    </FetchState>
  );
};

export default ProfileData;
