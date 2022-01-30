const TelegramBot = require('node-telegram-bot-api');
const token = '5057668685:AAFc4ELEfQFSHYQKA6aeTs2lpEtCrhafdo4';
const bot = new TelegramBot(token, {polling: true});

const BOT =  (req,res,next) => {
    console.log('salom')
    bot.sendMessage(887528138, req.postId)
}

module.exports = {
    BOT
}