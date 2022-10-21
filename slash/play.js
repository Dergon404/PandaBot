//dependencies 
const {SlashCommandBuilder} = require("@discordjs/builders")
const {EmbedBuilder} = require("discord.js")
const {QueryType} = require("discord-player")

module.exports = {
    //building the command
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Load songs from youtube")
        //loading single song
        .addSubcommand((subcommand) => subcommand
            .setName("song")
            .setDescription("Loads a single song from a url")
            .addStringOption((option) => option
                .setName("url")
                .setDescription("the song's url")
                .setRequired(true)
                )
        )
        //loading entire playlist
        .addSubcommand((subcommand) => subcommand
            .setName("playlist")
            .setDescription("Loads a playlist of songs from a url")
            .addStringOption((option) => option
                .setName("url")
                .setDescription("the playlist's url")
                .setRequired(true)
                )
        )
        //search for song
        .addSubcommand((subcommand) =>subcommand
            .setName("search")
            .setDescription("Searches for songs with given keywords")
            .addStringOption((option) => option
                .setName("search_terms")
                .setDescription("the search keywords")
                .setRequired(true)
                    )
        ),

        //executing the command
        run: async ({client, interaction}) =>{
            //check if user is in a voice channel
            if(!interaction.member.voice.channel)
                return interaction.editReply("You need to be in a VC to use this command")
            

            const queue = await client.player.createQueue(interaction.guild)
            //if bot not in vc, join vc
            if(!queue.connection) await queue.connect(interaction.member.voice.channel)

            let embed = new EmbedBuilder()

            //Command logic
            if(interaction.options.getSubcommand() === "song"){
                //search for song using url
                let url = interaction.options.getString("url").replace(" ", "")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })
                //nothing found from search
                if(result.tracks.length === 0)
                    return interaction.editReply("No results")

                const song = result.tracks[0]
                await queue.addTrack(song)
                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to the queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({text: `Duration: ${song.duration}`})
            } 
            else if(interaction.options.getSubcommand() === "playlist"){
                //search for song using url
                let url = interaction.options.getString("url").replace(" ", "")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_PLAYLIST
                })
                //nothing found from search
                if(result.tracks.length === 0)
                    return interaction.editReply("No results")

                const playlist = result.playlist
                await queue.addTracks(result.tracks)
                embed
                    .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** has been added to the queue`)
                    //.setThumbnail(playlist.thumbnail)
            } 
            else if(interaction.options.getSubcommand() === "search"){
                //search for song using url
                let url = interaction.options.getString("search_terms")
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO
                })
                //nothing found from search
                if(result.tracks.length === 0)
                    return interaction.editReply("No results")

                const song = result.tracks[0]
                await queue.addTrack(song)
                embed
                    .setDescription(`**[${song.title}](${song.url})** has been added to the queue`)
                    .setThumbnail(song.thumbnail)
                    .setFooter({text: `Duration: ${song.duration}`})
            }

            //if queue not play, start playing
            if(!queue.playing) await queue.play()
            //Send embed message
            await interaction.editReply({
                embeds: [embed]
            })
        }
}