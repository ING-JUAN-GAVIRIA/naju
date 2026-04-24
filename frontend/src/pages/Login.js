import React, { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

export default function Login({ setUser }) {

  const [isRegister, setIsRegister] = useState(false);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [foto, setFoto] = useState(null);

  const [preview, setPreview] = useState(null);

  // 🔥 subir imagen a Cloudinary
  const subirImagen = async () => {
    if (!foto) return "";

    const formData = new FormData();
    formData.append("file", foto);
    formData.append("upload_preset", "naju_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dokjayfkn/image/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  // 🔥 manejar envío
  const handleSubmit = async () => {
    try {

      if (!email || !password) {
        alert("Completa los campos");
        return;
      }

      if (isRegister && !nombre) {
        alert("El nombre es obligatorio");
        return;
      }

      if (isRegister) {
        const imageUrl = await subirImagen();

        await axios.post("http://localhost:5000/api/auth/register", {
          nombre,
          email,
          password,
          foto: imageUrl
        });
        

        alert("Usuario creado");
        setIsRegister(false);
      }else {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password
        });

        setUser(res.data);
      }
      localStorage.setItem("firstLogin", "true");

    } catch (err) {
  console.error(err);
  alert(err.response?.data?.error || err.message);
}
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h2>NA-JU</h2>

        {isRegister && (
          <input
            placeholder="Nombre"
            onChange={(e) => setNombre(e.target.value)}
          />
        )}

        <input
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />

        {isRegister && (
          <>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setFoto(file);
                setPreview(URL.createObjectURL(file));
              }}
            />

            {/* 🔥 PREVIEW */}
            {preview && (
              <img 
                src={preview} 
                alt="preview" 
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "auto"
                }}
              />
            )}
          </>
        )}

        <button onClick={handleSubmit}>
          {isRegister ? "Crear cuenta" : "Iniciar sesión"}
        </button>

        <p className="switch" onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Crear cuenta"}
        </p>

      </div>

    </div>
  );
}