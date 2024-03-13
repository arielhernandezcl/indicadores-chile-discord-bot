const synchronizeSlashCommands = require('../modules/SyncCommands')
const { ActivityType } = require('discord.js')
module.exports = {
  name: 'ready',
  async execute(client) {
    console.log(`Connected as ${client.user.username}`)
    client.user.setActivity(`con /dolar`, { type: ActivityType.Playing })

    await synchronizeSlashCommands(client,
      client.commands.map((c) => c.data),
      {
        debug: true,

      }
    )
  }
}
