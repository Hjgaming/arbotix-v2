const ms = require("ms");
const moment = require("moment");
const discord = require("discord.js");
const client = new discord.Client({
  disableEveryone: true // what does this disable thing do?
});

module.exports = {
  name: "uptime",
  category: "info",
  description: "uptime",
  usage: "uptime",
  run: async (client, message, args) => {
    message.channel.send("My uptime is " + `${ms(client.uptime)}`);
  }}