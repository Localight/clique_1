'use strict';

module.exports = {
    db: 'mongodb://localhost/mean-dev',
    // db: 'mongodb://localism2:localism@ord-c8-0.objectrocket.com:39020/havenly',
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
    balancedPayments: 'ak-test-1XRsGC5ekgHQMepPbyO6zc9GuMXmVG4JM',
    subledger: {
        key: '88OpPqUhvGMhXnkGY6w47K',
        secret: 'zXKdLPenIZ4B2r1cOjl46a',
        org_id: 'O0K0eS2wjuLOSRXpPVGvuV',
        book_id: 'T9UhswcXjeH4Q2nlLu9sYP',
        depositor_category_id: '1z4e9kQSwcJ7tUNnnsMjnH',
        uncleared_category_id: 'eml3U9NiHaauqimfRwCQLz',
        balance_sheet_id: 'w0du5EvqLHUCDusk6imDEl',
        processing_id: 'niybAvJdacBXxQktA3F12m'
    }
};
