const express = require('express');
const r = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// REGISTER
r.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, foto } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ error: "Email ya existe" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      nombre,
      email,
      password: hashed,
      foto
    });

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error register" });
  }
});

// LOGIN 🔥
r.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuario no existe" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Contraseña incorrecta" });

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error login" });
  }
});

module.exports = r;