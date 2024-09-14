const moment = require('moment');

const logColors = {
    INFO: '\x1b[34m',   // Blue
    ERROR: '\x1b[31m',  // Red
    SUCCESS: '\x1b[32m',// Green
    NORMAL: '\x1b[37m'  // Normal
};

const resetColor = '\x1b[0m';

function log(type, text) {
    const timestamp = moment().format('HH:mm:ss');
    const color = logColors[type] || logColors.NORMAL;
    console.log(`${color}UNDESYNC | ${timestamp} | ${text}${resetColor}`);
}

module.exports = {
    info: (text) => log('INFO', text),
    error: (text) => log('ERROR', text),
    success: (text) => log('SUCCESS', text),
    normal: (text) => log('NORMAL', text)
};
