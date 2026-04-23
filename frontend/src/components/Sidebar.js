import React from "react";
import logo from "../assets/logo.png";

export default function Sidebar({ openModal, user }) {
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


    </div>
  );
}