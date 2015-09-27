exports.randomKey = function(len) {
  var buf = []
    , chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Reconstructs the original URL of the request.
 *
 * This function builds a URL that corresponds the original URL requested by the
 * client, including the protocol (http or https) and host.
 *
 * If the request passed through any proxies that terminate SSL, the
 * `X-Forwarded-Proto` header is used to detect if the request was encrypted to
 * the proxy, assuming that the proxy has been flagged as trusted.
 *
 * @param {http.IncomingMessage} req
 * @param {Object} [options]
 * @return {String}
 * @api private
 */
exports.originalURL = function(req, options, url) {
  options = options || {};
  var app = req.app;
  if (app && app.enabled && app.enabled('trust proxy')) {
    options.proxy = true;
  }
  var trustProxy = options.proxy;
  var proto = (req.headers['x-forwarded-proto'] || '').toLowerCase()
      , tls = req.connection.encrypted || (trustProxy && 'https' == proto.split(/\s*,\s*/)[0])
      , host = (trustProxy && req.headers['x-forwarded-host']) || req.headers.host
      , protocol = tls ? 'https' : 'http'
      , path = options.url || req.url || '';
  return protocol + '://' + host + path;
};