const { EmbedBuilder } = require('discord.js')
module.exports = {

  data: {
    name: 'dolar',
    description: 'Valor del dolar actual en chile',
    options: []
  },
  async execute(interaction, client) {
    const DolarInsert = new EmbedBuilder().setAuthor({
      name: `Te mostrare el valor del dolar en este minuto`,
      iconURL: client.user.avatarURL()
    })
    const sent = await interaction.reply({
      embeds: [DolarInsert],
      fetchReply: true,
      ephemeral: true
    })

    const ValorDolar = await fetch('https://dolar.sonix.cl/')
    const DolarData = await ValorDolar.json()
    const CurrentPrice = DolarData[0].cp; 
    const MinPrice = DolarData[0].mp.toFixed(2);
    const MaxPrice = DolarData[0].hp;

    const DolarInsertBuild = new EmbedBuilder()

      .setAuthor({
        name: `Dolar USD/CLP - ${client.user.username} Chile`,
        iconURL: client.user.avatarURL()
      })
      .addFields(
        {
          name: 'Dólar (Precio Actual)',
          value: `$${CurrentPrice}`,
          //inline: true
        },
        {
          name: 'Dólar (Precio Minimo)',
          value: `$${MinPrice}`,
          //inline: true
        },
        {
          name: 'Dólar (Precio Maximo)',
          value: `$${MaxPrice}`,
          //inline: true
        },
      )
    await interaction.editReply({
      embeds: [DolarInsertBuild],
      ephemeral: true
    })
  }
}
