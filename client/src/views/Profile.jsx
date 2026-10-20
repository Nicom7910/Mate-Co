import AuthCard from "../components/auth/AuthCard.jsx";
import ProfileBody from "../components/profile/ProfileBody.jsx";

const Profile = ({ token, user, loading, onSaved }) => (
  <AuthCard
    wide
    title="Mi perfil"
    subtitle="Actualizá tus datos de contacto. Los usamos para entregarte tus pedidos."
  >
    <ProfileBody
      token={token}
      user={user}
      loading={loading}
      onSaved={onSaved}
    />
  </AuthCard>
);

export default Profile;
