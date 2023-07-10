const mongoose  = require('mongoose')
const {Schema} = mongoose
const Permis = require('./Permis')

const ConducteurSchema = new Schema({
    prenom: String,
    nom: String,
    adresse: String,
    telephone: String,
    email: String,
    dateNaissance: { type: Date, default: Date.now },
    permis:[
        {type: Schema.Types.ObjectId, ref: 'Permis'}
      ]
})

const Conducteur = mongoose.model('Conducteur', ConducteurSchema)
//creation de conducteur
var conducteur = new Conducteur({
    prenom:'Modou',
    nom:'Diop',
    adresse:'Pire',
    telephone:'776787878',
    email:'modou@gmail.com',
    dateNaissance:'1990-12-17T03:24:00',
    permis:["64989df94ba88e6c06c671ec"]
})

conducteur
.save()
.then(console.log('Conducteur enregistre avec succes'))
.catch(error => {console.error(error);
})
//Trouver tous les conducteurs
Conducteur
    .find()
    .then(conducteur => {
        console.log('Conducteurs trouves',conducteur)
    })
    .catch(error => {
        console.error(error);
    })