const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot,message,args) => {
    function send (x){
        message.channel.send(x);
    };
    
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("This is a user info!")
        .setColor("8833A4")
        .addField("Username",`${message.author.tag}`)
        .addField("ID", message.author.id)
        .addField("Created at:",message.author.createdAt)
    send(embed);
};
module.exports.help = {
    name: "userinfo"
};