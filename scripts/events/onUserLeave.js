module.exports = {
  config: {
    name: "onUserLeave",
    version: "1.0",
    author: "Your Name"
  },

  onStart: async function({ event, api }) {
    const leftUsers = event.logMessageData?.leftParticipantFbId || [];

    if (leftUsers.length > 0) {
      const leaveMessage = `👋 ${leftUsers.length} user(s) left the chat.`;

      return api.sendMessage(
        leaveMessage,
        event.threadID
      );
    }
  }
};
