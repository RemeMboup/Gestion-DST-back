const mongoose = require('mongoose');
const { Schema } = mongoose;
const express = require('express')
const app = express()

const compagnieSchema = new Schema({
    nom: String,
    adresse:String,
    email: String,
    telephone: String
})
//creation du model Person
const Compagnie = mongoose.model('Compagnie', compagnieSchema);
//création d'un compagnie
// var compagnie = new Compagnie({
//     nom: 'GRIMALDI',
//     adresse: 'Pied Pont de Colobane, Dakar',
//     email: 'grimaldi@grimaldi-senegal.com',
//     telephone: '(221) 33 889 04 90',
   
// });

// //enregistrement de la personne dans la BD
// compagnie
//     .save()
//     .then(console.log('compagnie enregistrée avec succès.'))
//     .catch(err => {
//         console.error(err)
//     })
//recherche toutes les personnes
Compagnie
    .find()
    .then(docs => {
        console.log('Compagnies trouvées.',docs)
    })
    .catch(err => {
        console.error(err)
    })

module.exports = mongoose.model('Compagnie', compagnieSchema)