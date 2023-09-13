const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGO_URI, {
        useNewUrlParser : true,
        useUnifiedTopology : true 
    }
).then(() => console.log("Connection à la base de donnees reussie")
).catch((err) => console.log(err))