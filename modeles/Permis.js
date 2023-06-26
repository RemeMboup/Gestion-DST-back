const mongoose  = require('mongoose')
const {Schema} = mongoose

const PermisSchema = new Schema({
    date_emission_permis : { type: Date, default: Date.now },
    date_experation_permis :{ type: Date, default: Date.now },
    //type_permis = String
    categorie :String



})
const Permis = mongoose.model('Permis', PermisSchema)
// cfeation de un permis
var  permis = new Permis({
    date_emission_permis:'2021-12-17T03:24:00',
    date_experation_permis:'2031-12-17T03:24:00',
    categorie:"AM"
    

})
permis
.save()
.then(console.log("Permis enregistre avec succes"))
.catch(error => {console.error(error)
})
//recherche toutes les pERMIS
Permis
    .find()
    .then(permis => {
        console.log('Permis trouvées.',permis)
    })
    .catch(err => {
        console.error(err)
    })
