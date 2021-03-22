const { MessageEmbed, version: djsversion } = require("discord.js");
const { utc } = require("moment");
const version = "1.0.0";
const os = require("os");
const ms = require("ms");
module.exports = {
  name: "botinfo",
  description: "Get bot information",
  usage: "botinfo",
  category: "info",
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setAuthor(
        `Information about the ${message.client.user.username} Bot`,
        `
        ${message.client.user.displayAvatarURL()}`
      )
      .addField("💻 Bot Name", `\`\`\`${message.client.user.username}\`\`\``)
      .addField("💻 Bot Owner", `\`\`\`INCASX丶HJ GAMING\`\`\``)
      .addField("💻 Bot Developer ", `\`\`\`INCASX丶Pikachu\`\`\``)
      .addField(
        "💻 Total Server ",
        `\`\`\`${client.guilds.cache.size}\`\`\``,
        true
      )
      .addField(
        "💻 Total Channel",
        `\`\`\`${client.channels.cache.size}\`\`\``,
        true
      )

      .addField(
        "💻 Total Users",
        `\`\`\`${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()}\`\`\``,
        true
      )

      .addField("💻 Bot Library", `\`\`\`discord.js\`\`\``)
      .addField(
        "💻 Invite Link Below",
        `[Invite](https://discord.com/api/oauth2/authorize?client_id=479688142908162059&permissions=8&scope=bot)
     `
      )
      .setImage(`${message.client.user.displayAvatarURL()}`)
      .setColor("RANDOM");

    message.channel.send(embed);
  }
};
