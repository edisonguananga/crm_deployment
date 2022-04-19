const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env'});


// Cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');

//Conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
});

//Crear el servidor
const app = express();

//Habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Definir un dominio(s) para recibir las peticiones
//const whitelist = ['http://localhost:3000']
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        //Revisar si la petición viene de un servidor que esta en whitelist
        const existe = whitelist.some(dominio => dominio === origin);
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}


// Habilitar cors
app.use(cors(corsOptions));

//Rutas de la app
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.POR || 5000;

//Habilitar puerto
//app.listen(5000);
app.listen(port, host, () => {
    console.log('El servidor esta funcionando')
});
