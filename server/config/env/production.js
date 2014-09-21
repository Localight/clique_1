'use strict';

module.exports = {
    // db: 'mongodb://localhost/mean-dev',
    db: 'mongodb://localism2:localism@ord-c8-0.objectrocket.com:39020/havenly',
    app: {
        name: 'MEAN - A Modern Stack - Production'
    },
    facebook: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://clique.cc/auth/facebook/callback'
    },
    twitter: {
        clientID: 'CONSUMER_KEY',
        clientSecret: 'CONSUMER_SECRET',
        callbackURL: 'http://clique.cc/auth/twitter/callback'
    },
    github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://clique.cc/auth/github/callback'
    },
    google: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://clique.cc/auth/google/callback'
    },
    linkedin: {
        clientID: 'API_KEY',
        clientSecret: 'SECRET_KEY',
        callbackURL: 'http://clique.cc/auth/linkedin/callback'
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
    // balancedPayments: 'ak-prod-11sZoE7fajIZpOYqSL5TtYLgcAXaiPU91',
    balancedPayments: 'ak-test-1XRsGC5ekgHQMepPbyO6zc9GuMXmVG4JM',
    subledger: {
        key: '88OpPqUhvGMhXnkGY6w47K',
        secret: 'zXKdLPenIZ4B2r1cOjl46a',
        org_id: 'O0K0eS2wjuLOSRXpPVGvuV',
        book_id: 'T9UhswcXjeH4Q2nlLu9sYP'
    }
};
