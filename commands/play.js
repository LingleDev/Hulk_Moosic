const request = require('request')
const key = process.env.apikey
const dl = require('ytdl-core')
var queue = []
var playing = false;

module.exports.run = (bot, message, args) => {
  const params = args.join(" ");
  search(params, id => {
    play(id, message)
    playing = true
    const em = new (require('discord.js').RichEmbed)()
    .addField(`Started Playing Music`, `I started playing music in ${message.member.voiceChannel.name}.`)
    message.channel.send({embed: em})
  })
}

function search(p, c) {
  request(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(p)}&key=${key}`, (err, res, body) => {
    const json = JSON.parse(body)
    if(!json.items) return c("error!");
    
    c(json.items[0].id.videoId)
  })
}

function play(id, message) {
  var vc = message.member.voiceChannel
  vc.join().then(c => {
    stream = dl(`https://youtube.com/watch?v=${id}`, {
      filter: "audioonly"
    })
    
    var dispatch = c.playStream(stream)
    dispatch.on('end', () => {
      if (queue.length > 0 || playing == true) {
        queue.shift()
        queue.push(id)
        play(queue[0], message)
        playing = true;
      } else {
        vc.leave()
        playing = false;
        const em = new (require(`discord.js`).RichEmbed)()
        .addField(`End of Queue`, `I stopped playing music in ${vc.name}.`)
        .setTimestamp()
        .setColor("RED")
        message.channel.send({embed: em})
      }
    })
  })
}
module.exports.help = {name: "play"}
module.exports.queue = queue
