const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const meanings = require('./meanings');
const commands = require('./commands');

const settings = config.getConfigs();
const token = settings.TELEGRAM_BOT_TOKEN;

let bot;

const init = () => {
    // Create a bot that uses 'polling' to fetch new updates
    bot = new TelegramBot(token, { polling: true });

    registerListeners();
};

const registerListeners = () => {
    bot.on('message', (msg) => {
        let msgStr = msg.text.toString();

        //check msgs with trigger
        if ((msgStr).startsWith(settings.BOT_TRIGGER)) {
            // get word from user msg
            let word = (msgStr).split(settings.BOT_TRIGGER)[1].trim().toLocaleLowerCase();

            meanings.getMeanings(word).then(res => {
                sendBotResponse(msg, `${word}: ${res}`);
            }).catch(err => {
                console.log(err);
            });
        }

        // check msgs with command trigger
        if ((msgStr).startsWith(settings.BOT_COMMAND_TRIGGER)) {
            let command = (msgStr).split(settings.BOT_COMMAND_TRIGGER)[1].trim().toLocaleLowerCase();
            let res = commands.getResponse(command);
            sendBotResponse(msg, res);
        }
    });
};

const sendBotResponse = (msg, str) => {
    bot.sendMessage(msg.chat.id, `${str}`);
};

module.exports = {
    init
};