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
	return res.send(logs)
})

app.listen(3000)