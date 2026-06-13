const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function timestamp() {
  return new Date().toISOString();
}

function writeLog(level, message, data = '') {
  const logFile = path.join(logsDir, `${level}.log`);
  const logEntry = `[${timestamp()}] ${message} ${data}\n`;
  fs.appendFileSync(logFile, logEntry);
}

module.exports = {
  info: (message, data) => {
    console.log(`${colors.cyan}[INFO]${colors.reset} ${message} ${data || ''}`);
    writeLog('info', message, data);
  },

  success: (message, data) => {
    console.log(`${colors.green}[✓]${colors.reset} ${message} ${data || ''}`);
    writeLog('success', message, data);
  },

  warning: (message, data) => {
    console.log(`${colors.yellow}[⚠]${colors.reset} ${message} ${data || ''}`);
    writeLog('warning', message, data);
  },

  error: (message, data) => {
    console.log(`${colors.red}[✗]${colors.reset} ${message} ${data || ''}`);
    writeLog('error', message, data);
  },

  debug: (message, data) => {
    console.log(`${colors.magenta}[DEBUG]${colors.reset} ${message} ${data || ''}`);
    writeLog('debug', message, data);
  }
};
