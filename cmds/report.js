const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require('../profile.json');
module.exports.run = async (bot,message,args) => {
    function sendx (x){
        message.channel.send(x);
    };
    message.delete().catch();
    let report = message.guild.channels.find("name","reports");
    if(!args[0]) return (message.author.send("```JavaScript\nUse args!\n u/o :u - user, o - other\n for example:!report u @USER bla-bla \n !report o  I FOUND BUG!!!!```"));
    if(args[0] == 'u'){
        let Reason = args.join(" ").slice(22);
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
        if(!args[1]) return message.author.send(`Please state the user: @User`);
        if(!rUser) return message.author.send(`"${args[1]}" Not found!`);
        if(!args[2]) return message.author.send(`Please state the reason`);
        if(!Reason) return message.author.send(`Please state the reason`);
        let mg10 = profile[rUser.id].lmsg10;
        let mg9 = profile[rUser.id].lmsg9;
        let mg8 = profile[rUser.id].lmsg8;
        let mg7 = profile[rUser.id].lmsg7;
        let mg6 = profile[rUser.id].lmsg6;
        let mg5 = profile[rUser.id].lmsg5;
        let mg4 = profile[rUser.id].lmsg4;
        let mg3 = profile[rUser.id].lmsg3;
        let mg2 = profile[rUser.id].lmsg2;
        let mg1 = profile[rUser.id].lmsg1;
        let ureport = new Discord.RichEmbed()
            .setDescription("User Report")
            .setColor("#FF0000")
            .addField("Reported User: ",`${rUser}`)
            .addField("Reason: ",`${Reason}`)
            .addField("Reported by: ",`${message.author.username}`)
            .addField("Channel: ",`${message.channel}`)
            .addField('Time',message.createdAt)
            .addField('Last 10 messages reported user:',`${mg1} | ${mg2} | ${mg3} | ${mg4} | ${mg5} | ${mg6} | ${mg7} | ${mg8} | ${mg9} | ${mg10}`);
        report.send(ureport);
    }else if(args[0] == 'o'){
        let Reason = args.join(" ").slice(3);
        if(!Reason) return message.author.send('STOP');
        let osreport = new Discord.RichEmbed()
            .setDescription("Other Report")
            .setColor("#FFD008")
            .addField("Reason: ",`${Reason}`)
            .addField("Reported by: ",`${message.author.username}`)
            .addField("Channel: ",`${message.channel}`)
            .addField('Time',message.createdAt);
        report.send(osreport);
    }else message.author.send('Use "e" or "o"');
    
};
module.exports.help = {
    name: "report"
};