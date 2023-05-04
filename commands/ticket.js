module.exports = {
    name: "문의티켓",
    async execute(message) {
        if (message.channel.type !== "GUILD_TEXT") return
        const channel = await message.guild.channels.create(`문의티켓 : ${message.author.tag}`)

        channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false
        })

        channel.permissionOverwrites.edit(message.author, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        })
        const msg = await message.reply(`**생성된 채널로 이동해주세요! ${channel}**`)
        const reactionmsg = await channel.send(`**문의하실 내용을 적어주세요! 문의를 취소하려면 ❌를 눌러주새요.**`)

        await reactionmsg.react("❌")

        const collector = reactionmsg.createReactionCollector()

        collector.on("collect", (reaction, user) => {
if(user.bot) return
            switch (reaction.emoji.name) {
                case "❌":
                    channel.send("**채널을 3초뒤에 삭제할게요!**")
                    setTimeout(() => { channel.delete() }, 3000);
                    setTimeout(() => { msg.delete() }, 3000);
                    break;
            }
        })
    }
}