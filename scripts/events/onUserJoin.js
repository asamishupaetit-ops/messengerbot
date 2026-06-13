module.exports = {
  config: {
    name: "onUserJoin",
    version: "1.0",
    author: "Your Name"
  },

  onStart: async function({ event, api }) {
    const joinedUsers = event.logMessageData?.addedParticipants || [];

    if (joinedUsers.length > 0) {
      const userNames = joinedUsers.map(u => u.name || u.userID).join(", ");
      const welcomeMessage = `👋 Welcome to the chat, ${userNames}!`;

      return api.sendMessage(
        welcomeMessage,
        event.threadID
      );
    }
  }
};
