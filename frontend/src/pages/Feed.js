import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";
import ImageModal from "../components/ImageModal";

import "../styles/main.css";

export default function Feed({ user, setUser }) { 

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
      setUser={setUser} 
      openModal={() => setShowModal(true)} 
    />

    {/* CENTRO */}
    <div className="main-content">
  <div className="feed">
      <h2 className="feed-title"> Nuestros momentos</h2>

      {posts.map((post, index) => (
        <PostCard 
          key={index} 
          post={post} 
          onImageClick={() => setSelectedPost(post)}
          refreshPosts={getPosts}   // 🔥 AQUÍ
          user={user}               // 🔥 recomendado
        />
      ))}
      </div>
    </div>

    {/* DERECHA */}
<div className="rightbar">

  <h3>💜 Tú y yo</h3>

  <div className="info-item" onClick={() => setInfoModal("about")}>
    Juan Diego Gaviria
  </div>

  <div className="info-item" onClick={() => setInfoModal("mission")}>
    Nataly Saray Espitia
  </div>

  <div className="info-item" onClick={() => setInfoModal("projects")}>
    Como nos conocimos
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
      <h2>Juan Diego Gaviria</h2>
      <p>
      Soy un chico que no esperaba encontrar algo tan real,
hasta que llegaste tú.
Poco a poco, sin darme cuenta,
empecé a cambiar, a crecer,
a ver la vida de una forma diferente.
Me enseñaste que los pequeños momentos
pueden significarlo todo,
y que cuando el amor es sincero,
todo tiene más sentido.
Hoy soy alguien que quiere construir,
cuidar y valorar lo que tenemos,
porque contigo aprendí que el amor no solo se siente,
también se demuestra 💜

      </p>
      <button onClick={() => setInfoModal(null)}>Cerrar</button>
    </div>
  </div>
)}

{infoModal === "mission" && (
  <div className="modal">
    <div className="modal-content">
      <h2>Nataly Saray Espitia</h2>
      <p>
        En construcion...
      </p>
      <button onClick={() => setInfoModal(null)}>Cerrar</button>
    </div>
  </div>
)}

{infoModal === "projects" && (
  <div className="modal">
    <div className="modal-content">
      <h2>Como nos conocimos</h2>
      <p>
       En construcion...
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
          <p>Bienvenida a NA-JU 💜

Una plataforma cuyo nombre nace de la unión de nuestros nombres,
Nataly y Juan.

Más que una plataforma,
es un lugar donde quiero plasmar nuestra historia,
donde cada foto tendrá un significado especial
y cada momento quedará guardado para siempre.

Quiero que sepas que esta página puede tener algunos errores,
ya que actualmente se encuentra en construcción,
pero ya es una primera versión,
el inicio de algo que seguirá creciendo con nosotros…

Y lo mejor… es que esto apenas comienza 💜</p>

          <button onClick={() => setShowWelcome(false)}>
            Empezar
          </button>

        </div>
      </div>
    )}

  </div>
);

}