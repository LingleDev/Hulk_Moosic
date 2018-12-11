const queue = require('./play.js').queue

module.exports.run = (bot, message, args) => {
  const em = new (require('discord.js').RichEmbed)()
  .addField(`Cleared the Queue`, `I cleared the song queue of ${queue.length} entries.`)
  .setTimestamp()
  .setColor("GREEN")
  message.channel.send({embed: em})
  
  queue.forEach(entry => {
    queue.pop(entry)
  })
}

module.exports.help = {name: "clear"}
