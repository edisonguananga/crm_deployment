const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

const usuariosController = require('../controllers/usuariosController');

// middle para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function() {

    /** Clientes */    
    // Agrega nuevos clientes via POST
    // router.post('/clientes', clienteController.nuevoCliente     );
    router.post('/clientes', clienteController.subirArchivo, clienteController.nuevoCliente);

    // Obtener todos los clientes
    router.get('/clientes',clienteController.mostrarClientes)

    // Mostrar un cliente en específico (ID)
    router.get('/clientes/:idCliente',clienteController.mostrarCliente)

    // Actualizar cliente
    // router.put('/clientes/:idCliente',clienteController.actualizarCliente);
    router.put('/clientes/:idCliente', clienteController.subirArchivo, clienteController.actualizarCliente);

    // Eliminar cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    /** Productos */
    // nuevos productos
    router.post('/productos', productosController.subirArchivo, productosController.nuevoProducto);

    // Muestra todos los productos
    router.get('/productos', productosController.mostrarProductos);

    // muestra un producto en especifico por su ID
    router.get('/productos/:idProducto', productosController.mostrarProducto);

    // Actualizar Productos
    router.put('/productos/:idProducto', productosController.subirArchivo, productosController.actualizarProducto);

    // Eliminar Productos
    router.delete('/productos/:idProducto', productosController.eliminarProducto);

    // Busqueda de Productos
    router.post('/productos/busqueda/:query',
        productosController.buscarProducto);

    /*** PEDIDOS */
    // Agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', pedidosController.nuevoPedido);

    // mostrar todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);

    // Mostrar un pedido por su ID
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);

    // Actualizar pedidos
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

    // Elimina un pedido
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);

    /*** USUARIOS */
    router.post('/crear-cuenta',
        usuariosController.registrarUsuario   
    );

    router.post('/iniciar-sesion',
        usuariosController.autenticarUsuario    
    );
    return router;    
}
