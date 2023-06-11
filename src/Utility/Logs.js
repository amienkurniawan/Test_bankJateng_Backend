const winston = require('winston');

// Konfigurasi logger
const logger = winston.createLogger({
  level: 'info', // Level log yang ditampilkan (contoh: error, warn, info, verbose, debug, silly)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'app.log' }) // Menyimpan log ke file 'app.log'
  ]
});

module.exports = logger;