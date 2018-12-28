const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot,message,args) => {
    function sendx (x){
        message.channel.send(x);
    };
    if(!message.member.hasPermission("KICK_MEMBERS")) return;
    message.delete().catch();
    let streamchannel = message.guild.channels.find("name","🎮streams🎮");
    if(!streamchannel) return sendx('streamchannel is not defined');
    streamchannel.send(`@everyone Хэй!! \nПора на стрим!! Стример подрубил! https://www.twitch.tv/kotyaxe`);
};
module.exports.help = {
    name: "stream"
};