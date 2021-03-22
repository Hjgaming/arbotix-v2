const discord = require("discord.js");
module.exports = {
  name: "invite",
      category: "info",
  discription: "get bot invite link ",
      usage: "invite",

  run: async (client, message, args) => {
    const embed = new discord.MessageEmbed()

      //ok
      .setColor("ff1000")
      .addField("Add me on Your server","[Click here](https://discord.com/oauth2/authorize?client_id=769974477185744937&permissions=8&scope=bot)")

      .setThumbnail("")
      .setImage("")

      .setFooter(
        `REQUESTED BY ${message.author.tag}`,
        `${message.author.displayAvatarURL({ dynamic: true })}`
      )
      .setTimestamp();

    message.channel.send(embed);
  }
};
