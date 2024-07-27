const { EmbedBuilder } = require('discord.js')
module.exports = {

  data: {
    name: 'dolar',
    description: 'Valor del dolar actual en chile',
    options: []
  },
  async execute(interaction, client) {
    const DolarInsert = new EmbedBuilder().setAuthor({
      name: `Consultando precio del dolar... `,
      iconURL: client.user.avatarURL()
    })
    const sent = await interaction.reply({
      embeds: [DolarInsert],
      fetchReply: true,
      ephemeral: true
    })

    const ValorDolar = await fetch('https://dolar.sonix.cl/');
    const DolarData = await ValorDolar.json();
    const CurrentPrice = DolarData.Dolares[0].Valor;
    const Fecha = DolarData.Dolares[0].Fecha;
    
    const DolarInsertBuild = new EmbedBuilder()
      .setAuthor({
        name: `Dolar USD/CLP - ${client.user.username} Chile`,
        iconURL: client.user.avatarURL()
      })
      .addFields(
        {
          name: 'Dólar (Precio Actual)',
          value: `$${CurrentPrice}`,
        },
        {
          name: 'Fecha',
          value: Fecha,
        }
      );
    await interaction.editReply({
      embeds: [DolarInsertBuild],
      ephemeral: true
    })
  }
}
