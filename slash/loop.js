//dependencies 
const {SlashCommandBuilder} = require("@discordjs/builders")
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Loop current song or the queue")
        .addSubcommand((subcommand) => subcommand
            .setName("off")
            .setDescription("Turns off loop mode")
        )
        .addSubcommand((subcommand) => subcommand
            .setName("song")
            .setDescription("Loops current song")
        )
        .addSubcommand((subcommand) => subcommand
            .setName("queue")
            .setDescription("Loops the queue")
        ),
    
    run: async({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue)
            return await interaction.editReply("There are no songs in the queue")
        
        if(interaction.options.getSubcommand() === "off"){
            queue.setRepeatMode(QueueRepeatMode.OFF);
            await interaction.editReply("Loop turned off!")
        }
        else if(interaction.options.getSubcommand() === "song"){
            queue.setRepeatMode(QueueRepeatMode.TRACK);
            await interaction.editReply("Current song is looping!")
        }
        else if(interaction.options.getSubcommand() === "queue"){
            queue.setRepeatMode(QueueRepeatMode.QUEUE);
            await interaction.editReply("Queue is looping!")
        }
    }
}