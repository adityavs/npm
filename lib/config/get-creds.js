var npm = require('../npm')

var memoized = {}

module.exports = getCreds
function getCreds (cb) {
  var registry = npm.config.get('registry')
  var scope = npm.config.get('scope')

  if (scope) {
    var scopedRegistry = npm.config.get(scope + ':registry')
    var cliRegistry = npm.config.get('registry', 'cli')
    if (scopedRegistry && !cliRegistry) registry = scopedRegistry
  }

  if (memoized[registry]) {
    cb(null, memoized[registry].creds, memoized[registry].auth)
  }

  var creds = npm.config.getCredentialsByURI(registry)
  creds.registry = registry

  memoized[registry] = creds

  cb(null, creds)
}
