const { Permissions , MessageActionRow , MessageSelectMenu , MessageEmbed} = require('discord.js')
module.exports = {
    name:"추방",
    async execute(message){
        if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("권한이 없어요.")
        const member = message.mentions.members.first()
        if(!member) return message.reply("해당 유저를 멘션해주세요.")
        
        const menu = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId("select")
            .setPlaceholder("옵션을 선택해주세요")
            .addOptions([{
                label:"킥",description:"추방",value:"킥"
            },{
                label:"밴",description:"영구추방",value:"밴"
            },])
        )
        let embed = new MessageEmbed()
        .setTitle("킥/밴")
        .setDescription("두가지 옵션중 하나를 선택해주세요.")
        .setColor(0xd4b886)
        .setTimestamp()

        const sendmsg = await message.channel.send({ embeds : [embed] , components : [menu]})
        const embed1 = new MessageEmbed()
        .setTitle("해당을 유저를 추방했어요.")
        .setDescription(`${member}\n님이 : ${message.author}님의 의해 추방되었어요.`)
        .setTimestamp()
        .setColor(0xd4b886)
        .setImage("https://media.discordapp.net/attachments/919541578534637598/1103696663421395055/R.gif")

        const embed2 = new MessageEmbed()
        .setTitle("해당 유저를 밴했어요")
        .setDescription(`${member}\n님이 ${message.author}님의 의해 추방되었어요.`)
        .setTimestamp()
        .setColor(0xd4b886)
        .setImage("https://media.discordapp.net/attachments/919541578534637598/1103696663421395055/R.gif")

        const collector = message.channel.createMessageComponentCollector({
            componentType:"SELECT_MENU",
            time:60000
        })
        collector.on('collect', collected =>{
            const value = collected.values[0]
            if(collected.member.id !== message.author.id) return 
            if(value == "킥"){
                member.kick().then().catch((error)=>{
                    message.reply(`오류가 발생했어요. ${error}`)
                })
                sendmsg.edit({embeds : [embed1]})
            }
            if(value == "밴"){
                member.ban().then().catch((error)=>{
                    message.reply(`오류가 발생했어요. ${error}`)
                })
                sendmsg.edit({embeds : [embed2]})
            }
        })

    }
}