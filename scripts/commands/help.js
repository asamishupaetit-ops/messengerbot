module.exports = {
  config: {
    name: "help",
    version: "1.0",
    author: "Your Name",
    countDown: 5,
    role: 0,
    shortDescription: "Show available commands",
    longDescription: "Display list of all available commands",
    category: "utility",
    guide: "{pn} help [command_name]"
  },

  onStart: async function({ message, event, args, api }) {
    const prefix = global.GoatBot.config.prefix;

    if (args.length === 0) {
      let helpText = "📚 **Available Commands:**\n\n";
      const commands = global.GoatBot.commands;

      commands.forEach((cmd, name) => {
        helpText += `${prefix}${name} - ${cmd.config.shortDescription}\n`;
      });

      helpText += `\n📖 Type "${prefix}help [command_name]" for more info on a specific command.`;

      return api.sendMessage(helpText, event.threadID);
    } else {
      const cmdName = args[0].toLowerCase();
      const cmd = global.GoatBot.commands.get(cmdName);

      if (!cmd) {
        return api.sendMessage(
          `❌ Command "${cmdName}" not found!`,
          event.threadID
        );
      }

      const info = `\n📖 **Command Info:**\n\n**Name:** ${cmd.config.name}\n**Description:** ${cmd.config.longDescription}\n**Category:** ${cmd.config.category}\n**Author:** ${cmd.config.author}\n**Usage:** ${cmd.config.guide}\n**Cooldown:** ${cmd.config.countDown}s\n      `;

      return api.sendMessage(info, event.threadID);
    }
  }
};
