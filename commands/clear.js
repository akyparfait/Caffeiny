import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("clear")
  .setDescription("Apagar mensagens de um canal")
  .addIntegerOption(option =>
    option.setName("quantidade")
      .setDescription("Número de mensagens para apagar")
      .setRequired(true)
      .setMinValue(1)
      .setMaxValue(100)
  );


const requiredRoleId = ""; // Substituir pelo ID do cargo


export async function execute(interaction) {

  const quantidade = interaction.options.getInteger("quantidade");


  const channel = interaction.channel;


  if (!interaction.member.roles.cache.has(requiredRoleId)) {
    return await interaction.reply({
      content: "Você não tem permissão para usar este comando.",
      ephemeral: true,
    });
  }


  if (channel.isTextBased()) {
    try {
 
      const messages = await channel.messages.fetch({ limit: quantidade });
      await channel.bulkDelete(messages, true);
      await interaction.reply({ content: `Apaguei **${quantidade}** mensagens!`, ephemeral: true });
    } catch (error) {
      console.error("Erro ao apagar mensagens:", error);
      await interaction.reply({
        content: "Ocorreu um erro ao tentar apagar as mensagens.",
        ephemeral: true,
      });
    }
  } else {
    await interaction.reply({
      content: "Este comando só pode ser usado em canais de texto!",
      ephemeral: true,
    });
  }
}
