var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema ({
    playerName: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }, 
    position: {
        type: String,
        required: true
    },
    teamName: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Players', playerSchema);