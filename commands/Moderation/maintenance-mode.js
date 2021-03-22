const Discord = require("discord.js");
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "maintenance-mode",
  description: "Lock All The Server Channels 🔐",
  category: "moderation",
  usage: "m-mode",
  ownerOnly: true,
  aliases: ["m-mode"],
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("You don't have permissions for that!");

    const say = new MessageEmbed()
      .setTitle("Confirmation!")
      .setDescription(
        `
    Are You Sure? You Want To Enable Maintenance Mode Enable?
    `
      )
      .setFooter("You Have 2 Minutes For Answer! React On Emoji");
    const msg = await message.channel.send(say);
    await msg.react("✅");
    await msg.react("❎");
    await msg
      .awaitReactions(
        (reaction, user) =>
          user.id === message.author.id &&
          (reaction.emoji.name == "✅" || reaction.emoji.name == "❎"),
        { max: 1, time: 120000 }
      )
      .then(async collected => {
        if (collected.first().emoji.name == "✅") {
          message.channel.send(
            new MessageEmbed()
              .setTitle("✅ Success")
              .setDescription("Maintenance Mode Is Now Enabled")
          );
          
          message.guild.channels.cache.forEach(channel => channel.updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false }))
          const chm = message.guild.channels.create("maintenance-mode", {
            type: "text"
          }).then(x => 
          x.send(
            new MessageEmbed(message)
            .setTitle("Maintenance Mode | Enabled")
            .addField("Info:", `Maintenance Mode has been activated so all channels will now be locked to normal users`)
            .addField("Admin Info:", `Admins will still be able to see all of the channels in the server. This channel can removed if wanted or permissions changed however this channel will be removed when m-mode is deactivated.`)
            .setFooter("Made By Abhay", message.guild.iconURL({ dynamic: true }))
          ));
          msg.reactions.removeAll();
        
        }

        if (collected.first().emoji.name == "❎") {
          message.channel.send(
            new MessageEmbed()
              .setTitle("✅ Success")
              .setDescription("Canceled Maintenance Mode!")
          );
        }
     msg.reactions.removeAll();

      })
      .catch(e => {
        console.log(e);
        message.channel.send("Ooops! Something Went Wrong");
        msg.reactions.removeAll();

      });
  }
};
