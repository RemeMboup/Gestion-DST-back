require('dotenv').config({path:'./config/.env'})
require('./config/db')
const User = require('./modeles/User')
const Permis = require('./modeles/Permis')
const express = require('express')
const mongoose = require('mongoose')


const app = express()
app.use(express.json())



app.get('/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des utilisateurs :', err);
            res.status(500).send('Erreur lors de la récupération des utilisateurs');

        })
  });

//Route post pour ajouter un utilisateur
app.post('/users', (req, res) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    user.save()
    .then((user) => {
        res.json(user);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    });
});

// Route PUT pour modifier un utilisateur par ID
app.put('/users/:id', (req, res) => {
    body={
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }
    User.findByIdAndUpdate(req.params.id, body)
    .then((user) => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la modification de l\'utilisateur' });
    });
});

// // Route DELETE pour supprimer un utilisateur par ID
app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((user) => {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    });
});

const port = process.env.Port
//app.use("/",router)
app.listen(port, () => console.log(`Serveur is running at http://localhost:${port}`)
)