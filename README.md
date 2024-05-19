# PandaBot

Simple discord music bot that can play music links

Has the methods /play, /pause, /resume, /loop, /shuffle, /skip, /skipto, /info, /queue, /quit

Uses Discord Player API:https://discord-player.js.org/docs/main/master/general/welcome

Currently only tested Youtube videos and streams, **can not work with youtube content that is age-restricted for 18+**, will try to fix in a later release tho

<br />

### Requirements to run
- You will need a "GUILD_ID" (found under server settings -> widgets -> ServerID)
- The "CLIENT_ID" (which can be found by right-clicking discord bot in server --> Copy ID
- Finally, the "TOKEN", which is the most important part. With the creation of any bot, discord in the last couple of years has made it more challenging to look at a bot's token once created.
  With that in mind, you must copy the token and put it in a safe place, otherwise, if you leave that page, then you will need to reset the token again

Create a .env file that has "TOKEN=BOT_TOKEN_HERE", with your bot token

To run, make sure you have all dependenices, execute run.bat(Windows) or run.sh(Linux)


## Updates
- The newer version of this code will have all these command modes refixed and updated to the latest versions.
- Current node version will be Node.js Version 22.10

## Better method of running
- If on a linux host machine, the best way I figured out how to run these pesky background processes is with a command (not pre-installed btw) called 'screen'.
- You can set up an instance of a terminal with a command like
```bash
screen -S ${PID_HERE}
```
, then cd into the bots directory, run the node.js run commands, then do "CTRL + A, D" (While holding control, tap A, not hold, then tap D and release control too).
- To go back into this process just run
```bash
screen -r ${PID_FROM_EARLIER_HERE}
```
to reopen that session with the bot.

<br />
## Credits
Original Creater/Coder done by the amazing [AlphaMiyaL](https://github.com/AlphaMiyaL)
Current maintainer of code (as of May 2024) done by [me, Dergon404](https://github.com/Dergon404)
