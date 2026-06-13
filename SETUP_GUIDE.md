# Complete Setup Guide

## Step 1: Clone Repository

```bash
git clone https://github.com/asamishupaetit-ops/messengerbot.git
cd messengerbot
```

## Step 2: Install Node.js

Download Node.js 16.x from [nodejs.org](https://nodejs.org/dist/v16.20.0)

Verify installation:
```bash
node --version
npm --version
```

## Step 3: Install Dependencies

```bash
npm install
npm install fb-chat-api
```

## Step 4: Get Facebook Credentials

### Get Your UID
1. Go to [facebook.com/me](https://www.facebook.com/me)
2. Copy your UID from the URL

### Prepare Login Credentials
1. Create a throwaway Facebook account (optional but recommended)
2. Note down email and password

## Step 5: Configure Bot

Edit `config.json`:

```json
{
  "prefix": "/",
  "language": "en",
  "adminIDs": ["YOUR_UID_HERE"],
  "port": 3000,
  "environment": "development"
}
```

## Step 6: Start the Bot

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

You should see:
```
╔════════════════════════════════╗
║   Messenger Bot is Running!    ║
║   Port: 3000                   ║
║   Commands: 3                  ║
║   Events: 3                    ║
╚════════════════════════════════╝
```

## Step 7: Test Bot

1. Send `/help` to your bot account
2. Try `/ping` to check status
3. Try `/hello` for greeting

## Troubleshooting

### npm install fails
- Update npm: `npm install -g npm@latest`
- Clear cache: `npm cache clean --force`

### Commands not loading
- Check `scripts/commands/` folder exists
- Verify file names end with `.js`
- Check console for error messages

## Next Steps

1. Create custom commands in `scripts/commands/`
2. Add event handlers in `scripts/events/`
3. Deploy to production
