import { SlashCommandBuilder } from 'discord.js';
import { translate } from '@vitalets/google-translate-api';
// Verifique se a importação está correta

export const data = new SlashCommandBuilder()
  .setName('translate')
  .setDescription('Traduza um texto para o idioma especificado.')
  .addStringOption(option =>
    option.setName('language')
      .setDescription('Idioma para o qual você deseja traduzir')
      .setRequired(true)
  )
  .addStringOption(option =>
    option.setName('text')
      .setDescription('Texto para tradução')
      .setRequired(true)
  );

export async function execute(interaction) {
  const language = interaction.options.getString('language');
  const text = interaction.options.getString('text');

  try {
    // Realizando a tradução
    const translation = await translate(text, { to: language });

    // Respondendo com a tradução
    await interaction.reply(`**Texto Original**: ${text}\n**Tradução para ${language}**: ${translation.text}`);
  } catch (error) {
    console.error('Erro de tradução:', error);
    await interaction.reply({ content: 'Ocorreu um erro ao traduzir o texto.', ephemeral: true });
  }
}
