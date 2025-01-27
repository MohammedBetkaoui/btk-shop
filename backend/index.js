const port = 4000;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://mohammedbetkaoui:27032002@cluster0.e51v8.mongodb.net/E-commerce')
  .then(() => console.log('Connecté à MongoDB avec succès'))
  .catch(err => console.error('Erreur de connexion à MongoDB :', err));

// Configuration du stockage des images avec Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './upload/images'); // Répertoire de destination
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`); // Nom du fichier
  }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Limite de 10 Mo
  });
// Servir les images statiques
app.use('/images', express.static('upload/images'));

// Route pour l'upload d'images
app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
      console.log('Aucun fichier reçu');
      return res.status(400).json({ success: 0, message: 'Aucun fichier reçu' });
    }
    console.log('Fichier reçu :', req.file);
    res.json({
      success: 1,
      image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
  });
// Route de test
app.get('/', (req, res) => {
  res.send('Le serveur Express fonctionne correctement');
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur serveur :', err);
  res.status(500).json({ success: 0, message: 'Erreur interne du serveur' });
});

// Démarrer le serveur
app.listen(port, (error) => {
  if (!error) {
    console.log(`Serveur démarré sur le port ${port}`);
  } else {
    console.error('Erreur lors du démarrage du serveur :', error);
  }
});