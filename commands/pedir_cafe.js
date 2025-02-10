import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("pedir_café")
  .setDescription("Peça um café para você!");

export async function execute(interaction) {
  // Verifica se o usuário tem permissão para pedir café
  const member = interaction.member;
  const allowedRoles = [
    "",
    "",
    "",
    "",
    ""
  ]; // IDs dos cargos permitidos

  const hasRole = member.roles.cache.some(role => allowedRoles.includes(role.id));

  if (!hasRole) {
    return interaction.reply({
      content: "Você não tem permissão para pedir café!",
      ephemeral: true,
    });
  }

  // Lista de GIFs de café
  const coffeeGifs = [
    "https://i.pinimg.com/originals/01/c6/a8/01c6a86be666cfc459b49f2cf9b24a97.gif", 
    "https://i.pinimg.com/originals/5c/53/5a/5c535af93368c98666e3c8ee70cd8ee5.gif",
    "https://i.pinimg.com/originals/8d/30/fa/8d30fac4bf94f93d8de538d4c13b0b44.gif",
    "https://i.pinimg.com/originals/71/1d/c1/711dc17fd7dbd6e057aa27d314090e48.gif",
    "https://i.pinimg.com/originals/c4/4d/78/c44d786879b7019a69e3572ea93c898a.gif",
    "https://i.pinimg.com/originals/65/15/5c/65155c24c6a0033db647f9d09d8aa990.gif",
    "https://i.pinimg.com/originals/ce/86/3a/ce863a51972a021b73b0d9afeab0af1a.gif",
    "https://i.pinimg.com/originals/ea/b0/4e/eab04e1b1274b520410c020dcf328bb7.gif",
    "https://i.pinimg.com/originals/8e/63/64/8e63647a0407f51404be09189c3ca860.gif",
    "https://i.pinimg.com/originals/54/1e/0c/541e0c61f2617a4bfc53edd659cf9589.gif",
    "https://i.pinimg.com/originals/eb/ab/57/ebab57fd6b3604df0a907b13c1fc9c9e.gif"
  ];

  // Escolher aleatoriamente um GIF
  const randomGif = coffeeGifs[Math.floor(Math.random() * coffeeGifs.length)];

  // Enviar o GIF de café para o usuário que fez o pedido
  await interaction.reply({
    content: "Aqui está o seu café! ☕️",
    files: [randomGif],
  });
}
