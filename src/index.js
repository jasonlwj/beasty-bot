const { Client, Intents } = require("discord.js")
const { token } = require("./config")
const keepAlive = require("./server");

// Initialise the Discord client.
const client = new Client({ 
	intents: [
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_BANS,
	]
})

// Return the tag (e.g. Koda#2956) of the given user.
const getUserTag = user => {
	const { username, discriminator } = user
	return `${username}#${discriminator}`
}

// Event handler for when the client is ready to start working.
client.on("ready", () => {
	console.log(`${client.user.tag} is ready to work`)
})

// Event handler for when a user has left/been kicked from the guild
client.on("guildMemberRemove", member => {
	console.log(`${getUserTag(member.user)} has left the server`)
	member.ban()
});

// Event handler for when a user is banned from a server.
client.on("guildBanAdd", ban => {
	console.log(`${getUserTag(ban.user)} has been banned from the server`)
})

// Login to establish a WebSocket connection to Discord.
keepAlive()
client.login(token)
