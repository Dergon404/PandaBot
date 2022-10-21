//dependencies 
const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Displays info about current song"),
    
    run: async({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if(!queue)
            return await interaction.editReply("There is no song playing currently.")
        
        //creating progress bar
        let bar = queue.createProgressBar({
            queue: false,
            length: 19
        })

        const song = queue.current

        //displaying embed
        await interaction.editReply({
            embeds:[new EmbedBuilder()
                .setThumbnail(song.thumbnail)
                .setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar)
            ],
        })
    }
}