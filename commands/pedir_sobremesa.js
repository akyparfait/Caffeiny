import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("pedir_sobremesa")
  .setDescription("Peça uma sobremesa para você!");

export async function execute(interaction) {
  // Verifica se o usuário tem permissão para pedir sobremesa
  const member = interaction.member;
  const allowedRoles = [""]; // Substitua pelos nomes ou IDs dos cargos permitidos

  const hasRole = member.roles.cache.some(role => allowedRoles.includes(role.name) || allowedRoles.includes(role.id));

  if (!hasRole) {
    return interaction.reply({
      content: "Você não tem permissão para pedir sobremesa!",
      ephemeral: true,
    });
  }

  // Lista de URLs de GIFs de sobremesas
  const sobremesasGifs = [
    "https://i.pinimg.com/originals/b0/15/c4/b015c466727833b961c0e61d7547e21d.gif", //gif de bolo
    "https://i.pinimg.com/originals/60/60/0e/60600e13f1935e68c6a6da0642f3bc01.gif", //gif bombom 
    "https://i.pinimg.com/originals/8b/0d/b0/8b0db0773a99d4b54827d60eacabda88.gif", //gif sorvete
    "https://i.pinimg.com/originals/b8/13/a0/b813a005a41ed9a240a7d64d6512b85e.gif", //gif pudim
    "https://i.pinimg.com/originals/27/2e/61/272e61603d5e592b229219bda339a2af.gif", //gif parfait
    "https://i.pinimg.com/originals/f8/13/24/f813240bcf7a3f0797bf66ca9e24cf9e.gif", //gif torta
    "https://i.pinimg.com/originals/91/7c/d5/917cd5657b75c2f1dd778f7246062fc3.gif", //gif cookie
    "https://i.pinimg.com/originals/da/7f/a4/da7fa4cb2739dc700d5e084cbad6a04c.gif"  //gif de pudim fofo
  ];

  // Escolher um GIF aleatório da lista
  const randomGif = sobremesasGifs[Math.floor(Math.random() * sobremesasGifs.length)];

  // Enviar o GIF de sobremesa para o usuário que fez o pedido
  await interaction.reply({
    content: "Aqui está a sua sobremesa! 🍰",
    files: [randomGif],
  });
}
