const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema ({
    email: {
        type: String, 
        unique: true,
        lowercase: true,
        trim : true, 
    },
    nombre : {
        type: String, 
        required: 'Agregar Nombre'
    }, 
    password: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Usuarios', usuariosSchema);

// Se aumenta comentario para que se actualice todos los archivos en GITHUB
