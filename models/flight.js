const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class 
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    },
    arrival: {
        type: Date,
        default: function () {
            const current = new Date();
            const date = current.setFullYear(current.getFullYear() + 1);
            return date
        }
    }
})

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United'],
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN',
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
        default: function() {
            const current = new Date();
            const date = current.setFullYear(current.getFullYear() + 1);
            return date
        }
    },
    destinations: [destinationSchema],
});

module.exports = mongoose.model('Flight', flightSchema);