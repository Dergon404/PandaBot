//dependencies 
const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Shuffles queue"),
    
    run: async({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue)
            return await interaction.editReply("There are no songs in the queue")
        
        //shuffles queue
        queue.shuffle()
        await interaction.editReply(`queue shuffled! Songs in queue: ${queue.tracks.length}`)
    }
}