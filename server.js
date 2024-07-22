require('dotenv').config({path:'./config/.env'})
require('./config/db')

const express = require('express')
//Importation bibliotheque bodyParser pour l analyse des requetes http comme POST et PUT
const bodyParser = require('body-parser');
//Importation du bibliotheque jwt(obtention du token)
const jwt = require('jsonwebtoken');
//Biblotheque pour crypter des donnees comme le mot de passe par exemple
const bcrypt = require('bcrypt');
<<<<<<< HEAD

=======
>>>>>>> 96e6e4f369be70594d0ea41b5aafbda386502222
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');

// CORS headerS
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
//   });

// Configurez CORS pour permettre les requêtes depuis votre front-end
app.use(cors({
    origin: 'http://localhost:5173', // Remplacez par l'origine de votre front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autorisez les méthodes que vous utilisez
    allowedHeaders: ['Content-Type', 'Authorization'], // Autorisez les en-têtes nécessaires
  }));
  

app.use(express.json())
app.use(bodyParser.json());

const port = process.env.Port
//app.use("/",router)
app.listen(port, () => console.log(`Serveur is running at http://localhost:${port}`)
)
//Importation des modeles
const User = require('./modeles/User')
const Permis = require('./modeles/Permis')
const Conducteur = require('./modeles/Conducteur')
const Camion = require('./modeles/Camion')
const Marchandise = require('./modeles/Marchandise')
const Entrepot = require('./modeles/Entrepot')
const DetailChargement = require('./modeles/DetailChargement')
const Client = require('./modeles/Client')
const Compagnie = require('./modeles/Compagnie')
const Conteneur = require('./modeles/Conducteur')


// CORS headerS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

// La liste de tous les users
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
/*app.post('/users', (req, res) => {
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
});*/
<<<<<<< HEAD
// Middleware pour vérifier l'unicité de l'adresse e-mail
const checkEmailUnique = async (req, res, next) => {
    const { email } = req.body;
  
    try {
      // Vérifiez si l'adresse e-mail existe déjà dans la base de données
      const existingUser = await User.findOne({ email });
  
      // Si un utilisateur avec cet e-mail existe déjà, renvoyez une erreur
      if (existingUser) {
        return res.status(400).json({ error: 'Adresse e-mail déjà utilisée' });
      }
  
      // Si l'adresse e-mail est unique, passez au prochain middleware
      next();
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'unicité de l\'adresse e-mail:', error);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  };
  
  // Créez un endpoint pour l'inscription d'un utilisateur.
  app.post('/users', checkEmailUnique, async (req, res) => {
      //try {
      const body = req.body;
      const password = body.password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
          _id: new mongoose.Types.ObjectId(),
          username: body.username,
          password: hashedPassword,
          email: body.email 
      });
      await user.save()
          .then((user) => {
              res.status(201).json(user);
  
          })
              
     /* } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'inscription.' });
      }*/
    })
  

// Créez un endpoint pour la connexion de l'utilisateur et la génération de JWT.
// app.post('/login', async (req, res) => {
//     try {
//       const { username, password } = req.body;
//       const user = await User.findOne({ username });
  
//       if ((req.body.username != user.username && req.body.password != user.password)  || (req.body.username != user.username || req.body.password != user.password) ) {
//         return res.status(401).json({ error: 'Nom d\'utilisateur incorrect.' });
//       }
//       else {
//         const token = jwt.sign({ username: user.username }, 'votre_secret_key_secrete', {
//             expiresIn: '1h', // Durée de validité du jeton (vous pouvez la personnaliser).
//           });

//       }
//       res.status(200).json({ token });
//     } catch (error) {
//       res.status(500).json({ error: 'Une erreur est survenue lors de la connexion.' });
//     }
//   });

app.post('/login', async (req, res) => {
    try {
      const email  = req.body.email;
      const password  = req.body.password;
      console.log(email)
      const user = await User.findOne({email});
      if (!user) {
          const err = new Error('User Not Found!')
          res.status(400).json({
            status: 'fail',
            message: err.message,
          })

      } else if (await bcrypt.compare(password, user.password)) {
          const tokenPayload = {
              email: user.email,
          };
          const accessToken = jwt.sign(tokenPayload, 'SECRET');
          res.status(201).json({
              status: 'success',
              message: 'User Logged In!',
              data: {
                  accessToken,
              },
              });
      } else {
          const err = new Error('Wrong Password!');
          res.status(400).json({
            status: 'fail',
            message: err.message,
          })
          }
        } catch (err) {
        res.status(err.status).json({
            status: 'fail',
            message: err.message,
          });
      }
});
=======
// Créez un endpoint pour l'inscription d'un utilisateur.
app.post('/users', async (req, res) => {
    //try {
    const body = req.body;
    const password = body.password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: body.username,
        password: hashedPassword,
        email: body.email 
    });
    await user.save()
        .then((user) => {
            res.status(201).json(user);

        })
            
   /* } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de l\'inscription.' });
    }*/
  })

// Créez un endpoint pour la connexion de l'utilisateur et la génération de JWT.
console.log("Mareme");
app.post('/login', async (req, res) => {
    //try {
    const username  = req.body.username;
    const password  = req.body.password;
    console.log(username);
    console.log(password);

    //const user = await User.findById( "6491b8fb5ce2c52e2431b44b");
    const user = await User.findOne( { username });
    console.log("Mareme");
    console.log("Le mot de pass entre");
    console.log(password);
    console.log("Le mot de pass dans la bd");
    if(user){
        console.log(user.username);
        console.log(user.password);
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword");
        
        console.log(hashedPassword);
        
        const isPasswordValid = await bcrypt.compare(hashedPassword, user.password);
        console.log("Donne moi la valeur de IsPassWordValid");
        
        console.log(isPasswordValid);
        console.log(!isPasswordValid);
        if (isPasswordValid == true) {
            return res.status(401).json({ error: 'Mot de passe incorrect.' });
        }
        else {
            const token = jwt.sign({ username: user.username }, 'votre_secret_key_secrete', {
                expiresIn: '1h', // Durée de validité du jeton (vous pouvez la personnaliser).
            });
        
            res.status(200).json({ token });

        }

    }
    else {
        return res.status(401).json({ error: 'Nom d\'utilisateur n\'existe pas dans la base de donnees.' });
    }
      //} 
    //   catch (error) {
    //     res.status(500).json({ error: 'Une erreur est survenue lors de la connexion.' });
    //   }
    });
    
  
>>>>>>> 96e6e4f369be70594d0ea41b5aafbda386502222


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
// La liste des  clients
app.get('/clients', (req, res) => {
    Client.find()
        .then(clients => {
            res.json(clients)
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des clients :', err);
            res.status(500).send('Erreur lors de la récupération des clients');

        })
  });

//Route post pour ajouter un client
app.post('/clients', (req, res) => {
    const client = new Client({
        _id: new mongoose.Types.ObjectId(),
        nom: req.body.nom,
        adresse: req.body.adresse,
        email: req.body.email,
        telephone: req.body.telephone
    });
    client.save()
    .then((client) => {
        res.json(client);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la création du client' });
    });
});
// Route PUT pour modifier un client par ID
app.put('/clients/:id', (req, res) => {
    body={
        nom: req.body.nom,
        adresse: req.body.adresse,
        email: req.body.email,
        telephone: req.body.telephone
    }
    Client.findByIdAndUpdate(req.params.id, body)
    .then((client) => {
        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ error: 'Client non trouvé' });
        }
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la modification du client' })
    });
});

// // Route DELETE pour supprimer une marchandise par ID
app.delete('/clients/:id', (req, res) => {
    Client.findByIdAndDelete(req.params.id)
    .then((client) => {
        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ error: 'Client non trouvé' });
        }
        })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la suppression du client' });
    });
});

//Get all marchandise
app.get('/marchandises', (req, res) => {
    Marchandise.find()
        .then(Marchandises => {
            res.json(Marchandises)
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des marchandises :', err);
            res.status(500).send('Erreur lors de la récupération des Marchandises');

        })
  });

  //Route post pour ajouter une marchandise
app.post('/marchandises', (req, res) => {
    const marchandise = new Marchandise({
        _id: new mongoose.Types.ObjectId(),
        nom: req.body.nom,
        type: req.body.type,
    });
    marchandise.save()
    .then((marchandise) => {
        res.json(marchandise);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    });
});

// Route PUT pour modifier une marchandise par ID
app.put('/marchandises/:id', (req, res) => {
    body={
        nom: req.body.nom,
        type: req.body.type,
    }
    Marchandise.findByIdAndUpdate(req.params.id, body)
    .then((marchandise) => {
        if (marchandise) {
            res.json(marchandise);
        } else {
            res.status(404).json({ error: 'Marchandise non trouvé' });
        }
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la modification de la marchandise' })
    });
});

// // Route DELETE pour supprimer une marchandise par ID
app.delete('/marchandises/:id', (req, res) => {
    Marchandise.findByIdAndDelete(req.params.id)
    .then((marchandise) => {
        if (marchandise) {
            res.json(marchandise);
        } else {
            res.status(404).json({ error: 'Marchandise non trouvé' });
        }
        })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la suppression de la marchandise' });
    });
});
//Methode concernant le model Permis
//Route Get pour lister tous les permis
app.get('/permis', (req, res) => {
    Permis.find()
        .then(permis => {
            res.json(permis)
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des permis :', err);
            res.status(500).send('Erreur lors de la récupération des permis');

        })
  });

//Route post pour ajouter un nouveau permis
app.post('/permis', (req, res) => {
    const permis = new Permis({
        _id: new mongoose.Types.ObjectId(),
        date_emission_permis: req.body.date_emission_permis,
        date_experation_permis: req.body.date_experation_permis,
        categorie_permis: req.body.categorie_permis,
        numero_permis: req.body.numero_permis
    });
    permis.save()
    .then((permis) => {
        res.json(permis);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la création de du permis' });
    });
});

// Route PUT pour modifier un permis par ID
app.put('/permis/:id', (req, res) => {
    body = {
        date_emission_permis: req.body.date_emission_permis,
        date_experation_permis: req.body.date_experation_permis,
        categorie_permis: req.body.categorie_permis,
        numero_permis: req.body.numero_permis
    }
    Permis.findByIdAndUpdate(req.params.id, body)
    .then((permis) => {
        if (permis) {
            res.json(permis);
        } else {
            res.status(404).json({ error: 'Permis non trouvé' });
        }
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la modification du permis' });
    });
});

// // Route DELETE pour supprimer un permis par ID
app.delete('/permis/:id', (req, res) => {
    Permis.findByIdAndDelete(req.params.id)
    .then((permis) => {
        if (permis) {
            res.json(permis);
        } else {
            res.status(404).json({ error: 'Permis non trouvé' });
        }
        })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la suppression de permis' });
    });
});
//Methode concernant le model Entrepot
//Route Get pour lister tous les Entrepots
app.get('/entrepots', (req, res) => {
    Entrepot.find()
        .then(entrepot => {
            res.json(entrepot)
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des entrepots :', err);
            res.status(500).send('Erreur lors de la récupération des Entrepots');

        })
  });

//Route post pour ajouter un nouveau Entrepot
app.post('/entrepots', (req, res) => {
    const entrepot = new Entrepot({
        _id: new mongoose.Types.ObjectId(),
        nom: req.body.nom,
        adresse: req.body.adresse,
        email: req.body.email,
        telephone: req.body.telephone,
        ville:req.body.ville,
        pays: req.body.pays
    });
    entrepot.save()
    .then((entrepot) => {
        res.json(entrepot);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la création de l\'Entrepot' });
    });
});

// Route PUT pour modifier un Entrepot par ID
app.put('/entrepots/:id', (req, res) => {
    body = {
        nom: req.body.nom,
        adresse: req.body.adresse,
        email: req.body.email,
        telephone: req.body.telephone,
        ville: req.body.ville,
        pays: req.body.pays
    }
    Entrepot.findByIdAndUpdate(req.params.id, body)
    .then((entrepot) => {
        if (entrepot) {
            res.json(entrepot);
        } else {
            res.status(404).json({ error: 'Entrepot non trouvé' });
        }
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la modification de l\'entrepot' });
    });
});

// Route DELETE pour supprimer un Entrepot par ID
app.delete('/entrepots/:id', (req, res) => {
    Entrepot.findByIdAndDelete(req.params.id)
    .then((entrepot) => {
        if (entrepot) {
            res.json(entrepot);
        } else {
            res.status(404).json({ error: 'Entrepot non trouvé' });
        }
        })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'entrepot' });
    });
});
//Methode concernant le model Conducteur
//Route Get pour lister tous les Conducteurs
app.get('/conducteurs', (req, res) => {
    Conducteur.find()
        .then(conducteur => {
            res.json(conducteur)
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des conducteurs :', err);
            res.status(500).send('Erreur lors de la récupération des conducteurs');

        })
  });

//Route post pour ajouter un nouveau conducteur
app.post('/conducteurs', (req, res) => {
    const conducteur = new Conducteur({
        _id: new mongoose.Types.ObjectId(),
        prenom: req.body.prenom,
        nom: req.body.nom,
        adresse: req.body.adresse,
        telephone: req.body.telephone,
        email: req.body.email,
        dateNaissance:req.body.dateNaissance,
        permis: req.body.permis
    });
    conducteur.save()
    .then((conducteur) => {
        res.json(conducteur);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la création du conducteur' });
    });
});

// Route PUT pour modifier un Conducteur par ID
app.put('/conducteurs/:id', (req, res) => {
    body = {
        prenom: req.body.prenom,
        nom: req.body.nom,
        adresse: req.body.adresse,
        email: req.body.email,
        telephone: req.body.telephone,
        permis: req.body.permis,
    }
    Conducteur.findByIdAndUpdate(req.params.id, body)
    .then((conducteur) => {
        if (conducteur) {
            res.json(conducteur);
        } else {
            res.status(404).json({ error: 'Conducteur non trouvé' });
        }
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la modification du conducteur' });
    });
});

// Route DELETE pour supprimer un Conducteur par ID
app.delete('/conducteurs/:id', (req, res) => {
    Conducteur.findByIdAndDelete(req.params.id)
    .then((conducteur) => {
        if (conducteur) {
            res.json(conducteur);
        } else {
            res.status(404).json({ error: 'Conducteur non trouvé' });
        }
        })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la suppression du conducteur' });
    });
});
//Methode concernant le model Camion
//Route Get pour lister tous les Conducteurs
app.get('/camions', (req, res) => {
    Camion.find()
        .then(camion => {
            res.json(camion)
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des camions :', err);
            res.status(500).send('Erreur lors de la récupération des camions');

        })
  });

//Route post pour ajouter un nouveau conducteur
app.post('/camions', (req, res) => {
    const camion = new Camion({
        _id: new mongoose.Types.ObjectId(),
        marque: req.body.marque,
        typeCarrosserie: req.body.typeCarrosserie,
        dateFabrication: req.body.dateFabrication,
        capaciteCharge: req.body.capaciteCharge,
        poidsMax: req.body.poidsMax,
        volumeMax:req.body.volumeMax,
        immatriculation: req.body.immatriculation,
        poidsBrut: req.body.poidsBrut,
        puissanceMoteur: req.body.puissanceMoteur,
        typeCarburant: req.body.typeCarburant,
        consommationCarburant: req.body.consommationCarburant,
        empattement: req.body.empattement,
        longeurTotal: req.body.longeurTotal,
        largeurTotal: req.body.largeurTotal,
        hauteurTotal: req.body.hauteurTotal,
        CapaciteRemorquage: req.body.CapaciteRemorquage,
        dateMiseEnCirculation: req.body.dateMiseEnCirculation,
        OptionTransmission: req.body.OptionTransmission,
        conducteur: req.body.conducteur
    });
    camion.save()
    .then((camion) => {
        res.json(camion);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la création du camion' });
    });
});

// Route PUT pour modifier un Conducteur par ID
app.put('/camions/:id', (req, res) => {
    body = {
        marque: req.body.marque,
        typeCarrosserie: req.body.typeCarrosserie,
        modele: req.body.modele,
        dateFabrication: req.body.dateFabrication,
        capaciteCharge: req.body.capaciteCharge,
        poidsMax: req.body.poidsMax,
        volumeMax: req.body.volumeMax,
        immatriculation: req.body.immatriculation,
        poidsBrut: req.body.poidsBrut,
        puissanceMoteur: req.body.puissanceMoteur,
        typeCarburant: req.body.typeCarburant,
        consommationCarburant: req.body.consommationCarburant,
        empattement: req.body.empattement,
        longeurTotal: req.body.longeurTotal,
        largeurTotal: req.body.largeurTotal,
        hauteurTotal: req.body.hauteurTotal,
        capaciteRemorquage: req.body.capaciteRemorquage,
        dateMiseEnCirculation: req.body.dateMiseEnCirculation,
        optionTransmission: req.body.optionTransmission,
        conducteur: req.body.conducteur
    }
    Camion.findByIdAndUpdate(req.params.id, body)
    .then((camion) => {
        if (camion) {
            res.json(camion);
        } else {
            res.status(404).json({ error: 'Camionr non trouvé' });
        }
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la modification du camion' });
    });
});

// Route DELETE pour supprimer un Camion par ID
app.delete('/camions/:id', (req, res) => {
    Camion.findByIdAndDelete(req.params.id)
    .then((camion) => {
        if (camion) {
            res.json(camion);
        } else {
            res.status(404).json({ error: 'Camion non trouvé' });
        }
        })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la suppression du camion' });
    });
});
//Methode concernant le model DetailChargements
//Route Get pour lister tous les DetailChargements
app.get('/detailChargements', (req, res) => {
    DetailChargement.find()
        .then(detailChargement => {
            res.json(detailChargement)
        })
        .catch((err) => {
            console.error('Erreur lors de la récupération des detailChargements :', err);
            res.status(500).send('Erreur lors de la récupération des detailChargements');

        })
  });

//Route post pour ajouter un nouveau DetailChargement
app.post('/detailChargements', (req, res) => {
    const detailChargement = new DetailChargement({
        _id: new mongoose.Types.ObjectId(),
        numero: req.body.numero,
        quantite: req.body.quantite,
        prixUnitaire: req.body.prixUnitaire,
        poids: req.body.poids,
        valeur:req.body.valeur,
        dateChargement: req.body.dateChargement,
        lieuDeChargement: req.body.lieuDeChargement,
        dateArrive: req.body.dateArrive,
        dateDechargement: req.body.dateDechargement,
        lieuDeDechargement: req.body.lieuDeDechargement,
        marchandise: req.body.marchandise,
        camion: req.body.camion
    });
    detailChargement.save()
    .then((detailChargement) => {
        res.json(detailChargement);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la création d\'un detail chargement' });
    });
});

// Route PUT pour modifier un DetailChargement par ID
app.put('/detailChargements/:id', (req, res) => {
    body = {
        numero: req.body.numero,
        quantite: req.body.quantite,
        prixUnitaire: req.body.prixUnitaire,
        poids: req.body.poids,
        valeur:req.body.valeur,
        dateChargement: req.body.dateChargement,
        lieuDeChargement: req.body.lieuDeChargement,
        dateArrive: req.body.dateArrive,
        dateDechargement: req.body.dateDechargement,
        lieuDeDechargement: req.body.lieuDeDechargement,
        marchandise: req.body.marchandise,
        camion: req.body.camion
    }
    DetailChargement.findByIdAndUpdate(req.params.id, body)
    .then((detailChargement) => {
        if (detailChargement) {
            res.json(detailChargement);
        } else {
            res.status(404).json({ error: 'DetailChargement non trouvé' });
        }
    })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la modification du detailChargement' });
    });
});

// Route DELETE pour supprimer un DetailChargement par ID
app.delete('/detailChargements/:id', (req, res) => {
    DetailChargement.findByIdAndDelete(req.params.id)
    .then((detailChargement) => {
        if (detailChargement) {
            res.json(detailChargement);
        } else {
            res.status(404).json({ error: 'DetailChargement non trouvé' });
        }
        })
    .catch((error) => {
        res.status(500).json({ error: 'Erreur lors de la suppression du detailChargement' });
    });
});

