import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";
import ImageModal from "../components/ImageModal";

import "../styles/main.css";

export default function Feed({ user }) {

  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
    const [infoModal, setInfoModal] = useState(null);

  // 🔥 Obtener posts
  const getPosts = () => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  };

useEffect(() => {
  getPosts();

  const first = localStorage.getItem("firstLogin");

  if (first === "true") {
    setShowWelcome(true);
    localStorage.removeItem("firstLogin"); // 🔥 para que no vuelva a salir
  }

}, []);
return (
  <div className="layout">

    {/* IZQUIERDA */}
    <Sidebar 
      user={user} 
      openModal={() => setShowModal(true)} 
    />

    {/* CENTRO */}
    <div className="main-content">
  <div className="feed">
      {posts.map((post, index) => (
        <PostCard 
          key={index} 
          post={post} 
          onImageClick={() => setSelectedPost(post)}
        />
      ))}
      </div>
    </div>

    {/* DERECHA */}
<div className="rightbar">

  <h3>Sobre nosotros</h3>

  <div className="info-item" onClick={() => setInfoModal("about")}>
    👥 Quiénes somos
  </div>

  <div className="info-item" onClick={() => setInfoModal("mission")}>
    🎯 Nuestra misión
  </div>

  <div className="info-item" onClick={() => setInfoModal("projects")}>
    🚀 Proyectos
  </div>

</div>

    {/* MODAL CREAR POST */}
    {showModal && (
      <CreatePostModal 
        close={() => setShowModal(false)} 
        refreshPosts={getPosts}
        user={user}
      />
    )}

    {/* MODAL IMAGEN */}
    {selectedPost && (
      <ImageModal 
        post={selectedPost}
        close={() => setSelectedPost(null)}
      />
    )}

    {/* 🔥 MODALES RIGHTBAR */}

{infoModal === "about" && (
  <div className="modal">
    <div className="modal-content">
      <h2>👥 Quiénes somos</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam id lorem. Maecenas placerat, nisl at consequat rhoncus, sem nunc gravida justo, quis eleifend arcu velit quis lacus
      </p>
      <button onClick={() => setInfoModal(null)}>Cerrar</button>
    </div>
  </div>
)}

{infoModal === "mission" && (
  <div className="modal">
    <div className="modal-content">
      <h2>🎯 Nuestra misión</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam id lorem. Maecenas placerat, nisl at consequat rhoncus, sem nunc gravida justo, quis eleifend arcu velit quis lacus
      </p>
      <button onClick={() => setInfoModal(null)}>Cerrar</button>
    </div>
  </div>
)}

{infoModal === "projects" && (
  <div className="modal">
    <div className="modal-content">
      <h2>🚀 Proyectos</h2>
      <p>
        - Red social NA-JU 💜 <br/>
        - Integración con música 🎵 <br/>
        - Interacción social ❤️
      </p>
      <button onClick={() => setInfoModal(null)}>Cerrar</button>
    </div>
  </div>
)}

    {/* 🔥 MODAL BIENVENIDA (AQUÍ VA) */}
    {showWelcome && (
      <div className="modal">
        <div className="welcome-modal">

          <h2>Bienvenido 🎉</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam id lorem. Maecenas placerat, nisl at consequat rhoncus, sem nunc gravida justo, quis eleifend arcu velit quis lacus</p>

          <button onClick={() => setShowWelcome(false)}>
            Empezar
          </button>

        </div>
      </div>
    )}

  </div>
);

}