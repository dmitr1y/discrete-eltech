var mongoose = require('mongoose');
var db = require('./access');

//TODO change DB secure data
mongoose.connect('mongodb://' + db.database);

module.exports = mongoose.connection;
