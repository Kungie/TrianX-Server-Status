const { Client, Intents, Application } = require("discord.js");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  console.log("Ready!");

  (async () => {
    setInterval(async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://mcsrvstat.us/server/Trianx.aternos.me");

      const pageData = await page.evaluate(() => {
        return {
          html: document.documentElement.innerHTML,
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
        };
      });

      const $ = cheerio.load(pageData.html);

      const status = $("td");

      await browser.close();

      if (status.text().includes("Offline")) {
        console.log("Server is Offline");
        client.user.setActivity("Server is Offline 🔴", { type: "WATCHING" });
      } else {
        console.log("Server is Online");
        client.user.setActivity("Server is Online 🟢", { type: "WATCHING" });
      }
    }, 6000);
  })();
});

client.login(token);
