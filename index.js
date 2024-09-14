const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const { updatePresence } = require('./modules/presenceUpdater');
const { getTokens, saveDeadToken } = require('./modules/tokenManager');
const { info, error } = require('./modules/logs');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));
const tokens = getTokens(path.join(__dirname, 'data/tokens.txt'));
const gatewayURL = 'wss://gateway.discord.gg/?v=10&encoding=json';

tokens.forEach((token) => {
    const ws = new WebSocket(gatewayURL);
    console.clear();

    info(`UNDESYNC TOKEN ONLINER | Total Tokens: ${tokens.length}\n`);

    ws.on('open', () => {
        ws.send(JSON.stringify({
            op: 2,
            d: {
                token,
                intents: 513,
                properties: {
                    $os: 'linux',
                    $browser: 'my_library',
                    $device: 'my_library'
                },
                presence: updatePresence(config)
            }
        }));
    });

    ws.on('message', (data) => {
        const { t, op, d } = JSON.parse(data);

        if (op === 10) {
            setInterval(() => ws.send(JSON.stringify({ op: 1, d: null })), d.heartbeat_interval);
            setInterval(() => ws.send(JSON.stringify({ op: 3, d: updatePresence(config) })), config.changeRate);
        }

        if (t === 'READY') {
            info(`Token: ${token.slice(0, token.length / 2)}... Online! | User: ${d.user.username}#${d.user.discriminator}`);
        }
    });

    ws.on('close', (code) => {
        error(`Connection closed with code ${code} for token ${token}`);
        if (code === 4004) {
            error(`Invalid token ${token}. Saving to deadTokens.txt`);
            saveDeadToken(path.join(__dirname, 'data/deadTokens.txt'), token);
        }
    });

    ws.on('error', (err) => {
        error(`WebSocket error for token ${token}: ${err.message}`);
    });
});
