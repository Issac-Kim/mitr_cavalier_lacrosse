var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    data: {
        type: Object
    },
    page: {
        type: String
    }
});

module.exports = mongoose.model('Image', imageSchema);