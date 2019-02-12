var mongoose = require('mongoose');
var db = require('./access');

//TODO change DB secure data
mongoose.connect('mongodb://' + db.database);


// Retry connection
const connectWithRetry = () => {
    console.log('MongoDB connection with retry');
    return mongoose.connect(db.database)
};

// Exit application on error
mongoose.connection.on('error', err => {
    console.log(`MongoDB connection error: ${err}`);
    setTimeout(connectWithRetry, 5000)
    // process.exit(-1)
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected')
});

module.exports = mongoose.connection;
