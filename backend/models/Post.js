const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: Object, // 🔥 MUY IMPORTANTE
  imagen: String,
  descripcion: String,
  cancion: String,
  foto: Object
});

module.exports = mongoose.model("Post", PostSchema);