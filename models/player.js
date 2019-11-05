var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema ({
    playerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    }, 
    position: {
        type: String,
        required: true
    },
    teamName: {
        id: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Players', playerSchema);