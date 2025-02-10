import { SlashCommandBuilder } from "discord.js";
import fs from "fs";

const roleId = "";  // ID do cargo "Membro Ativo"
const requiredMessages = 5000;  // Número de mensagens para ganhar o cargo
const filePath = "./messageCounts.json";  

// Função para carregar os dados do JSON
function loadMessageCounts() {
  if (!fs.existsSync(filePath)) return {};
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error("Erro ao carregar os dados de mensagens:", err);
    return {};
  }
}

export const data = new SlashCommandBuilder()
  .setName("membro-ativo")
  .setDescription("Atribui o cargo de 'Membro Ativo' para quem atingir o número de mensagens.")
  .addUserOption(option => option.setName("usuário").setDescription("Usuário para verificar").setRequired(false));

export async function execute(interaction) {
  const user = interaction.options.getUser("usuário") || interaction.user;
  const member = await interaction.guild.members.fetch(user.id);
  const role = interaction.guild.roles.cache.get(roleId);

  if (!role) {
    return interaction.reply({ content: "Cargo não encontrado!", ephemeral: true });
  }

  // Carregar os dados atualizados do JSON
  const userMessages = loadMessageCounts();

  // Obtém a contagem de mensagens do usuário (sem reset mensal)
  const userMessageCount = userMessages[user.id] || 0;

  if (userMessageCount >= requiredMessages) {
    if (!member.roles.cache.has(roleId)) {
      await member.roles.add(role);
      await interaction.reply({ content: `Parabéns ${user.username}! Você atingiu ${userMessageCount} mensagens e ganhou o cargo 'Membro Ativo'.`, ephemeral: true });
    } else {
      await interaction.reply({ content: `${user.username}, você já possui o cargo 'Membro Ativo'.`, ephemeral: true });
    }
  } else {
    const messagesLeft = requiredMessages - userMessageCount;
    await interaction.reply({ content: `${user.username}, você tem ${userMessageCount} mensagens. Faltam ${messagesLeft} para ganhar o cargo 'Membro Ativo'.`, ephemeral: true });
  }
}
