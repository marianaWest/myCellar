const mongoose = require('mongoose');

const wineBRSchema = new mongoose.Schema({
    nameBR: {
        type: String,
        required: false
    },
    wineryBR: {
        type: String, 
        required: false
    }, 
    vintageBR: {
        type: String,
        required: false
    }, 
    regionBR: {
        type: String, 
        required: false
    },
    numberOfBottlesBR: {
        type: Number, 
        required: false
    },
     wineTypeBR: {
        type: String, 
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }   
})


module.exports = mongoose.model('WineBR', wineBRSchema, 'winesBR')
