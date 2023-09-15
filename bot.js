require("dotenv").config();
require("./command");
const { Client, GatewayIntentBits } = require("discord.js");
const { createQR } = require("./qr");
const BOT_TOKEN = process.env.BOT_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.on("ready", () => {
  console.log("ready and set");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
  if (interaction.commandName === "create") {
    const data = interaction.options.get("data").value;
    const size = interaction.options.get("size")?.value;

    await interaction.reply(createQR(data, size));
  }
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  if (msg.content.startsWith("create")) {
    const datas = msg.content.split(" ");
    const data = datas[1];
    let size = 150;
    if (datas.length > 1) {
      size = datas[2];
    }

    const reply = createQR(data, size);
    return msg.reply({
      content: reply,
    });
  }
});

client.login(BOT_TOKEN);
