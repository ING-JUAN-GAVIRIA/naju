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

  // 🔥 Obtener posts
  const getPosts = () => {
    axios.get("http://localhost:5000/api/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getPosts();
  }, []);

return (
  <div className="layout">

    {/* IZQUIERDA */}
    <Sidebar 
      user={user} 
      openModal={() => setShowModal(true)} 
    />

    {/* CENTRO */}
    <div className="feed">
      {posts.map((post, index) => (
        <PostCard 
          key={index} 
          post={post} 
          onImageClick={() => setSelectedPost(post)}
        />
      ))}
    </div>

    {/* 🔥 DERECHA (NUEVO) */}
    <div className="rightbar">
      <h3>Nuestra historia</h3>
      <p>🔥 Bienvenido a NA-JU</p>
      <p>💜 Comparte momentos únicos</p>

      <h4 style={{ marginTop: 20 }}>Sugerencias</h4>
      <p>@juan</p>
      <p>@admin</p>
      <p>@usuario</p>
    </div>

    {/* 🔥 MODAL CREAR POST */}
    {showModal && (
      <CreatePostModal 
        close={() => setShowModal(false)} 
        refreshPosts={getPosts}
        user={user}
      />
    )}

    {/* 🔥 MODAL IMAGEN */}
    {selectedPost && (
      <ImageModal 
        post={selectedPost}
        close={() => setSelectedPost(null)}
      />
    )}

  </div>
);
}