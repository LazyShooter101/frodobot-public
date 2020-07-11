const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('../config.json');
const token = config.token;
const PREFIX = config.prefix;
const BOT_ID = config.bot_id;
const FRODO_ID = config.frodo_id;
var userVars = {};

bot.on('ready', () => {
    console.log("Economy Online (running via parent script)");
});

bot.on("message", function(msg) {
    if (msg.content == "--") {
        msg.channel.send("success!");
    }
});

bot.login(token);