import { lstatSync, readdirSync } from "fs";
import { config } from "dotenv";
import { REST, Collection, Routes } from "discord.js";

config();

const APICONNECTION = new REST().setToken(process.env.TOKEN);
const SlashCommandsArray = [];
export const CollectionSlashs = new Collection();

async function loadSlashCommands(path) {
  for (const file of readdirSync(path)) {
    if (lstatSync(`${path}/${file}`).isDirectory()) {
      await loadSlashCommands(`${path}/${file}`);
    } else {
      if (file.endsWith(".js")) {
        const { data, execute } = await import(`../${path}/${file}`);

        if (data && execute) {
          SlashCommandsArray.push(data.toJSON()); // Garante que está no formato correto
          CollectionSlashs.set(data.name, execute);
          console.log(`✅ Comando carregado: ${data.name}`);
        } else {
          console.warn(`⚠️ O arquivo ${file} não exporta 'data' ou 'execute'.`);
        }
      }
    }
  }
}

export async function RegistrySlash(ID) {
  try {
    await loadSlashCommands("commands"); // Garante que os comandos são carregados antes do registro

    const commands = await APICONNECTION.put(Routes.applicationCommands(ID), {
      body: SlashCommandsArray,
    });

    console.log(`✅ ${commands.length} SlashCommands registrados.`);
  } catch (err) {
    console.error("Erro ao registrar comandos Slash:", err);
  }
}
