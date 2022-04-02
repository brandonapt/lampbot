const noblox = require("noblox.js")
require('dotenv').config()
const cookie = process.env.cookie

async function roblox() {
    await noblox.setCookie(cookie)
    console.log(await (await noblox.getCurrentUser()).UserName)
    noblox.onMessage().on("data", function(data) {
        if (data.body.includes('on') && data.subject.includes('off')) {
            try {
                return noblox.message(data.sender.id, 'Error toggling LAMP!', 'I could not decide whether to turn the lamp on or off with the context you provided, so I did nothing! Try asking again later!')
            } catch (e) {
                console.log('could not message the user, as they dont accept dms')
            }
        }
        if (data.body.includes('off') && data.subject.includes('on')) {
            try {
                return noblox.message(data.sender.id, 'Error toggling LAMP!', 'I could not decide whether to turn the lamp on or off with the context you provided, so I did nothing! Try asking again later!')
            } catch (e) {
                    console.log('could not message the user, as they dont accept dms')
                }
        }
        if (data.subject.includes('on') || data.body.includes('on')) {
            console.log('on')
        }
        if (data.subject.includes('off') || data.body.includes('off')) {
            console.log('off')
        }
    })
}
roblox()

