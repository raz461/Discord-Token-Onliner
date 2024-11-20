const fs = require('fs');
const { info, error } = require('../modules/logs');

function getTokens(filePath) {
    return fs.readFileSync(filePath, 'utf-8')
    .split('\n')
    .map(token => token.trim())
    .filter(token => token.length > 0);
}

function saveDeadToken(filePath, token) {
    fs.appendFile(filePath, `${token}\n`, (err) => {
        if (err) {
            error('Error saving dead token:', err);
        } else {
            info('Dead token saved in deadTokens.txt');
        }
    });
}

module.exports = { getTokens, saveDeadToken };
