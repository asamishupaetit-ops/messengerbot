const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

global.GoatBot = {
  onReply: new Map(),
  onReaction: new Map(),
  onEvent: new Map(),
  commands: new Map(),
  eventCommands: new Map(),
  config: require('./config.json'),
  api: null
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

console.log('🚀 Loading configuration...');

const commandsPath = path.join(__dirname, 'scripts', 'commands');
if (!fs.existsSync(commandsPath)) {
  fs.mkdirSync(commandsPath, { recursive: true });
  console.log('✅ Commands folder created');
}

fs.readdirSync(commandsPath).forEach(file => {
  if (file.endsWith('.js')) {
    try {
      const command = require(path.join(commandsPath, file));
      global.GoatBot.commands.set(command.config.name, command);
      console.log(`✓ Loaded command: ${command.config.name}`);
    } catch (err) {
      console.error(`✗ Error loading command ${file}:`, err.message);
    }
  }
});

console.log('🎯 Loading events...');
const eventsPath = path.join(__dirname, 'scripts', 'events');
if (!fs.existsSync(eventsPath)) {
  fs.mkdirSync(eventsPath, { recursive: true });
  console.log('✅ Events folder created');
}

fs.readdirSync(eventsPath).forEach(file => {
  if (file.endsWith('.js')) {
    try {
      const event = require(path.join(eventsPath, file));
      global.GoatBot.eventCommands.set(event.config.name, event);
      console.log(`✓ Loaded event: ${event.config.name}`);
    } catch (err) {
      console.error(`✗ Error loading event ${file}:`, err.message);
    }
  }
});

app.get('/', (req, res) => {
  res.json({
    status: 'Bot is running',
    commands: global.GoatBot.commands.size,
    events: global.GoatBot.eventCommands.size,
    uptime: process.uptime()
  });
});

app.get('/api/commands', (req, res) => {
  const commands = Array.from(global.GoatBot.commands.values()).map(cmd => ({
    name: cmd.config.name,
    description: cmd.config.shortDescription || 'No description',
    category: cmd.config.category || 'general',
    author: cmd.config.author || 'Unknown'
  }));
  res.json(commands);
});

async function initializeBot() {
  try {
    console.log('\n🔗 Initializing bot...');
    console.log('✓ Bot initialized successfully');
  } catch (err) {
    console.error('✗ Error initializing bot:', err.message);
  }
}

initializeBot().then(() => {
  app.listen(PORT, () => {
    console.log(`\n╔════════════════════════════════╗`);
    console.log(`║   Messenger Bot is Running!    ║`);
    console.log(`║   Port: ${PORT}`);
    console.log(`║   Commands: ${global.GoatBot.commands.size}`);
    console.log(`║   Events: ${global.GoatBot.eventCommands.size}`);
    console.log(`╚════════════════════════════════╝\n`);
  });
});

module.exports = app;
