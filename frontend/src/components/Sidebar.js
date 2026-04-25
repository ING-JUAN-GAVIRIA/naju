import React from "react";
import logo from "../assets/logo.png";

export default function Sidebar({ openModal, user, setUser }) {
  return (
    <div className="sidebar">

      <div className="logo-box">
        <img src={logo} alt="logo" className="logo-img" />
      </div>

      <div className="profile-box">
        <img src={user?.foto} alt="" />
        <h3>{user?.nombre || "Usuario"}</h3>
        <p>@{user?.email?.split("@")[0] || "user"}</p>
      </div>

    <button className="create-btn" onClick={openModal}>
    ✏️ Crear publicación
    </button>

<button
  className="logout-btn"
  onClick={() => {
    localStorage.removeItem("user");
    setUser(null);
  }}
>
  🚪 Cerrar sesión
</button>
    

    <div className="footer">
  Desarrollado por <strong>Juan Diego Gaviria</strong>
</div>


    </div>
  );
}