const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Tracking = new Schema({
    order_date: {
        type: Date
    },
    destination: {
        type: [String]
    },
    origin: {
        type: [String]
    }
});

module.exports = mongoose.model('Tracking', Tracking);