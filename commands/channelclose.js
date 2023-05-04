const {Permissions , MessageEmbed} = require('discord.js')

module.exports = {
    name:"채널닫기",
    execute(message){
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("권한이 없어요.")
        message.channel.permissionOverwrites.edit(message.guild.roles.cache.find((e) => e.name.toLowerCase().trim() === "@everyone"),{
            SEND_MESSAGES : false,
            ADD_REACTIONS : false
        })
        const date = new Date()
        const time = Math.round(date.getTime() / 1000)

        const embed = new MessageEmbed()
        .setTitle("채널을 닫았어요!")
        .setDescription("일반 유저의 메시지, 이모지 권한을 제거했어요!")
        .addFields(
            {name : "채널을 닫은 사람" , value: `${message.author}` , inline:true},
            {name : "실행된 시간", value:`<t:${time}>`,inline:true},
            {name : "채널을 다시 열려면 입력해주세요.",value : `치오야 채널열기`,inline:true}
        )
        .setColor(0xd4b886)
        .setTimestamp()
        message.channel.send({embeds : [embed]})
    }
}