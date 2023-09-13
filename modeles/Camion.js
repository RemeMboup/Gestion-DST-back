const mongoose = require('mongoose')
const { Schema } = mongoose
const Conducteur = require('./Conducteur')


const CamionSchema = new Schema({
    marque:String,
    typeCarrosserie:String,
    modele:String,
    dateFabrication:{ type: Date, default: Date.now },
    capaciteCharge:Number,
    poidsMax:Number,
    volumeMax:Number,
    immatriculation:String,
    poidsBrut:Number,
    puissanceMoteur:Number,
    typeCarburant:String,
    consommationCarburant:Number,
    empattement:Number,
    longeurTotal:Number,
    largeurTotal:Number,
    hauteurTotal:Number,
    capaciteRemorquage:Number,
    dateMiseEnCirculation:{ type: Date, default: Date.now },
    optionTransmission:String,
    conducteur:[
        {type: Schema.Types.ObjectId, ref: 'Conducteur'}
      ]

})
//creation du model camion
const Camion = mongoose.model('Camion', CamionSchema)

//creation d'un camion
// var camion = new Camion({
//     marque:"Toyota",
//     typeCarrosserie:"benne",
//     modele:"348",
//     dateFabrication:"2021-12-17T03:24:00",
//     capaciteCharge:40,
//     poidsMax:50,
//     immatriculatin:"Dk 14 41 AP",
//     poidsBrut:100,
//     puissanceMoteur:270,
//     typeCarburant:"Super",
//     consommationCarburant:0.33,
//     empattement:2,
//     longeurTotal:16,
//     largeurTotal:2.5,
//     hauteurTotal:3.80,
//     capaciteRemorquage:9200,
//     dateMiseEnCirculation:"2022-01-17T03:24:00",
//     optionTransmission:"Transmission arrière",
//     conducteur:["64a821f0d64fe0b8c67ae139"]
//  })

//  camion
//     .save()
//     .then(console.log("Camion enregré avec succés"))
//     .catch(error => {console.error(error);
//     })
// Fin d enregistrement camion
// Trouver tous les camions
Camion
    .find()
    .then(camion =>{console.log("La liste des camions est:",camion)
    })
    .catch(error => {console.error(error)
    })

// Methode pour supprimer un objet par son id
// var id_camion = "64fdc463b9682f110e92d140"
// Camion.deleteOne({ _id: id_camion }).then(function(){
//     console.log("Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });
    