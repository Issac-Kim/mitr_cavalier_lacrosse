var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    year: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    about: {
        type: String
    },
    coaches: [{
        type: String
    }],
    tournaments: [{
        type: String
    }],
    tryouts: [{
        type: String
    }],
    location: {
        type: String
    },
    fees: {
        type: String
    },
    other: {
        type: String
    },
    roster: {
        type: Array
    }
    
});

module.exports = mongoose.model('Team', teamSchema);