const discord = require("discord.js");
const { Client, Collection } = require("discord.js");
const config = require("./config.json");

const client = new Client({
  disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map();

client.on("ready", () => {
  console.log(`${client.user.username}Bot online!`); // Configure if u want
  setInterval(() => {
    const statuses = [
      `${client.guilds.cache.size} servers`,
      `${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()} members`,
      `${config.prefix}help`,
      "Join Support Server"
    ];

    const status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, { type: "WATCHING" });
  }, 10000);
  //It will set status :)
});
//mongo

const db = require("quick.db");

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.queue = new Map();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  let prefix = config.prefix;

  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // If a command is finally found, run the command
  if (command) command.run(client, message, args);
});

//tag
client.on("message", async message => {
  let prefix = config.prefix;

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>`))) {
    return message.channel.send(`Bot Prefix : \`${prefix}\``);
  }
});

//welcome

client.on("message", async message => {
  if (message.content === "$welcome") {
    client.emit("guildMemberAdd", message.member);
  }
});

const canvas = require("discord-canvas");
const welcomeCanvas = new canvas.Welcome();

let a = "#ff0000";

client.on("message", async message => {
  if (message.content === "!!welcome") {
    client.emit("guildMemberAdd", message.member);
  }
});

client.on("guildMemberAdd", async member => {
  let welcomeChannel = db.fetch(`welcome_${member.guild.id}`);
  if (welcomeChannel === null) return;

  let joinMsg = db.fetch(`joinmsg_${member.guild.id}`);
  if (joinMsg === null) {
    db.set(
      `joinmsg_${member.guild.id}`,
      `Welcome {member:mention}! We now have {server:members} member!`
    );
  }

  let newJoinMsg = db.fetch(`joinmsg_${member.guild.id}`);
  let content = newJoinMsg
    .replace(/{member:mention}/g, `<@${member.user.id}>`)
    .replace(/{member:name}/g, `${member.user.username}`)
    .replace(/{member:id}/g, `${member.user.id}`)
    .replace(/{member:tag}/g, `${member.user.tag}`)
    .replace(/{member:createdAt}/g, `${member.user.createdAt}`)
    .replace(/{server:name}/g, `${member.guild.name}`)
    .replace(/{server:members}/g, `${member.guild.members.cache.size}`);

  let welcome = await welcomeCanvas
    .setUsername(member.user.username)
    .setDiscriminator(member.user.discriminator)
    .setMemberCount(member.guild.memberCount)
    .setGuildName(`${member.guild.name}`)
    .setAvatar(member.user.displayAvatarURL({ format: "png" }))

    .setColor("border", "#8015EA")
    .setColor("username-box", "#8015EA")
    .setColor("discriminator-box", "#8015EA")
    .setColor("message-box", "#8015EA")
    .setColor("title", "#8015EA")
    .setColor("avatar", "#8015EA")

    .setBackground(
      "https://media.discordapp.net/attachments/743111735178952834/794106546660573184/pexels-photo-114979.png"
    )
    .toAttachment();

  let attachment = new discord.MessageAttachment(
    welcome.toBuffer(),
    "welcome.png"
  ); //attachment  its requir buffer
  member.guild.channels.cache.get(welcomeChannel).send(content, attachment);
});

client.config = config;

const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉"
  }
});
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on(
  "giveawayReactionAdded",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
    client.channels.cache
      .get("814881567125536789")
      .send(
        `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
      );
    //`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
  }
);

client.giveawaysManager.on(
  "giveawayReactionRemoved",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
    client.channels.cache
      .get("814881567125536789")
      .send(
        `${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`
      );
  }
);

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  console.log(
    `Giveaway #${giveaway.messageID} ended! Winners: ${winners
      .map(member => member.user.username)
      .join(", ")}`
  );
  client.channels.cache
    .get("814881567125536789")
    .send(
      `Giveaway #${giveaway.messageID} ended! Winners: ${winners
        .map(member => member.user.username)
        .join(", ")}`
    );
});

client.login(process.env.TOKEN);
