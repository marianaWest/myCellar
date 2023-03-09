const mongoose = require('mongoose');

const winePTSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    winery: {
        type: String,  
        required: true,
    },
    vintage: {
        type: String,
        required: false,
    },
    region: {
        type: String,
        required: false
    },
    numberOfBottles: {
        type: Number, 
        required: false,
    },
    wineType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }   
}  
)
module.exports = mongoose.model('WinePT', winePTSchema, 'winesPT')

