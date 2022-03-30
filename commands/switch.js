const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;
const db = require('quick.db')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('switch')
		.setDescription('switches the lamp on and off')
        .addStringOption(option =>
            option.setName('switch')
                .setDescription('what should i do')
                .setRequired(true)
                .addChoice('on', 'on')
                .addChoice('off', 'off')),
	async execute(interaction, mainConnection) {
       
		await interaction.reply('turning lamp ' + interaction.options.getString('switch'))
        mainConnection.send('switch', interaction.options.getString('switch'))
        let str = `Lamp turned ${interaction.options.getString('switch')} at ${new Date()}`
        console.log(str)
        await db.push('logs',str)
        await wait(1500)
        await interaction.followUp('done')
	},
};