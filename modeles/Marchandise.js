const mongoose = require('mongoose')
const { Schema } = mongoose

const MarchandiseSchema = new Schema({
    nom:String,
    type:String,


})
const Marchandise = mongoose.model('Marchandise', MarchandiseSchema)

//creation d un modele Marchandise

// var marchandise = new Marchandise({
//     nom:"Riz",
//     type:"Produit Alimentaire",

// })
// marchandise
//     .save()
//     .then(console.log("Marchande enregree avec succes"))
//     .catch(error => {console.error(error)})
//fin D'enregistrement marchandise
//Trouve la liste de tous les marchandises
Marchandise
    .find()
    .then(marchandise => {console.log("Le nombre de marchandise trouve est:",marchandise)
    })
    .catch(error => {console.error(error);
    })

//Methode pour supprimer un objet par son id
// var liste_id_marchandise = ["64f340d0423e598fcd5cccbe","64f3418dd2a24dab573f12ff","64f34a20f7ecf18d901412d8","64fb0c22f6b5542a751a04ed"]
// Marchandise.deleteMany({ _id: {$in:liste_id_marchandise }}).then(function(){
//     console.log("Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });

//Methode pour supprimer un objet par son id
// var id_marchandise = "64fde5e62f1df73dcf521ad3"
// Marchandise.deleteOne({ _id: id_marchandise }).then(function(){
//     console.log("Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });
    

module.exports = mongoose.model('Marchandise', MarchandiseSchema)