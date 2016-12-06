var npm = require('./npm')

module.exports.login = login
function login (creds, cb) {
  try {
    var auth = require('./auth/' + npm.config.get('auth-type'))
  } catch (e) {
    return cb(new Error('no such auth module'))
  }
  auth.login(creds, cb)
}

module.exports.auth = auth
function auth (creds, cb) {
  try {
    var auth = require('./auth/' + npm.config.get('auth-type'))
  } catch (e) {
    return cb(new Error('no such auth module'))
  }
  auth.auth(creds, cb)
}
