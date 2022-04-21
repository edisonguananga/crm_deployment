const Clientes = require('../models/Clientes');

//Agrega un nuevo cliente
exports.nuevoCliente = async (req,res,next) => {
    const cliente = new Clientes(req.body);
    try {
        // Intentar almacenar el registro
        await cliente.save();
        res.json({mensaje : 'Se agregó un nuevo cliente'});
    } catch (error) {
        // Si hay un error, console log y next
        //console.log(error);
        res.send(error);
        next();
    }
}

// Mostrar todos los clientes
exports.mostrarClientes = async (req,res,next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar cliente por su ID
exports.mostrarCliente = async (req,res,next) => {
    const cliente = await Clientes.findById(req.params.idCliente);
    if (!cliente) {
        res.json({mensaje : 'El cliente no existe'});
        next();
    }
    // Mostrar cliente
    res.json(cliente);
}

// Actualizar cliente por su ID
exports.actualizarCliente = async(req,res,next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente },
        req.body, {
                new : true
        });
        res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar cliente por su ID
exports.eliminarCliente = async(req,res,next) => {
    try {
        await Clientes.findOneAndDelete({ _id : req.params.idCliente });
        res.json({mensaje : 'El cliente se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Se aumenta comentario para que se actualice todos los archivos en GITHUB