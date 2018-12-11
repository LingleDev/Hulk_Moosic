module.exports.run = (bot,message,args) => {
  const vc = message.guild.me.voiceChannel
  if (!vc) return message.channel.send("I am not playing music or in a voice channel.");
  
  vc.leave()
  message.channel.send("I stopped playing music in %s.".replace("%s", vc.name))
}

module.exports.help = {name: "stop"}
