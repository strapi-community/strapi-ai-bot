'use strict'

const env = require('./lib/env-helper')

module.exports = {
	discordToken: env('TOKEN'),
	owners: env.array('OWNERS'),
	backendUrl: env('BACKEND_URL', 'http://localhost:1337'),
}
