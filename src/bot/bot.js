const TelegramBot = require('node-telegram-bot-api');
const token = '5057668685:AAFc4ELEfQFSHYQKA6aeTs2lpEtCrhafdo4';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) =>{
    bot.sendMessage(msg.chat.id, "Salom bizning sayt pressa.uz")
})

const BOT =  (req,res,next) => {
    bot.sendMessage(887528138, req.postId)
}

module.exports = {
    BOT
}