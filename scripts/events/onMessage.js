module.exports = {
  config: {
    name: "onMessage",
    version: "1.0",
    author: "Your Name"
  },

  onStart: async function({ message, event, api }) {
    const prefix = global.GoatBot.config.prefix;

    if (!message.startsWith(prefix)) {
      for (const [cmdName, cmd] of global.GoatBot.commands) {
        if (cmd.onChat) {
          try {
            await cmd.onChat({
              message,
              event,
              args: message.split(' '),
              api
            });
          } catch (err) {
            console.error(`Error in onChat for ${cmdName}:`, err);
          }
        }
      }
      return;
    }

    const args = message.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = global.GoatBot.commands.get(commandName);
    if (!command) {
      return api.sendMessage(
        `❌ Command "${commandName}" not found! Type "${prefix}help" for available commands.`,
        event.threadID
      );
    }

    const adminIDs = global.GoatBot.config.adminIDs;
    if (command.config.role === 1 && !adminIDs.includes(event.senderID)) {
      return api.sendMessage(
        "❌ You don't have permission to use this command!",
        event.threadID
      );
    }

    try {
      await command.onStart({
        message: message.slice(prefix.length + commandName.length).trim(),
        event,
        args,
        api
      });
      console.log(`✓ Executed command: ${commandName} by ${event.senderID}`);
    } catch (err) {
      console.error(`✗ Error executing command ${commandName}:`, err);
      return api.sendMessage(
        `❌ Error executing command: ${err.message}`,
        event.threadID
      );
    }
  }
};
