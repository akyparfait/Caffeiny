import { Client, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
import { handleButtonInteraction } from "./commands/aconselhar.js";
import { RegistrySlash, CollectionSlashs } from "./utils/loaders.js";
import translate from 'google-translate-api';
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const filePath = "./messageCounts.json"; // Caminho do arquivo de contagem de mensagens

// Comando Slash para tradução
export const data = new SlashCommandBuilder()
  .setName('translate')
  .setDescription('Traduza um texto para outro idioma.')
  .addStringOption(option =>
    option.setName('language')
      .setDescription('Idioma para traduzir')
      .setRequired(true)
  )
  .addStringOption(option =>
    option.setName('text')
      .setDescription('Texto a ser traduzido')
      .setRequired(true)
  );

// Função para realizar a tradução
export async function execute(interaction) {
  const language = interaction.options.getString('language');
  const text = interaction.options.getString('text');

  try {
    // Realiza a tradução usando a API
    const translated = await translate(text, { to: language });

    // Envia a tradução para o usuário
    await interaction.reply({
      content: `Texto traduzido para ${language}: ${translated.text}`,
      ephemeral: true, // Para que a resposta seja privada
    });
  } catch (error) {
    console.error('Erro na tradução:', error);
    await interaction.reply({
      content: 'Houve um erro ao tentar traduzir o texto.',
      ephemeral: true,
    });
  }
}

// Função para carregar a contagem de mensagens do arquivo
function loadMessageCounts() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}, null, 2), "utf8");
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error("Erro ao carregar os dados de mensagens:", err);
    return {};
  }
}

// Função para salvar a contagem de mensagens
function saveMessageCounts() {
  try {
    fs.writeFileSync(filePath, JSON.stringify(userMessages, null, 2), "utf8");
  } catch (err) {
    console.error("Erro ao salvar os dados de mensagens:", err);
  }
}

let userMessages = loadMessageCounts(); // Carregar os dados no início

client.once("ready", async () => {
  console.log(`✅ Caffeiny iniciada! Está em ${client.guilds.cache.size} servidores.`);

  // Definindo o status personalizado do bot
  client.user.setPresence({
    activities: [
      {
        name: `O café preparando`, // Texto que aparecerá como status
        type: 3, // Tipo de atividade: 3 significa "Assistindo"
      },
    ],
    status: "online", // Status do bot: online
  });

  await RegistrySlash(client.application.id);
});

// Monitorando as mensagens enviadas
client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return; // Ignora mensagens de bots ou mensagens fora de servidores

  // Comando !ping
  if (message.content === "!ping") {
    return message.reply(
      `🏓 Pong! A latência é **${Date.now() - message.createdTimestamp}ms**. A latência da API é **${Math.round(client.ws.ping)}ms**.`
    );
  }

  // Atualiza a contagem de mensagens do usuário
  const userKey = message.author.id;
  userMessages[userKey] = (userMessages[userKey] || 0) + 1;

  console.log(`[LOG] ${message.author.tag} enviou uma mensagem. Total: ${userMessages[userKey]}`);

  // Salva os dados no arquivo
  saveMessageCounts();
});

// Interações de comandos Slash
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = CollectionSlashs.get(interaction.commandName);
  if (!command) return;

  try {
    await command(interaction);
  } catch (error) {
    console.error(`Erro ao executar o comando ${interaction.commandName}:`, error);
    await interaction.reply({
      content: "Houve um erro ao executar este comando!",
      ephemeral: true,
    });
  }
});

// Mensagem de boas-vindas com Embed
client.on("guildMemberAdd", async (member) => {
  try {
    let canal = client.channels.cache.get("802594127828615242"); // Canal de boas-vindas

    // Criar a Embed
    const embed = {
      color: 0xff9457, // Cor laranja para a Embed
      title: `${member.user.username}!`,
      description: `☕ Boas-vindas ${member.user.username}!! Pegue sua xícara de café e fique à vontade! Não se esqueça de conferir o canal de regras, informações e cores do servidor.☕✨`,
      thumbnail: {
        url: member.user.displayAvatarURL({ extension: "png", size: 256 }), // Avatar do membro
      },
      footer: {
        text: `ID do Usuário: ${member.user.id}`, // ID do usuário no footer
      },
      timestamp: new Date(), // Hora de envio
    };

    // Enviar a embed para o canal de boas-vindas
    await canal.send({
      content: `${member.user.username}! 🎉`, // Mensagem simples antes da embed
      embeds: [embed], // Enviar a embed com as informações
    });

    console.log(`Embed de boas-vindas enviada para ${member.user.username}`);
  } catch (err) {
    console.error("Erro ao enviar a embed de boas-vindas:", err);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    await handleButtonInteraction(interaction);
  }
});

client.login(process.env.TOKEN);
