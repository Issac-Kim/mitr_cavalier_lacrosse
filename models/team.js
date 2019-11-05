var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    teamName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    owner: {
        id: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Team', teamSchema);