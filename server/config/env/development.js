'use strict';

module.exports = {
    db: 'mongodb://localhost/mean-dev',
    app: {
        name: 'MEAN - FullStack JS - Development'
    },
    facebook: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    twitter: {
        clientID: 'CONSUMER_KEY',
        clientSecret: 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: 'API_KEY',
        clientSecret: 'SECRET_KEY',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    },
    twilio: {
        acctSid: 'AC9bfd970cef5934b23e69f1ef72812a23',
        authToken: 'a6bfeeed497cfb9b8d10c329ce721759',
        disableSigCheck: false,
    },
    mailgun: {
            apiKey: 'key-212g0rzf7j9z-n9b7zdl797o3bxrsu38'
            , domain: 'https://api.mailgun.net/v2/rs56424.mailgun.org/messages'
            , from: 'auction@TeachArt.org'
    },
    balancedPayments: 'ak-test-1XRsGC5ekgHQMepPbyO6zc9GuMXmVG4JM'
};
