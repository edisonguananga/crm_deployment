const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientesSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },    
    empresa: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase : true,
        trim: true
    },
    telefono: {
        type: String,
        trim: true
    }
});

<<<<<<< HEAD
module.exports = mongoose.model('Clientes',clientesSchema)

// Se aumenta comentario para que se actualice todos los archivos en GITHUB
=======
module.exports = mongoose.model('Clientes',clientesSchema)
>>>>>>> 6b0582adae9bb21f806aad600841f92d361aff6e
