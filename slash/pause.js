//dependencies 
const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses music"),
    
    run: async({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue)
            return await interaction.editReply("There are no songs in the queue")
        
        //pause song
        queue.setPaused(true)
        await interaction.editReply("Music paused! use `/resume` to resume")
    }
}