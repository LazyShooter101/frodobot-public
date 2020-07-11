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
    if (msg.author.id == FRODO_ID) {
        if (msg.content.substring(0, PREFIX.length).toUpperCase() != PREFIX || msg.author.id == BOT_ID) {
            return;
        }

        let args = msg.content.substring(PREFIX.length).split(" ");
        let numArgs = args.length;

        switch (args[0]) {
            case "outputUserVars":
                msg.channel.send(JSON.stringify(userVars));
                break;
            case "add1":
                //If user has not been initialised, initialise them.
                if (!userVars[msg.author.id]) {
                    userVars[msg.author.id] = {"score": 0}
                }
                userVars[msg.author.id].score++;
                break;
            case "save":
                let data = JSON.stringify(userVars);
                fs.writeFileSync(jsonPath, data);
        }
    }
});

bot.login(token);