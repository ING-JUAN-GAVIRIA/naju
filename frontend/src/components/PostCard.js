import React from "react";
import axios from "axios"; // 🔥 ESTE FALTABA

export default function PostCard({ post, onImageClick,user, refreshPosts }) {

  const handleDelete = async (id) => {
    console.log("CLICK DELETE", id); // prueba

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      refreshPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">

      <div className="card-header">
        <img src={post.user?.foto } alt="" />
        <h4>{post.user?.nombre || post.user}</h4>

        <button 
        className="delete-btn"
        onClick={() => handleDelete(post._id)}
      >
        X
      </button>
      </div>
      

      <img 
        src={post.imagen} 
        alt="" 
        onClick={() => onImageClick(post)}
        style={{ cursor: "pointer" }}
      />

      

    </div>
  );
}