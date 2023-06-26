const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String
})
//creation du model Person
const User = mongoose.model('User', userSchema);
// //création d'une personne
// var user = new User({
//     username: 'Mareme Mboup',
//     password: 'Mareme123',
//     email: 'marememboup93@gmail.com'
// });

// //enregistrement de la personne dans la BD
// user
//     .save()
//     .then(console.log('Utilisateur enregistrée avec succès.'))
//     .catch(err => {
//         console.error(err)
//     })
//recherche toutes les personnes
// User
//     .find()
//     .then(docs => {
//         console.log('Utilisateurs trouvées.',docs)
//     })
//     .catch(err => {
//         console.error(err)
//     })

module.exports = mongoose.model('User', userSchema)