module.exports = adduser

var log = require('npmlog')
var npm = require('./npm.js')
var usage = require('./utils/usage')
var crypto

try {
  crypto = require('crypto')
} catch (ex) {}

adduser.usage = usage(
  'adduser',
  'npm adduser [--registry=url] [--scope=@orgname] [--auth-type=legacy] [--always-auth]'
)

function adduser (args, cb) {
  if (!crypto) {
    return cb(new Error(
    'You must compile node with ssl support to use the adduser feature'
    ))
  }

  npm.config.getCreds(function (creds) {
    log.disableProgress()
    auth.login(creds, function (err, newCreds) {
      if (err) return cb(err)

      npm.config.del('_token', 'user') // prevent legacy pollution
      if (scope) npm.config.set(scope + ':registry', registry, 'user')
      npm.config.setCredentialsByURI(registry, newCreds)
      npm.config.save('user', cb)
    })
  })
}
