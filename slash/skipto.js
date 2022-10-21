//dependencies 
const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("Skips to certain track number")
        .addNumberOption((option) => option
            .setName("tracknumber")
            .setDescription("The track to skip to")
            .setMinValue(1)
            .setRequired(true)
            ),
    
    run: async({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue)
            return await interaction.editReply("There are no songs in the queue")
        
        const trackNum = interaction.options.getNumber("tracknumber")
        //Check if track number is valid
        if(trackNum > queue.tracks.length)
            return await interaction.editReply("Invalid track number.")

        //skips to specified song
        queue.skipTo(trackNum-1)
        await interaction.editReply(`Skipped ahead to track number ${trackNum}!`)
    }
}