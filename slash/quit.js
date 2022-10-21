//dependencies 
const {SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("Stops bot and clears queue"),
    
    run: async({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue)
            return await interaction.editReply("There are no songs in the queue")
        
        //destroys queue, automatically leaves channel when queue is empty
        queue.destroy()
        await interaction.editReply("Bye!")
    }
}