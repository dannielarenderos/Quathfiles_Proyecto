'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema
    
let ArchivoSchema = new Schema({
    nombreArchivo: {
        type: String,
        required:true
    },
    nombreUsuario: {
        type: String
    },
    fecha:{
        type:String
    },
    starred:{
        type: Boolean,
        default:false
    }
});


module.exports = mongoose.models.archivo || mongoose.model('archivo', ArchivoSchema);