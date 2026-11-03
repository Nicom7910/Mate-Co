import { useState } from "react";
import mate from "../../assets/mate.svg";

const AdminThumb = ({ src, contain = false }) => {
  const [failed, setFailed] = useState(false);

  if (!src) return <span className="admin-table__tag">Sin foto</span>;

  if (failed)
    return (
      <img
        src={mate}
        alt=""
        className="admin-table__thumb admin-table__thumb--placeholder"
      />
    );

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className={`admin-table__thumb ${contain ? "admin-table__thumb--contain" : ""}`}
      onError={() => setFailed(true)}
    />
  );
};

export default AdminThumb;
