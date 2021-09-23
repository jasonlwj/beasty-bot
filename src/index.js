const { Client, Intents, Formatters } = require("discord.js")
const { token, notifyChannelID, notifyUserID } = require("./config")
const keepAlive = require("./server")

// Initialise the Discord client.
const client = new Client({ 
	intents: [
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_BANS,
	]
})

const getBanMessage = user => (
	`${Formatters.userMention(user.id)} is gone. Reduced to atoms.`
)

// Event handler for when the client is ready to start working.
client.on("ready", () => {
	console.log(`${client.user.tag} is ready to work`)
})

// Event handler for when a user has left/been kicked from the guild
client.on("guildMemberRemove", member => {
	console.log(`-----\n${member.user.tag} has left the server`)
	member.ban()

	const banMessage = getBanMessage(member.user)
	
	client.channels
    .fetch(notifyChannelID)
    .then(channel => channel.send(banMessage))

	client.users
    .fetch(notifyUserID)
    .then(user => {
      user
        .createDM()
        .then(channel => channel.send(banMessage))

      console.log(`DM'd ${user.tag}`)
    })
})

// Event handler for when a user is banned from a server.
client.on("guildBanAdd", ban => {
	const banLog = `${ban.user.tag} has been banned from the server`
	console.log(banLog)
})

// Login to establish a WebSocket connection to Discord.
keepAlive()
client.login(token)
