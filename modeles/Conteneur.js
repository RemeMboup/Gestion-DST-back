const mongoose = require('mongoose');
const { Schema } = mongoose;

// Creation du  Schema conteneur
 const conteneurSchema = new Schema({
    numeroConteneur: String
 })
 //creation du model conteneur
const Conteneur = mongoose.model('Conteneur', conteneurSchema)
//Creation du conteneur conteneur
 var conteneur = new Conteneur({
    numeroConteneur : "CMAU4566789"

 })
 // Enregistrempent du contreneur
//  conteneur.save()
//     .then(console.log("Conteneur enregistre avec succes"))
//     .catch(err => {
//         console.error(err)
//         })
// // Trouver la liste des conteneur
// conteneur
//         .find()
//         .then(docs => {
//             console.log('La liste des conteneur est :', docs);
//         })
//         .catch(err => {
//             console.error(err)
//         })

module.exports = mongoose.model('Conteneur', conteneurSchema)


 