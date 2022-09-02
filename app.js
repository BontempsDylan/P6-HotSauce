require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./route/user');
const sauceRoutes = require('./route/sauce');



(async () => {
   await mongoose.connect(process.env.DB_URL,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
})()


const app = express();

// Header to bypass CORS errors 
app.use((req, res, next) => {
  try{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
  }catch{
    res.status(404).json({message: "La ressource recherchée n'a pas était trouvé."});
  } 
  next();
});

app.use(bodyParser.json());

app.get('/api', (req, res, next) => {
  res.status(200).json({
    message: "please dont arrest me, my API is clean"
  });
});

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.status(404).json({
    message: "not found"
  });
});

module.exports = app;