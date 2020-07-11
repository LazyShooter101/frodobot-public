const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('../config.json');
const token = config.token;

bot.on('ready', () => {
    console.log("Economy Online (running via parent script)");
});

bot.on("message", function(msg){
    if (msg.content == "test") {
        msg.channel.send("success!");
    }
});

bot.login(token);