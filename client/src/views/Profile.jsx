import AuthCard from "../components/auth/AuthCard.jsx";
import ProfileBody from "../components/profile/ProfileBody.jsx";

const Profile = () => (
  <AuthCard
    wide
    title="Mi perfil"
    subtitle="Actualizá tus datos de contacto. Los usamos para entregarte tus pedidos."
  >
    <ProfileBody />
  </AuthCard>
);

export default Profile;
