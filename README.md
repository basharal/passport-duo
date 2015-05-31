# Passport-Duo

[Passport](http://passportjs.org/) strategy for two-factor authentication using [Duo](http://www.duosecurity.com).

This module lets you authenticate using Duo two-factor authentication in your Node.js
applications.  By plugging into Passport, Duo's two-factor authentication can be
easily and unobtrusively integrated into any application or framework that
supports [Connect](http://www.senchalabs.org/connect/)-style middleware,
including [Express](http://expressjs.com/).

Note that in contrast to most Passport strategies, Duo's two-factor authentication requires
that a user already be authenticated using an initial factor.  Requirements
regarding when to require a second factor are a matter of application-level
policy, and outside the scope of both Passport and this strategy.

## Install

    $ npm install passport-duo

## Usage

#### Configure Strategy

The Duo authentication strategy authenticates a user using a Duo's UI, which either enrolls or authenticates users.
The strategy requires specifying the integration key, secret key, application host and the login URL that has the
Duo Web SDK iframe.

    passport.use(new DuoStrategy(ikey, skey, host, loginUrl));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'duo'` strategy, to authenticate
requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/verify-duo',
      passport.authenticate('duo', { failureRedirect: '/verify-duo' }),
      function(req, res) {
        req.session.authFactors = [ 'duo' ];
      });

## Examples

For a complete, working example, refer to the [two-factor example](https://github.com/basharal/passport-duo/tree/master/examples/two-factor).

## Tests

    $ npm install
    $ make test

[![Build Status](https://secure.travis-ci.org/basharal/passport-duo.png)](http://travis-ci.org/basharal/passport-duo)

## Credits

  - [Bashar Al-Rawi](http://github.com/basharal)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2015 Bashar Al-Rawi
