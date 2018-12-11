module.exports.run = (bot, message, args) => {
  const ping = Math.floor(bot.ping)
  
  const embed = new (require('discord.js').RichEmbed)()
  .setTitle("Hulk Moosic Ping Command")
  .setDescription(`PONG! My ping is ${ping}ms!`)
  .setColor("GREEN")
  .setTimestamp()
  .setFooter(`Requested by ${message.author.username}`)
  message.channel.send({embed: embed})
}

module.exports.help = {name: "ping"}
