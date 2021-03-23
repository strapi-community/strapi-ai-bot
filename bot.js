const {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} = require('discord-akairo');
const owners = require('./owners.json');
const env = require('./utils/env-helper');
require('dotenv').config({ path: require('find-config')('.env') });

class MyClient extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: owners,
      },
      {
        disableMentions: 'everyone',
      }
    );

    this.commandHandler = new CommandHandler(this, {
      directory: './commands/',
      prefix: '?', // or ['?', '!']
    });

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: './inhibitors/',
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: './listeners/',
    });

    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.inhibitorHandler.loadAll();
    this.listenerHandler.loadAll();
    this.commandHandler.loadAll();
  }
}

const client = new MyClient();
client.login(env('TOKEN'));
