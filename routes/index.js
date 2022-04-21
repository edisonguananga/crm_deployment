const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const usuariosController = require('../controllers/usuariosController');

// middle para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function() {
    // Agregar nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente);

    // Obtener todos los clientes
    router.get('/clientes',clienteController.mostrarClientes)

    // Mostrar un cliente en específico (ID)
    router.get('/clientes/:idCliente',clienteController.mostrarCliente)

    // Actualizar cliente
    router.put('/clientes/:idCliente',clienteController.actualizarCliente);

    // Eliminar cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente)


    // Usuarios
    router.post('/crear-cuenta',
        usuariosController.registrarUsuario   
    );

    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario    
    );
    return router;    
<<<<<<< HEAD
}
// Se aumenta comentario para que se actualice todos los archivos en GITHUB
=======
}
>>>>>>> 6b0582adae9bb21f806aad600841f92d361aff6e
