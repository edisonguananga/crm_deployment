const Clientes = require('../models/Clientes');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo 
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        return next();
    })
}

//Agrega un nuevo cliente
/*
exports.nuevoCliente = async (req,res,next) => {
    const cliente = new Clientes(req.body);
    try {
        if(req.file.filename) {
            cliente.imagen = req.file.filename
        }
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
*/

// agrega nuevos clientes con imagen
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    console.log("cliente",cliente);    

    try {
        if(req.file.filename) {
            cliente.imagen = req.file.filename
        }
        await cliente.save();
        res.json({mensaje : 'Se agrego un nuevo cliente'})
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar todos los clientes
exports.mostrarClientes = async (req,res,next) => {
    try {
        const clientes = await Clientes.find({});
        //console.log(clientes);
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
/*
exports.actualizarCliente = async(req,res,next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente },
        req.body, {
                new : true
        });
        res.json(cliente);
    } catch (error) {
        //console.log(error);
        res.send(error)
        next();
    }
}
*/

// Actualiza un cliente por su ID con imagen
exports.actualizarCliente = async (req, res, next) => {
    try {
        // construir un nuevo cliente
        const nuevoCliente = req.body;

        // verificar si hay imagen nueva
        if(req.file) {
            nuevoCliente.imagen = req.file.filename;
        } else {
            let clienteAnterior = await Clientes.findById(req.params.idCliente);
            nuevoCliente.imagen = clienteAnterior.imagen;
        }
        
        let cliente = await Clientes.findOneAndUpdate({_id : req.params.idCliente}, nuevoCliente, {
            new : true,
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
