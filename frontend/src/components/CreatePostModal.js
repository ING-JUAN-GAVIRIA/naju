import React, { useState } from "react";
import axios from "axios";


export default function CreatePostModal({ close, refreshPosts, user }) {

  const [imagen, setImagen] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [cancion, setCancion] = useState("");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  //  Subir imagen a Cloudinary
  const subirImagen = async () => {
    const formData = new FormData();
    formData.append("file", imagen);
    formData.append("upload_preset", "naju_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dokjayfkn/image/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const buscarCancion = async () => {
  const res = await axios.get(
    `http://localhost:5000/api/spotify/search?q=${query}`
  );
  setResults(res.data);
};

    const data = await res.json();
    return data.secure_url;
  };
  const convertirSpotify = (url) => {
  if (!url) return "";

  return url
    .replace("intl-es/", "")
    .replace("open.spotify.com/track", "open.spotify.com/embed/track")
    .split("?")[0];
};

  // 🔥 Enviar publicación
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await subirImagen();
      const cancionEmbed = convertirSpotify(cancion);

await axios.post("http://localhost:5000/api/posts", {
  user: user?.nombre,
  imagen: imageUrl,
  descripcion,
  cancion: cancionEmbed,
});


      refreshPosts();
      close();

    } catch (err) {
  console.error(err);
  alert(err.response?.data?.error || err.message);

}
  };

  return (
    <div className="modal">
      <div className="modal-content">

        <h2>Crear publicación</h2>

        <form onSubmit={handleSubmit}>

          {/*  INPUT DE ARCHIVO */}
          <input
            type="file"
            onChange={(e) => setImagen(e.target.files[0])}
            required
          />

          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Link canción"
            value={cancion}
            onChange={(e) => setCancion(e.target.value)}
            required
          />

          <button type="submit">Publicar</button>

        </form>

        <button onClick={close}>Cancelar</button>

      </div>
    </div>
  );
}