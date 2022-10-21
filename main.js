//dependencees
const {Client, GatewayIntentBits, Collection} = require("discord.js")
const dotenv = require("dotenv")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
//reading files
const fs = require("fs")
const { Player } = require("discord-player")

dotenv.config()
const TOKEN = process.env.TOKEN

/* For when we need to load and deploy the slash commands when running bot first time */
const LOAD_SLASH = process.argv[2] == "load"

const CLIENT_ID = "1032828417734869134"
//758476166976897084
//971324536521908224
const GUILD_ID = "758476166976897084"

//we can see the guild bot is in and the voice channel states within the guild
//guild is the server
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
})

client.slashcommands = new Collection()
client.player = new Player(client, {
    //youtube downloader, for streaming music
    //audio only, highest quality
    ytdlOptions:{
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

//slash commands loader
let commands = []
const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
for (const file of slashFiles){
    const slashcmd = require(`./slash/${file}`)
    client.slashcommands.set(slashcmd.data.name, slashcmd)
    //if load, push slash commands to commands array
    if(LOAD_SLASH) commands.push(slashcmd.data.toJSON())
}

//if loading slash commands (ie: node main.js load)
if(LOAD_SLASH){
    const rest = new REST({version: "9"}).setToken(TOKEN)
    console.log("Deploying slash commands")
    //applicationGuildCommands -> generates url that inserts both ids
    //insert data in body into the api code that includes those ids
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
    .then(() => {
        console.log("Successfully loaded")
        process.exit(0)
    })
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
}
//if not loading slash commands or already loaded
else{
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}`)
    })
    client.on("interactionCreate", (interaction) => {
        async function handleCommand(){
            //ignore anything that is not a slash commnad
            if(!interaction.isCommand()) return

            const slashcmd = client.slashcommands.get(interaction.commandName)
            //if command doesn't exist, reply with v
            if(!slashcmd) interaction.reply("Not a valid slash command")

            //default Discord gives 3 seconds for bot to respond
            //gives bot more time to respond to command
            //then run the actual command
            await interaction.deferReply()
            await slashcmd.run({client, interaction})
        }
        handleCommand()
    })
    client.login(TOKEN)
}