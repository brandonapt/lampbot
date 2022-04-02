const TwitchBot = require('twitch-bot')

// scrapped for now, idk how to get auth token


const Bot = new TwitchBot({
  username: 'Kappa_Bot',
  oauth: 'oauth:m7254kc7xyll6l10h3nmaeter6pwaf',
  channels: ['twitch']
})
 
Bot.on('join', channel => {
  console.log(`Joined channel: ${channel}`)
})
 
Bot.on('error', err => {
  console.log(err)
})
 
Bot.on('message', chatter => {
  if(chatter.message === '!test') {
    Bot.say('Command executed! PogChamp')
  }
})