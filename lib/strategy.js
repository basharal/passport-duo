/**
 * Module dependencies.
 */
var passport = require('passport')
  , duo = require('duo_web')
  , url = require('url')
  , util = require('util')
  , utils = require('./utils');


/**
 * `Strategy` constructor.
 *
 * The Duo authentication strategy authenticates requests based on the
 * Duo security two-factor web authentication method.
 *
 * Applications must supply the integration key, secret key, application host, and the login URL for the UI, which
 * contains the iframe for the Duo web SDK
 * The Duo iframe will display the UI to either enroll, authenticate, or deny users.
 * Upon successful authentication, the user will be redirected back to the original request that triggered the
 * two-factor authentication
 * ikey: '1234567890ABCD',
 * skey: '1234567890ABCD1234567890ABCD',
 * host: 'api-xxxxxxxx.duosecurity.com',
 * loginUrl: '/login-duo',
 *
 * Examples:
 *
 *     passport.use(new DuoStrategy(ikey, skey, host, loginUrl));
 *
 * References:
 *  - [Duo Web SDK](https://www.duosecurity.com/docs/duoweb)
 *
 * @param {Object} ikey
 * @param {String} skey
 * @param {String} host
 * @param {String} loginUrl
 * @api public
 */
function Strategy(ikey, skey, host, loginUrl) {
  this._ikey = ikey;
  this._skey = skey;
  this._akey = utils.randomKey(44);
  this._host = host;
  this._loginUrl = loginUrl;
  passport.Strategy.call(this);
  this.name = 'duo';
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on Duo 2-factory authentication.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req, options) {
  var sigResponse = req.body.sig_response;
  if (sigResponse != null) {
    var userName = duo.verify_response(this._ikey, this._skey, this._akey, sigResponse);
    if (userName != null) {
      return this.success(req.user);
    } else {
      return this.fail();
    }
  } else {
    var host = this._host;
    var loginUrl = this._loginUrl;
    var parsed = url.parse(loginUrl, true);
    var signed = duo.sign_request(this._ikey, this._skey, this._akey, req.user.username);
    parsed.query.signed_request = signed;
    parsed.query.host = host;
    console.log(req);
    parsed.query.post_action = utils.originalURL(req, { proxy: this._trustProxy });
    var location = url.format(parsed);
    this.redirect(location);
  }
}


/**
 * Expose `Strategy`.
 */ 
module.exports = Strategy;
