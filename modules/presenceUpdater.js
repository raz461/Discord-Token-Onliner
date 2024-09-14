const statuses = ['online', 'idle', 'dnd'];

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function updatePresence(config) {
    const game = getRandomItem(config.games);
    const status = config.status === 'random' ? getRandomItem(statuses) : config.status;

    return {
        activities: [
            {
                name: game,
                type: 0
            }
        ],
        status: status,
        since: null,
        afk: false
    };
}

module.exports = { updatePresence };
