const express = require('express');
const r = express.Router();
const Post = require('../models/Post');

// GET POSTS
r.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user');
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// CREATE POST
r.post("/", async (req, res) => {
  try {
    const { user, imagen, descripcion, cancion } = req.body;

    const post = await Post.create({
      user, // 🔥 SOLO EL ID
      imagen,
      descripcion,
      cancion,
    });

    r.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar" });
  }
});

    res.json(post);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message }); // ✅ backend correcto
  }
});

module.exports = r;