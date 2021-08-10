const { Client, Intents, MessageEmbed } = require('discord.js');
const env = require('./utils/env-helper');
require('dotenv').config({ path: require('find-config')('.env') });

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
  console.log('Ready!');
});

client.login(env('TOKEN'));

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
