module.exports = {
  config: {
    name: "ping",
    version: "1.0",
    author: "Your Name",
    countDown: 3,
    role: 0,
    shortDescription: "Check bot status",
    longDescription: "Bot responds with pong",
    category: "utility",
    guide: "{pn} ping"
  },

  onStart: async function({ message, event, api }) {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    return api.sendMessage(
      `🏓 Pong! Bot uptime: ${hours}h ${minutes}m ${seconds}s`,
      event.threadID
    );
  }
};
