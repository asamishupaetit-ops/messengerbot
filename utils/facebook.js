const fs = require('fs');
const path = require('path');

let login;
try {
  login = require('fb-chat-api');
} catch (err) {
  console.warn('⚠️  fb-chat-api not installed. Run: npm install fb-chat-api');
}

module.exports = {
  async connect(email, password) {
    if (!login) {
      throw new Error('fb-chat-api not installed');
    }

    return new Promise((resolve, reject) => {
      const appState = this.loadAppState();
      const options = appState ? { appState } : {};

      login({
        email,
        password,
        ...options
      }, (err, api) => {
        if (err) {
          console.error('❌ Facebook login failed:', err.message);
          return reject(err);
        }

        console.log('✅ Successfully connected to Facebook!');

        api.getAppState((appState) => {
          try {
            this.saveAppState(appState);
            console.log('✓ App state saved for faster login next time');
          } catch (err) {
            console.warn('⚠️  Could not save app state:', err.message);
          }
        });

        resolve(api);
      });
    });
  },

  saveAppState(appState) {
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(dataDir, 'appstate.json'),
      JSON.stringify(appState, null, 2)
    );
  },

  loadAppState() {
    const filePath = path.join(__dirname, '..', 'data', 'appstate.json');
    if (fs.existsSync(filePath)) {
      try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (err) {
        console.warn('⚠️  Could not load app state:', err.message);
        return null;
      }
    }
    return null;
  }
};
