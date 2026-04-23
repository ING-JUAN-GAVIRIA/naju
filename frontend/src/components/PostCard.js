import React from "react";

export default function PostCard({ post, onImageClick,user }) {
  return (
    <div className="card">

      <div className="card-header">
        <img src={post.user?.foto} alt="" />
        <h4>{post.user?.nombre || post.user}</h4>
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