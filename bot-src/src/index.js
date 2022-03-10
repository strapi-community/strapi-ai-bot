require('./lib/setup');
const { LogLevel, SapphireClient } = require('@sapphire/framework');
const { discord_token } = require('./config.js');

const client = new SapphireClient({
	logger: {
		level: LogLevel.Debug
	},
	shards: 'auto',
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_BANS',
		'GUILD_EMOJIS_AND_STICKERS',
		'GUILD_VOICE_STATES',
		'GUILD_MESSAGES',
		'GUILD_MESSAGE_REACTIONS',
		'DIRECT_MESSAGES',
		'DIRECT_MESSAGE_REACTIONS'
	]
});

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login(discord_token);
		client.logger.info('logged in');
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}

	// TODO: old bot code to send survey, we need to move this
	client.on('guildMemberAdd', (member) => {
		client.users.fetch(member.id, false).then((user) => {
			const newUserEmbed = new MessageEmbed()
				.setColor('#00ffff')
				.setTitle(`🙋‍♀️ Hello ${user.username}`)
				.setDescription(
					`You are now a member of a growing community of Strapi developers/users from all over the world who build awesome projects, and support each other.\n\n👋 We'd **love** to get to know you a bit better, so please **[fill out this short survey](https://strapi.typeform.com/to/TLM3Ae?channel=U01JT604ER2)** then introduce yourself in the [#introduction channel](https://discord.gg/2ZVmbQAuKW)! \n\nIf you're stuck for things to say, here are a few ideas: \n- Where you're from? \n- What tech stack do you use? \n- Your experience with Strapi? \n- What have you been working on?`
				);
			console.log(`Sending new user message to: ${user.username}`);
			user.send({ embed: newUserEmbed });
		});
	});
};

main();
