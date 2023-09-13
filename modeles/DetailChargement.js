const mongoose = require('mongoose')
const {Schema} = mongoose
const Entrepot = require('./Entrepot')
const Marchandise = require('./Marchandise')
const Camion = require('./Camion')

const DetailChargementSchema = new Schema({
    numero:String,
    quantite:Number,
    prixUnitaire: Number,
    volume:Number,
    poids:Number,
    valeur:Number,
    dateChargement:{type: Date, default:Date.now},
    dateDepart:{type: Date, default: Date.now},
    lieuDeChargement:[
        {type: Schema.Types.ObjectId, ref:'Entrepot'}
    ],
    dateArrive:{type: Date, default: Date.now},
    dateDechargement:{type: Date, default:Date.now},
    lieuDeDechargement:[
        {type: Schema.Types.ObjectId, ref:'Entrepot'}
    ],
    marchandise:[
        {type: Schema.Types.ObjectId, ref:'Marchandise'}
    ],
    camion:[
        {type: Schema.Types.ObjectId, ref:'Camion'}
    ],
    
})
const DetailChargement = mongoose.model('DetailChargement', DetailChargementSchema)
//Enregistrement d'un detail chargement
// var detailChargement = new DetailChargement({
//     numero:"00001",
//     quantite:35,
//     prixUnitaire:130000,
//     poids:35,
//     valeur:4550000,
//     dateChargement:"2023-08-17T03:24:00",
//     dateDepart:"2023-08-18T03:00:00",
//     lieuDeChargement:["64fc744b5c40f48786d09914"],
//     dateArrive:"2023-08-21T03:00:00",
//     dateDechargement:"2023-08-21T08:00:00",
//     lieuDeDechargement:["64fc74b77d1382e7f70615f4"],
//     marchandise:["64fde4acae32327c63afe10e"],
//     camion:["64fdc41324435a7ce440be8e"],


// })
// detailChargement
//     .save()
//     .then(console.log("Detail chargement enregistre avec succes"))
//     .catch(error => {console.error(error)}
//     )
//Fin d'enregistrement d'un detail chargement
//Trouver la liste des details chargement
DetailChargement
    .find()
    .then(detailChargement => {console.log("Le nombre de details chargements trouve est:",detailChargement)
    })
    .catch(error => {console.error(error);
    })

// Methode pour supprimer un objet par son id
// var id_detail_chargement = "64fc8f747490c0fdfaedeb23"
// DetailChargement.deleteOne({ _id: id_detail_chargement }).then(function(){
//     console.log("Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });

