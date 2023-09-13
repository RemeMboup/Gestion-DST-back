const mongoose = require('mongoose')
const {Schema} = mongoose

const EntrepotSchema = new Schema({
    nom:String,
    adresse:String,
    email:String,
    telephone:String,
    ville:String,
    pays:String

})

const Entrepot = mongoose.model('Entrepot', EntrepotSchema)
//Fin de creation du modele Entrepot
// creation d un entrepot
// var entrepot = new Entrepot({
//     nom:"Entrpot Mali",
//     adresse:"Mali",
//     email:"entr@gmail.com",
//     telephone:"338909767",
//     ville:"Bamako",
//     pays:"Mali"
// })

// entrepot
//     .save()
//     .then(console.log("Entrepot enregistre avec succes"))
//     .catch(error => {console.error(error )})

//Fonction qui permet de trouver entrepot

// Entrepot
//     .find()
//     .then(entrepot => {console.log("Le nombre d'entrepot trouves est:", entrepot)
//     })
//     .catch(error => {console.error(error)
//     })
module.exports = mongoose.model('Entrepot', EntrepotSchema)
