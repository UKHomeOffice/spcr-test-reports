var express = require('express');
var s3Proxy = require('s3-proxy');
var Keycloak = require('keycloak-connect');
var session =  require('express-session');

var app = express();

var sessionStore;
sessionStore = new session.MemoryStore();


var kcConfig = {
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    serverUrl: process.env.KEYCLOAK_URL,
    realm: process.env.KEYCLOAK_REALM
};

app.use(session({
    secret: process.env.KEYCLOAK_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    name: process.env.KEYCLOAK_SESSION_NAME
}));
var keycloak = new Keycloak({store: sessionStore}, kcConfig);

app.use(keycloak.middleware());


app.get('/*', keycloak.protect(),  s3Proxy({
    bucket: process.env.S3_BUCKET_NAME,
    prefix: process.env.S3_TEST_REPORT_PREFIX,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    overrideCacheControl: 'max-age=1000'
}));

module.exports = app;
