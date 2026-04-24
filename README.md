# NAJU PRO REACT 

Red social desarrollada con tecnologías modernas, que permite crear publicaciones con imágenes y música integrada desde Spotify.

---

## Tecnologías utilizadas

* React (Frontend)
* Node.js + Express (Backend)
* MongoDB (Base de datos)
* Cloudinary (Almacenamiento de imágenes)
* Spotify Embed (Reproductor de música)

---

## Clonar el repositorio

```bash
git clone https://github.com/ING-JUAN-GAVIRIA/naju.git
cd naju
```

---

##  Instalación del proyecto

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd ../frontend
npm install
```

---

## Ejecutar la aplicación

### 🔹 Iniciar Backend

```bash
cd backend
node server.js
```

El backend se ejecuta en:
http://localhost:5000

---

### Iniciar Frontend

```bash
cd frontend
npm start
```

 El frontend se ejecuta en:
http://localhost:3000

---

## Flujo de trabajo (uso diario)

Cada vez que quieras trabajar en el proyecto:

```bash
git pull
```

Luego ejecuta:

### Backend

```bash
cd backend
node server.js
```

### Frontend (en otra terminal)

```bash
cd frontend
npm start
```

---

##  Funcionalidades

*  Registro e inicio de sesión de usuarios
*  Creación de publicaciones con imagen
*  Integración de música con Spotify
*  Modal interactivo tipo red social
*  Visualización de usuario con foto

---

## Estructura del proyecto

```
naju-pro-react/
│
├── backend/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── App.js
```

---

##  Autor

**Juan Diego Gaviria**

---

## Notas

* Asegúrate de tener MongoDB corriendo localmente
* Verifica que los puertos 3000 y 5000 estén disponibles
* Configura correctamente Cloudinary para subir imágenes


