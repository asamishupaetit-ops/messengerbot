module.exports = {
  config: {
    name: "hello",
    version: "1.0",
    author: "Your Name",
    countDown: 5,
    role: 0,
    shortDescription: "Say hello",
    longDescription: "Bot says hello to you",
    category: "greeting",
    guide: "{pn} hello"
  },

  onStart: async function({ message, event, args, api }) {
    const senderName = event.senderName || 'User';
    return api.sendMessage(
      `Hello ${senderName}! 👋 Welcome to the bot!`,
      event.threadID
    );
  },

  onChat: async function({ message, event, args, api }) {
    if (message.toLowerCase().includes("hello")) {
      return api.sendMessage("Hello there! 👋", event.threadID);
    }
  }
};
