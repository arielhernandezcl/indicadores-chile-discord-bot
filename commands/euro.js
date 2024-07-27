const { EmbedBuilder } = require('discord.js')
module.exports = {

  data: {
    name: 'euro',
    description: 'Valor del euro actual en chile',
    options: []
  },
  async execute(interaction, client) {
    const EuroInsert = new EmbedBuilder().setAuthor({
      name: `Consultando precio del euro... `,
      iconURL: client.user.avatarURL()
    })
    const sent = await interaction.reply({
      embeds: [EuroInsert],
      fetchReply: true,
      ephemeral: true
    })

    const EuroDolar = await fetch('https://euro.sonix.cl/');
    const EuroData = await EuroDolar.json();
    const CurrentPrice = EuroData.Euros[0].Valor;
    const Fecha = EuroData.Euros[0].Fecha;
    
    const EuroInsertBuild = new EmbedBuilder()
      .setAuthor({
        name: `EUR /CLP - ${client.user.username} Chile`,
        iconURL: client.user.avatarURL()
      })
      .addFields(
        {
          name: 'Euro (Precio Actual)',
          value: `$${CurrentPrice}`,
        },
        {
          name: 'Fecha',
          value: Fecha,
        }
      );
    await interaction.editReply({
      embeds: [EuroInsertBuild],
      ephemeral: true
    })
  }
}
