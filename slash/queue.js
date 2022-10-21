//dependencies 
const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("displays the current song queue")
        //pagination
        .addNumberOption((option) => option
            .setName("page")
            .setDescription("Page number of the queue")
            .setMinValue(1)
        ),

    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)
        //checks if something is in queue
        if(!queue || !queue.playing){
            return await interaction.editReply("There are no songs in the queue")
        }

        //each page will have 10 songs, round up if not perfect divide; other wise 1 page
        const totalPages = Math.ceil(queue.tracks.length/10) || 1
        //get page number; if null return default 1
        const page = (interaction.options.getNumber("page") || 1)

        if(page > totalPages)
            return await interaction.editReply(`Invalid Page. There are only a total of ${totalPages} of songs`)

        //displaying page of queue
        //display the 10 songs after the start of the page
        const queueString = queue.tracks.slice(page * 10, page*10+10).map((song, i) => {
            return `**${page*10+i+1}.** \`${song.title} -- <@${song.requestedBy.id}>`
        }).join("\n")

        const currentSong = queue.current

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`**Currently Playing**\n` + 
                    (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "None") +
                    `\n\n**Queue**\n${queueString}`
                    )
                    .setFooter({
                        text: `Page ${page} ${totalPages}`
                    })
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
    }
}