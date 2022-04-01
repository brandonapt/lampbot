require('dotenv').config()
const token = process.env.token
const fs = require('node:fs');
const rlp = require("roblox-long-polling")
const express = require('express')
const db = require('quick.db')
const id = process.env.id
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});


const poll = new rlp({
    port: 5000,
});

let mainConnection

poll.on('connection', (connection) => {
    console.log('New connection', connection.id);// Will fire when a new connection is active, and include this IP address.
    mainConnection = connection

})



require('./slash')
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, poll);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});




client.login(token);

const app = express()

app.get('/logs', async function (req,res) {
	const logs = await db.get('logs')
	let array = logs
	let mainThing = []
	for (i in array) {
		mainThing.unshift(array[i])
	}
	return res.send(mainThing)
})

app.get('/off', async function (req, res) {
	poll.broadcast('switch','off')
	let str = `Lamp turned off at ${new Date()}`
	await db.push('logs',str)
	return res.sendStatus(200)
})

app.get('/on', async function (req, res) {
	poll.broadcast('switch','on')
	let str = `Lamp turned on at ${new Date()}`
	await db.push('logs',str)
	return res.sendStatus(200)
})

app.get('/clear', async function (req, res) {
	await db.set('logs',[])
	return res.sendStatus(200)
})
// Host a static file
app.use(express.static('public'))

app.listen(3000)