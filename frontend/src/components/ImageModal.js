import React from "react";

export default function ImageModal({ post, close }) {
  if (!post) return null;

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <img src={post.imagen} alt="" />

        <h3>{post.user?.nombre || post.user}</h3>
        <p>{post.descripcion}</p>

        {/* 🎵 SPOTIFY */}
        {post.cancion && (
          <iframe
            src={post.cancion}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        )}

      </div>
    </div>
  );
}