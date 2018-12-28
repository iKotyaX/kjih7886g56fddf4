
const Discord = module.require("discord.js");
const fs = require("fs");
const fsn = require('fs-extra');
const { Canvas } = require('canvas-constructor');
const request = require('request');
let profile = require('../profile.json');
module.exports.run = async (bot,message,args) => {
    function send (x){
        message.channel.send(x);
    };

    let user = message.author.username;
    let userid = message.author.id;
    let rand = profile[userid].colorprofile;
    let uCoins = profile[userid].coins;
    let uRep = profile[userid].reputations;
    let uWins = profile[userid].wins;
    let act1 = profile[userid].action1;
    let act2 = profile[userid].action2;
    let act3 = profile[userid].action3;
    let uAdmin = profile[userid].admin;
    let ulvl = profile[userid].lvl;
    let name = message.author.username;
    let clor;
    if(rand == 1){
        clor = '#52cb94'
    }else if(rand == 2){
        clor = '#c34ba5'
    }else if(rand == 3){
        clor = '#57a2d6'
    }else if(rand == 4){
        clor = '#8f52c8'
    }
    let isadmin
    if(uAdmin == 1){
        isadmin = 'Administrator'
    }else(isadmin = 'User');
    var url = message.member.user.displayAvatarURL;
        const image = await fsn.readFile(`./profile${rand}.png`);
        request({ url, encoding: null }, function(err, response, buffer) {
            const ThisNiceImage = new Canvas(300, 600)
                .setColor('#000000')
                .addImage(buffer, 90, 70, 120, 120)
                .addImage(buffer, 3, 335, 80, 80)
                .addImage(buffer, 3, 425, 80, 80)
                .addImage(buffer, 3, 515, 80, 80)
                .addImage(image, 0, 0, 300, 600)
                .setTextFont('25px Gotham Pro Black')
                .setTextAlign('center')
                .setColor('#ffffff')
                .addText(ulvl, 150, 40)
                .setTextFont('24px Gotham Pro Medium')
                .setTextAlign('center')
                .setColor('#ffffff')
                .addText(name, 150, 210)
                .setTextFont('24px Gotham Pro Light')
                .setColor(clor)
                .addText(isadmin, 150, 255)
                .setTextFont('19px Gotham Pro Light')
                .setColor('#f7f7f7')
                .addText('Coins', 45, 320)
                .addText('Reputation', 151, 318)
                .addText('Wins', 255, 320)
                .setTextFont('19px Gotham Pro Medium')
                .setColor('#f7f7f7')
                .addText(uCoins, 45, 290)
                .addText(uWins, 255, 290)
                .setTextFont('20px Gotham Pro Medium')
                .addText(uRep, 151, 290)
                .setTextFont('19px Gotham Pro Black')
                .setTextAlign('start')
                .setColor('#302e2e')
                .addText(name, 100, 360)
                .addText(name, 100, 450)
                .addText(name, 100, 540)
                .setTextFont('13px Gotham Pro Light')
                .setTextAlign('start')
                .setColor('#302e2e')
                .addText(act1, 90, 380)
                .addText(act2, 90, 470)
                .addText(act3, 90, 560)              
                .toBuffer();
        
            send({files: [{attachment: ThisNiceImage, name: "image.png"}]});
        });

};
module.exports.help = {
    name: "profile"
};