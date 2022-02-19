const { Client, Intents, MessageEmbed } = require("discord.js");
const { token } = require("./config.json");
const status = require("minecraft-server-status");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.once("ready", () => {
  console.log("Ready!\n");

  setInterval(() => {
    status("Trianx.aternos.me", 25565, (response) => {
      var playerCount = response.players.now;

      const today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      let s = today.getSeconds();

      console.log(h + ":" + m + ":" + s + "\n" + "Player Count: " + playerCount);

      if (playerCount > 0) {
        client.user.setActivity("TrianX is Online 🟢", { type: "WATCHING" });

        console.log("Status: Online\n");
      } else {
        client.user.setActivity("TrianX is Offline ❌", { type: "WATCHING" });

        console.log("Status: Offline\n");
      }
    });
  }, 6000);
});

client.on("message", (message) => {
  status("Trianx.aternos.me", 25565, (response) => {
    var playerCount = response.players.now;
    var status = "";
    var embedColor = "";
    var motd = "This server is currently offline.";

    if (playerCount > 0) {
      status = "The Server is Online 🟢";
      embedColor = "#00ff00";
      motd = response.motd;
    } else {
      status = "The Server is Offline 🔴";
      embedColor = "#ff0000";
    }

    if (message.content === "trianx") {
      var embed = new MessageEmbed()
        .setTitle("TrianX Minecraft Server")
        .setColor(embedColor)
        .setDescription(status)
        .addField("Description", motd)
        .addField("Player Count", playerCount + " / " + response.players.max);
      message.channel.send(embed);
    }
  });
});

client.login(token);
