let envs = require('envs');

access = {
    database: envs('APP_DATABASE'),
    port: envs('APP_PORT'),
    googleClientSecret: envs('GOOGLE_CLIENT_SECRET'),
    googleClientID: envs('GOOGLE_CLIENT_ID'),
    googleCallbackURL: envs('GOOGLE_CALBACK_URL'),
    googleCallbackURLLogin: envs('GOOGLE_CALBACK_URL_LOGIN'),
};


module.exports = access;
