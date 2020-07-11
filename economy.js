const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('../config.json');
var fs = require("fs");
var path = require("path");
//fs = file save

const token = config.token;
const PREFIX = config.prefix;
const BOT_ID = config.bot_id;
const FRODO_ID = config.frodo_id;
const jsonPath = path.join(__dirname, '..', "economyUserVars.json");

let rawData = fs.readFileSync(jsonPath);
var userVars = JSON.parse(rawData);

bot.on('ready', () => {
    console.log("Economy Online (running via parent script)");
});

bot.on("message", function(msg) {
    if (msg.content.substring(0, PREFIX.length).toUpperCase() != PREFIX || msg.author.id == BOT_ID) {
        return;
    }

    let args = msg.content.substring(PREFIX.length).split(" ");
    let numArgs = args.length;

    switch (args[0]) {
        case "bal":
            msg.channel.send(":white_check_mark: <@{0}>You have {1} coins!".format(msg.author.id, userVars[msg.author.id].coins));
            break;
        case "add1":
            //If user has not been initialised, initialise them.
            if (!userVars[msg.author.id]) {
                userVars[msg.author.id] = {"coins": 0}
            }
            userVars[msg.author.id].score++;
            msg.channel.send(":white_check_mark: <@{0}>, you gained 1 coin for a total of {1} coins!".format(msg.author.id, userVars[msg.author.id].coins));
            break;
        case "save":
            let data = JSON.stringify(userVars);
            fs.writeFileSync(jsonPath, data);
            msg.channel.send(":white_check_mark: Worldwide coins saved.")
    }
});

bot.login(token);