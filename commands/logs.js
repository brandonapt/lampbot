const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;
const db = require('quick.db')
const discord = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('logs')
		.setDescription('get the logs of the lamp'),
	async execute(interaction, poll) {
        const mainEmbed = new discord.MessageEmbed()
            .setTitle('logs')
            .setColor("RANDOM")
        const stuff = await db.fetch('logs')
        for (const thing in stuff) {
            if (thing > 25) return
            if (stuff[thing].includes('on')) {
                mainEmbed.addField('on', stuff[thing])
            } else {
                mainEmbed.addField('off',stuff[thing])
            }
        }
        interaction.reply({ embeds: [mainEmbed] })
	},
};