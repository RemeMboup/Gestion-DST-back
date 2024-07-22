const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
    nom: String,
    adresse:String,
    email: String,
    telephone: String
})
//creation du model Person
const Client = mongoose.model('Client', clientSchema);
//création d'un client
var client = new Client({
    nom: 'Khady Diop',
    adresse: 'Almadies',
    email: 'khady93@gmail.com',
    telephone: '775004545',
   
});

//enregistrement de la personne dans la BD
client
    .save()
    .then(console.log('Client enregistrée avec succès.'))
    .catch(err => {
        console.error(err)
    })
//recherche toutes les personnes
Client
    .find()
    .then(docs => {
        console.log('Clients trouvées.',docs)
    })
    .catch(err => {
        console.error(err)
    })

module.exports = mongoose.model('Client', clientSchema)