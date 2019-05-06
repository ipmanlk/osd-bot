const discord = require('discord.js');
const config = require('./config');
const meanings = require('./meanings');
const commands = require('./commands');

const osdBot = new discord.Client();
const settings = config.getConfigs();

const init = () => {
    registerListeners();
    osdBot.login(settings.DISCORD_BOT_TOKEN);
};

const registerListeners = () => {

    osdBot.on('ready', () => {
        console.log(`Logged in as ${osdBot.user.tag}!`);
    });

    osdBot.on('message', msg => {
        // ignore bot msgs 
        if (msg.author.bot) return;

        //check msgs with trigger
        if ((msg.content).startsWith(settings.BOT_TRIGGER)) {
            // get word from user msg
            let word = (msg.content).split(settings.BOT_TRIGGER)[1].trim().toLocaleLowerCase();

            meanings.getMeanings(word).then(res => {
                sendBotResponse(msg, res);
            }).catch(err => {
                console.log(err);
            });
        }

        // check msgs with command trigger
        if ((msg.content).startsWith(settings.BOT_COMMAND_TRIGGER)) {
            let command = (msg.content).split(settings.BOT_COMMAND_TRIGGER)[1].trim().toLocaleLowerCase();
            let res = commands.getResponse(command);
            sendBotResponse(msg, res);
        }

    });
};

const sendBotResponse = (msg, str) => {
    msg.channel.send(formatBotResponse(str));
};

const formatBotResponse = (str) => {
    return "```" + str + "```";
};


module.exports = {
    init
};