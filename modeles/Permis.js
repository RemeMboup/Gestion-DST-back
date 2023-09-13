const mongoose  = require('mongoose')
const {Schema} = mongoose

const PermisSchema = new Schema({
    date_emission_permis : { type: Date, default: Date.now },
    date_expiration_permis :{ type: Date, default: Date.now },
    categorie_permis:String,
    numero_permis:Number



})
const Permis = mongoose.model('Permis', PermisSchema)
// creation de un permis
// var  permis = new Permis({
//     date_emission_permis:'2021-12-17T03:24:00',
//     date_experation_permis:'2031-12-17T03:24:00',
//     categorie_permis:"A1B",
//     numero_permis:"10010050"
    

// })
// permis
// .save()
// .then(console.log("Permis enregistre avec succes"))
// .catch(error => {console.error(error)
// })
//recherche toutes les pERMIS
// Permis
//     .find()
//     .then(permis => {
//         console.log('Permis trouvées.',permis)
//     })
//     .catch(err => {
//         console.error(err)
//     })

// Methode pour supprimer un objet par son id
// var id_permis = "64a81f5dfc73c4e0718866fd"
// Permis.deleteOne({ _id: id_permis }).then(function(){
//     console.log("Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });

module.exports = mongoose.model('Permis', PermisSchema)
