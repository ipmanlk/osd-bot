const discord = require('./controllers/discord');
const telegram = require('./controllers/telegram');


const command = process.argv[2];

if (command) {
    switch (command) {
        case "discord":
            console.log("Starting Discord bot.");
            discord.init();
            break;
        case "telegram":
            console.log("Starting Telegram bot.");
            telegram.init();
            break;
        default:
            console.log("Invalid argument!.");
    }
} else {
    console.log("Please enteer an argument!.");
}
