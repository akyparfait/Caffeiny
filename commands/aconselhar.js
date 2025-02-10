import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("aconselhar")
  .setDescription("Receba um conselho baseado na sua necessidade.");

export async function execute(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const buttons = [
      { label: "Medo", id: "socorro" },
      { label: "Problemas familiares", id: "familiar" },
      { label: "Frase motivacional", id: "motivacional" },
      { label: "Como se distrair", id: "distrair" },
      { label: "Como parar a ansiedade", id: "ansiedade" },
      { label: "Números de emergência", id: "emergencia" }
    ].map(({ label, id }) =>
      new ButtonBuilder()
        .setCustomId(id)
        .setLabel(label)
        .setStyle(ButtonStyle.Primary)
    );

    const row1 = new ActionRowBuilder().addComponents(buttons.slice(0, 5));
    const row2 = new ActionRowBuilder().addComponents(buttons.slice(5));

    await interaction.editReply({
      content: "Escolha um conselho:",
      components: [row1, row2],
    });
  } catch (error) {
    console.error("Erro ao processar a interação:", error);
  }
}

// Função para lidar com cliques nos botões
export async function handleButtonInteraction(interaction) {
  if (!interaction.isButton()) return;

  const responses = {
    socorro: [
      "Se estiver com medo, respire fundo e tente racionalizar a situação. Pergunte-se: 'O que realmente pode acontecer?'",
      "Ouça músicas relaxantes, como 'Weightless' do Marconi Union, comprovada para acalmar a mente.",
      "Acenda uma vela com um cheiro que te acalme, como lavanda ou baunilha.",
      "Foque em algo físico: aperte uma bolinha antiestresse ou um travesseiro macio.",
      "Lembre-se de que o medo é temporário. Ele só tem poder sobre você se você permitir.",
      "Assista um vídeo de um lugar tranquilo, como uma praia ao pôr do sol ou uma floresta silenciosa.",
      "Tente escrever seus medos em um papel e depois rasgue-o. Ajuda a esvaziar a mente.",
      "Conte de trás para frente de 100 a 1. Isso força o cérebro a se concentrar em outra coisa."
    ],
    familiar: [
      "Conflitos familiares são normais, tente se colocar no lugar do outro antes de responder.",
      "Às vezes, um simples 'sinto muito' pode mudar completamente uma situação tensa.",
      "Escreva o que você quer dizer antes de falar. Isso evita arrependimentos depois.",
      "Se puder, dê um abraço. O contato físico libera oxitocina e acalma os nervos.",
      "Faça uma atividade divertida com sua família, como um jogo de tabuleiro ou assistir a um filme juntos.",
      "Se as discussões forem frequentes, tente entender a raiz do problema, em vez dos sintomas.",
      "Ouça uma música que te lembre de bons momentos com sua família e tente resgatar essa sensação.",
      "Se não for possível resolver agora, saia um pouco para espairecer e retome a conversa depois."
    ],
    motivacional: [
      "Você já superou desafios antes, e pode superar este também!",
      "Toda grande jornada começa com um pequeno passo. Dê o seu hoje!",
      "O erro não define você. O que define é como você se levanta depois dele.",
      "Lembre-se: a vida é feita de momentos. Este é só um deles, e ele vai passar.",
      "Você não precisa ser perfeito, só precisa continuar tentando.",
      "Seu futuro é criado pelo que você faz hoje, não amanhã!",
      "Cada novo dia é uma nova chance de fazer melhor.",
      "As maiores conquistas da humanidade começaram com uma ideia pequena."
    ],
    distrair: [
      "Saia para uma caminhada ao ar livre, mesmo que seja por 10 minutos.",
      "Experimente um novo hobby, como desenho, escrita ou jardinagem.",
      "Assista a um filme de comédia ou uma série leve para mudar o foco.",
      "Ouça uma playlist de músicas alegres e tente cantar junto.",
      "Cozinhe algo novo. O ato de cozinhar pode ser muito terapêutico!",
      "Pegue um livro e se perca em outra realidade por um tempo.",
      "Ligue para um amigo e converse sobre coisas boas, sem focar nos problemas.",
      "Tente jogos leves como puzzles ou jogos de aventura para distrair a mente."
    ],
    ansiedade: [
      "Experimente a técnica de respiração 4-7-8: inspire por 4 segundos, segure por 7 e solte por 8.",
      "Tome um chá de camomila ou hortelã. Eles ajudam a relaxar.",
      "Escreva tudo o que está te preocupando e depois se pergunte: 'Isso realmente importa agora?'",
      "Tente alongamentos ou yoga para liberar a tensão do corpo.",
      "Aperte um cubo de gelo na mão. Isso ajuda a desviar a atenção da ansiedade.",
      "Se puder, tome um banho morno e sinta a água relaxando seus músculos.",
      "Mantenha um diário de gratidão e anote três coisas boas do seu dia.",
      "Foque no agora: olhe ao redor e descreva 5 coisas que vê, 4 que sente, 3 que ouve, 2 que cheira e 1 que saboreia."
    ],
    emergencia: [
      "**📞 Polícia Militar:** 190",
      "**🚑 SAMU:** 192",
      "**🔥 Bombeiros:** 193",
      "**📞 Central de Atendimento à Mulher:** 180",
      "**🆘 CVV (Centro de Valorização da Vida - Prevenção ao Suicídio):** 188",
      "**📞 Disque Denúncia:** 181",
      "**👶 Disque Direitos Humanos (Crianças e Idosos):** 100",
      "**📞 Atendimento a Vítimas de Violência Sexual:** 180"
    ]
  };

  // Se for "emergencia", sempre exibir a lista inteira
  if (interaction.customId === "emergencia") {
    await interaction.reply({
      content: responses["emergencia"].join("\n"),
      ephemeral: true
    });
    return;
  }

  // Selecionar uma resposta aleatória
  const respostaAleatoria = responses[interaction.customId][Math.floor(Math.random() * responses[interaction.customId].length)];

  await interaction.reply({
    content: respostaAleatoria,
    ephemeral: true
  });
}
