const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/naju_pro')
.then(()=>console.log("DB OK"));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

app.listen(5000, ()=> console.log("Server 5000"));
