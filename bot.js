const Discord = require("discord.js");
const BotSettings = require("./botsettings.json");
const fs = require("fs");
let profile = require('./profile.json');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const prefix = BotSettings.prefix;
const token = BotSettings.token;

fs.readdir("./cmds/",(err,files)=>{
    if(err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0){
        console.log("No commands to load!");
    };
    console.log(`Loaded ${jsfiles.length} commands`);
    jsfiles.forEach((f,i)=>{
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}.${f} loaded`);
        bot.commands.set(props.help.name,props);
    });
});
bot.on("ready",async() =>{
    console.log(`Bot started! ${bot.user.username}`)
    /*bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
        console.log(link);
    });*/
    bot.user.setActivity("!help - for commands 🎶");
});
bot.on('guildMemberAdd', (member) => {
    let cch = member.guild.channels.find(c => c.name === "newmans");
    let crole = member.guild.roles.find('name','New Man');
    cch.send(`${member} Joined!`);
    member.addRole(crole);
});
bot.on("message",async message =>{
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let user = message.author.username;
    let userid = message.author.id;
    let randnumprofile =Math.floor(Math.random() * (4 - 1) + 1);
    if(!profile[userid]){
        profile[userid]={
            coins:10,
            reputations:0,
            wins:0,
            loses:0,
            name:`${message.author.username}`,
            xp:0,
            lvl:1,
            admin:0,
            colorprofile:randnumprofile,
            warns:0,
            likes:0,
            action1:'None',
            action2:'None',
            action3:'None',
            tobonus:0,
            coifbonus:0,
            lmsg1:'none',
            lmsg2:'none',
            lmsg3:'none',
            lmsg4:'none',
            lmsg5:'none',
            lmsg6:'none',
            lmsg7:'none',
            lmsg8:'none',
            lmsg9:'none',
            lmsg10:'none',

        };
    };
    fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
        if(err) console.log(err);
    });
    
    profile[userid].lmsg10 = `${profile[userid].lmsg9}`;
    profile[userid].lmsg9= `${profile[userid].lmsg8}`;
    profile[userid].lmsg8 = `${profile[userid].lmsg7}`;
    profile[userid].lmsg7 = `${profile[userid].lmsg6}`;
    profile[userid].lmsg6 = `${profile[userid].lmsg5}`;
    profile[userid].lmsg5 = `${profile[userid].lmsg4}`;
    profile[userid].lmsg4 = `${profile[userid].lmsg3}`;
    profile[userid].lmsg3 = `${profile[userid].lmsg2}`;
    profile[userid].lmsg2 = `${profile[userid].lmsg1}`;
    profile[userid].lmsg1 = `${message.content}`;
    fs.writeFile('./profile.json',JSON.stringify(profile),(err)=>{
        if(err) console.log(err);
    });
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
 
    if(!message.content.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot,message,args);

});
bot.login(token);