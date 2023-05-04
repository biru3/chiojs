const {Permissions , MessageEmbed} = require('discord.js')

module.exports = {
    name:"채널열기",
    execute(message){
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("권한이 없어요.")
        message.channel.permissionOverwrites.edit(message.guild.roles.cache.find((e) => e.name.toLowerCase().trim() === "@everyone"),{
            SEND_MESSAGES : true,
            ADD_REACTIONS : true
        })
        const date = new Date()
        const time = Math.round(date.getTime() / 1000)

        const embed = new MessageEmbed()
        .setTitle("채널을 열었어요!")
        .setDescription("일반 유저의 메시지, 이모지 권한을 허용했어요!")
        .addFields(
            {name : "채널을 열은 사람" , value: `${message.author}` , inline:true},
            {name : "명령어가 실행된 시간", value:`<t:${time}>`,inline:true},
            {name : "채널을 다시 닫고싶다면?",value : `!채널닫기`,inline:true}
        )
        .setColor(0xd4b886)
        .setTimestamp()
        message.channel.send({embeds : [embed]})
    }
}