var envs = require('envs');

var access = {
    database: envs('DATABASE'),
    // database: "root:password@mongo:27017/evklid",
    googleClientSecret: envs('GOOGLE_CLIENT_SECRET'),
    googleClientID: envs('GOOGLE_CLIENT_ID'),
    googleCallbackURL: envs('GOOGLE_CALBACK_URL'),
    googleCallbackURLLogin: envs('GOOGLE_CALBACK_URL_LOGIN'),
};

module.exports = access;
