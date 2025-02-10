import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('createembed')
  .setDescription('Crie uma embed personalizada.')
  .addStringOption(option =>
    option.setName('title')
      .setDescription('Título da Embed')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('description')
      .setDescription('Descrição da Embed')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('color')
      .setDescription('Cor da Embed (em formato hex, ex: #ff5733)')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('image')
      .setDescription('URL da imagem (opcional)'))
  .addStringOption(option =>
    option.setName('footer')
      .setDescription('Texto de rodapé da Embed (opcional)'))
  .addStringOption(option =>
    option.setName('footericon')
      .setDescription('Ícone de rodapé (opcional, URL)'))
  .addStringOption(option =>
    option.setName('author')
      .setDescription('Autor da Embed (opcional)'))
  .addStringOption(option =>
    option.setName('authoricon')
      .setDescription('Ícone do autor (opcional, URL)'));

export async function execute(interaction) {
  // ID do cargo permitido
  const requiredRole = '';  // Substitua pelo ID real do cargo

  // Verifique se o membro tem o cargo específico pelo ID
  const hasRole = interaction.member.roles.cache.has(requiredRole);

  if (!hasRole) {
    return interaction.reply({
      content: 'Você não tem permissão para usar esse comando!',
      ephemeral: true,
    });
  }

  const title = interaction.options.getString('title');
  const description = interaction.options.getString('description');
  const color = interaction.options.getString('color');
  const image = interaction.options.getString('image');
  const footer = interaction.options.getString('footer');
  const footericon = interaction.options.getString('footericon');
  const author = interaction.options.getString('author');
  const authoricon = interaction.options.getString('authoricon');

  const embed = {
    title: title,
    description: description,
    color: parseInt(color.replace('#', ''), 16), // Converte para o formato hexadecimal
    image: image ? { url: image } : null,
    footer: footer ? { text: footer, icon_url: footericon } : null,
    author: author ? { name: author, icon_url: authoricon } : null,
  };

  await interaction.reply({
    content: '',
    embeds: [embed],
  });
}
