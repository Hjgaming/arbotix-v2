module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency and API ping",
  usage: "ping",
  run: async (client, message, args) => {
    message.channel.send(` My ping is... ${client.ws.ping}ms`)
  }
};