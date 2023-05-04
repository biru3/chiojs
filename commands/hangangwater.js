const fetch = require('node-fetch') // node-fetch 모듈을 불러옴
const { MessageEmbed } = require('discord.js') //discord.js 모듈에서 임베드를 불러옴

module.exports = {
    name: "오늘한강온도",
    async execute(message) {
        const msg = await message.channel.send({ content: "확인 중이에요..." }) //나중에 수정될 메세지
        fetch("http://hangang.dkserver.wo.tc/").then(res => res.json()).then(json => {
            if (json.result == "true") { 
                let tkdxo 
                if (json['temp'] < 18) { 
                    tkdxo = "얼어 죽겠어요!" 
                } else tkdxo = "따듯하고 좋네요." 

                const embed = new MessageEmbed() 
                    .setTitle("오늘 한강 온도")
                    .setURL("http://hangang.dkserver.wo.tc/") 
                    .setDescription(tkdxo) 
                    .setColor(0xd4b886) 
                    .setThumbnail("https://media.discordapp.net/attachments/1042692199697088542/1103706429325586512/0eaad03b3e8e6ba6.gif", ({ dynamic: true })) //임베드 우측상단에 나오는 사진
                    .addFields({ name: `오늘의 한강 온도는 ${json['temp']}도 이에요!`, value: `마지막으로 확인한 시간 : ${json['time']}` }) 
                    .setTimestamp() 

                msg.edit({ embeds: [embed], content: " " }) 
            } else { 
                return message.channel.send({ content: "오류가 발생했어요!" }); 
            }
        })
    }
}