const synchronizeSlashCommands = require('../modules/SyncCommands');
const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    async execute(client) {
        console.log(`Connected as ${client.user.username}`);
        client.user.setActivity(`con /dolar`, { type: ActivityType.Playing });

        const commandsToSync = client.commands.map((c) => c.data);

        await synchronizeSlashCommands(client, commandsToSync, {
            debug: true,
        });
    }
};