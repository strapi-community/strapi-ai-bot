const env = require('./lib/env-helper')

module.exports = {
	discord_token: env('TOKEN'),
	owners: env.array('OWNERS'),
	backend_url: env('BACKEND_URL', 'http://localhost:1337'),
}
