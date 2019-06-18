var express = require('express');
var s3Proxy = require('s3-proxy');
var Keycloak = require('keycloak-connect');
var session =  require('express-session');

var app = express();

var sessionStore;
sessionStore = new session.MemoryStore();


var kcConfig = {
    clientId: process.env.KC_CLIENT_ID,
    serverUrl: process.env.KC_SERVER_URL,
    realm: process.env.KC_REALM
};

app.use(session({
    secret: process.env.KC_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    name: process.env.KC_SESSION_NAME
}));
var keycloak = new Keycloak({store: sessionStore}, kcConfig);

app.use(keycloak.middleware());


app.get('/*', keycloak.protect(),  s3Proxy({
    bucket: process.env.S3_BUCKET_NAME,
    prefix: process.env.S3_TEST_REPORT_PREFIX,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    overrideCacheControl: 'max-age=1000',
    ServerSideEncryption: 'aws:kms',
    SSEKMSKeyId: process.env.S3_SSE_KMS_KEY_ID
}));

module.exports = app;
