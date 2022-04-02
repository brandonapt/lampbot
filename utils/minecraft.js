const mineflayer = require('mineflayer')
const fetch = require('node-fetch')
let bot
let er
async function checkForError() {
    if (er == true) return
}
try {
bot = mineflayer.createBot({
    host: 'localhost',
    username: 'lamp',
  })
  console.log('Minecraft Bot Logged In')
} catch (e) {
    console.log('An error occured.')
    er = true
    checkForError()
}



  bot.on('chat', async (username, message) => {
    if (username === bot.username) return
    if (!message.startsWith('!')) return
    if (message == '!on') {
        await fetch('http://localhost:3000/on')
        return bot.chat('Successfully turned lamp on.')
    }
    if (message == '!off') {
        await fetch('http://localhost:3000/off')
        return bot.chat('Successfully turned lamp off.')
    }
    if (message == '!logs') {
        const data = await fetch('http://localhost:3000/logs')
        const req = await data.json()
        let string = 0
        for (i in req) {
            if (string >= 4) return
            bot.chat(req[i])
            string = string + 1
        }
    }
  })