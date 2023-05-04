const { Client , Intents , Collection}  = require('discord.js')
const client = new Client({intents:32767})
const fs = require('fs')
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://chio2:ss388500@cluster0.qfjwj0c.mongodb.net/?retryWrites=true&w=majority", {
useNewUrlParser: true ,  useUnifiedTopology: true 
}).then(console.log("데이터베이스 연결 완료"))
const { prefix, token} =require('./config.json')
const { DiscordTogether } = require('discord-together')
client.discordTogether = new DiscordTogether(client);

client.once('ready',()=>{
  let number = 0
  setInterval(() => {
      const list = ["치오야 도움말", "음악 요청","문의"]
      if(number == list.length) number = 0
      client.user.setActivity(list[number],{
          type:"LISTENING"
      })
      number++
  }, 2000) //몇초마다 상태메세지를 바꿀지 정해주세요 (1000 = 1초)
  console.log("치오 START")
})

client.on('messageCreate' , message=>{
    if(message.content == "치오야"){
        message.reply("네? 무슨 일이에요.")
    }
})
client.commands = new Collection()

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandsFile){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}

client.on('messageCreate' , message=>{
    if(!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    try{
        command.execute(message,args)
    } catch (error) {
        console.error(error)
    }
})

client.on('messageCreate',message=>{
  if(message.content == `${prefix}유튜브`){
      const channel = message.member.voice.channel
      if(!channel) return message.reply("먼저 음성채널에 접속해주세요!")
      client.discordTogether.createTogetherCode(channel.id, 'youtube').then(invite =>{
          return message.channel.send(invite.code)
      })
  }
})

client.on('messageCreate',message=>{
  if(message.content == `${prefix}포커`){
      const channel = message.member.voice.channel
      if(!channel) return message.reply("먼저 음성채널에 접속해주세요!")
      client.discordTogether.createTogetherCode(channel.id, 'poker').then(invite =>{
          return message.channel.send(invite.code)
      })
  }
})

client.on('messageCreate',message=>{
  if(message.content == `${prefix}체스`){
      const channel = message.member.voice.channel
      if(!channel) return message.reply("먼저 음성채널에 접속해주세요!")
      client.discordTogether.createTogetherCode(channel.id, 'chess').then(invite =>{
          return message.channel.send(invite.code)
      })
  }
})

client.on('messageCreate',message=>{
  if(message.content == `${prefix}스케치헤드`){
      const channel = message.member.voice.channel
      if(!channel) return message.reply("먼저 음성채널에 접속해주세요!")
      client.discordTogether.createTogetherCode(channel.id, 'sketchheads').then(invite =>{
          return message.channel.send(invite.code)
      })
  }
})


client.login()
