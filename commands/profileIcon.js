import { SlashCommandBuilder } from "discord.js";

// Lista de cargos permitidos
const allowedRoles = [""]; // IDs dos cargos permitidos

// Frases aleatórias
const cutePhrases = [
  "Que belo ícone!",
  "Que ícone interessante!",
  "Seu ícone é encantador!",
  "Amando esse ícone!",
  "Que estilo no ícone!",
];

const data = new SlashCommandBuilder()
  .setName("profileicon")
  .setDescription("Veja o ícone de perfil de um usuário!")
  .addUserOption((option) =>
    option.setName("usuário").setDescription("Selecione um usuário").setRequired(true)
  );

const execute = async (interaction) => {
  const member = interaction.options.getMember("usuário");

  // Verifica se o usuário tem permissão para usar o comando
  if (!interaction.member.roles.cache.some(role => allowedRoles.includes(role.id))) {
    return interaction.reply({
      content: "Você não tem permissão para usar este comando.",
      ephemeral: true,
    });
  }

  // Obtém o avatar do usuário
  const avatarURL = member.user.displayAvatarURL({ size: 2048, dynamic: true });
  const randomPhrase = cutePhrases[Math.floor(Math.random() * cutePhrases.length)];

  // Cria o embed com o link de download dentro
  const embed = {
    color: 0xf39c12,
    title: `${member.user.tag}'s Avatar`,
    description: randomPhrase,
    image: {
      url: avatarURL,
    },
    footer: {
      text: "Clique no link acima para baixar o ícone.",
    },
    fields: [
      {
        name: "Nick:",
        value: member.displayName,
      },
      {
        name: "Baixar ícone:",
        value: `[Clique aqui para baixar o ícone]( ${avatarURL} )`,
      },
    ],
  };

  // Verifica se já respondeu à interação
  if (!interaction.replied) {
    await interaction.reply({
      content: ``,
      embeds: [embed],
    });
  } else {
    console.log("Interação já foi respondida.");
  }
};

export { data, execute };
