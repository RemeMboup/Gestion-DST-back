const mongoose = require('mongoose')
const { Schema } = mongoose
const Client = require('./Client')
const Compagnie = require('./Client')


const BonDeLivraisonSchema = new Schema({
    numero_bl:String,
    client:[
        {type: Schema.Types.ObjectId, ref: 'Client'}
      ],
    compagnie:[
        {type: Schema.Types.ObjectId, ref: 'Compagnie'}
      ]

})
//creation du model camion
const BonDeLivraison = mongoose.model('BonDeLivraison', BonDeLivraisonSchema)

//creation de bon de livraison
// var bonLivraison = new BonDeLivraison({
//     numero_bl:'LHV90906789',
//     client:["662bb00df3e7edefc89deb3b"],
//     compagnie:["662bb4c0ba4d259aea992b2e"] })

//  bonLivraison
//     .save()
//     .then(console.log("Bon enregré avec succés"))
//     .catch(error => {console.error(error);
//     })
//Fin d enregistrement 
//Trouver tous les bons
bonLivraison
    .find()
    .then(bonLivraison =>{console.log("La liste des bons est:",bonLivraison)
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
    