# Messenger Bot V2

A Node.js-based Facebook Messenger chatbot inspired by [Goat-Bot-V2](https://github.com/ntkhang03/Goat-Bot-V2).

## ⚠️ Important Warning

This bot uses an **unofficial Facebook API**. This violates Facebook's Terms of Service and carries risks including:
- Account lockdown
- Permanent ban
- Loss of access to your account

**It is strongly recommended to use a throwaway/clone Facebook account with this bot.**

## 📋 Requirements

- Node.js 16.x or higher
- npm 7.0.0 or higher
- JavaScript/Node.js knowledge
- A Facebook account (preferably throwaway)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
npm install fb-chat-api
```

### 2. Configure

```bash
cp .env.example .env
```

Edit `config.json` with your settings:

```json
{
  "prefix": "/",
  "language": "en",
  "adminIDs": ["YOUR_UID_HERE"],
  "port": 3000,
  "environment": "development"
}
```

### 3. Get Your Facebook UID

Visit [facebook.com/me](https://www.facebook.com/me) and note your UID from the URL.

### 4. Run the Bot

```bash
npm start          # Production
npm run dev        # Development mode
```

## 📁 Project Structure

```
messengerbot/
├── index.js                    # Main bot file
├── config.json                 # Bot configuration
├── package.json                # Dependencies
├── scripts/
│   ├── commands/               # Command files
│   │   ├── hello.js
│   │   ├── ping.js
│   │   └── help.js
│   └── events/                 # Event handler files
│       ├── onMessage.js
│       ├── onUserJoin.js
│       └── onUserLeave.js
├── utils/
│   ├── facebook.js             # Facebook API utilities
│   └── logger.js               # Logging utilities
├── data/                       # Data storage
├── logs/                       # Application logs
└── README.md                   # This file
```

## 🛠️ Creating Commands

Create files in `scripts/commands/` folder:

```javascript
module.exports = {
  config: {
    name: "commandname",
    version: "1.0",
    author: "Your Name",
    countDown: 5,
    role: 0,
    shortDescription: "Does something",
    longDescription: "Longer description",
    category: "general",
    guide: "{pn} commandname [args]"
  },

  onStart: async function({ message, event, args, api }) {
    return api.sendMessage("Response", event.threadID);
  },

  onChat: async function({ message, event, args, api }) {
    if (message.includes("keyword")) {
      return api.sendMessage("Response", event.threadID);
    }
  }
};
```

## 🎯 Creating Events

Create files in `scripts/events/` folder:

```javascript
module.exports = {
  config: {
    name: "eventname",
    version: "1.0",
    author: "Your Name"
  },

  onStart: async function({ event, api, message }) {
    return api.sendMessage("Response", event.threadID);
  }
};
```

## 📚 Built-in Commands

- `/hello` - Greet the user
- `/ping` - Check bot status
- `/help` - Show available commands

## 🔐 Security Notes

1. **Never commit credentials** - Use `.env` file
2. **Use throwaway account** - Original account safety first
3. **Keep dependencies updated** - Security patches
4. **Validate user input** - Prevent injection attacks

## 📄 License

MIT License

## 🙏 Credits

Inspired by [Goat-Bot-V2](https://github.com/ntkhang03/Goat-Bot-V2) by NTKhang

## ⚖️ Disclaimer

**This project is for educational purposes only.** Using unofficial APIs violates Facebook's Terms of Service. Use at your own risk.
