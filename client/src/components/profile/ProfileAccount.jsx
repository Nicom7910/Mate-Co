import "./ProfileAccount.css";

const ProfileAccount = ({ email }) => (
  <p className="profile-account">
    Tu email: <strong>{email}</strong>
  </p>
);

export default ProfileAccount;
