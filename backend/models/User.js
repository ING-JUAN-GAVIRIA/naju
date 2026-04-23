const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String,
  foto: String  
});

module.exports = mongoose.model('User', UserSchema);