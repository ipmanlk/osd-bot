const botCommands = require('../config/commands.json') 

const getResponse = (command) => {
    let response;
    if (botCommands[command]) {
        response = botCommands[command];
    } else {
        response = "Invalid command!";
    }
    return (response);
};

module.exports = {
    getResponse
};