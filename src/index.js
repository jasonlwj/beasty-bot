const { Client, Intents, Formatters } = require("discord.js")
const { token, welcomeChannelID, byeChannelID, notifyUserID } = require("./config")
const keepAlive = require("./server")

// Initialise the Discord client.
const client = new Client({ 
	// TODO: Use more fine-grained scopes for the intents
	intents: [
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_BANS,
	]
})

const getBanMessage = user => (
	// TODO: Include the normal username + discriminator as well
	`${Formatters.userMention(user.id)} is gone. Reduced to atoms.`
)

// Event handler for when the client is ready to start working.
client.on("ready", () => {
	console.log(`${client.user.tag} is ready to work`)
})

// Event handler for when a user joins beast's server.
client.on("guildMemberAdd", member => {
	const { user } = member

	const announceMessage = `Hey ${user.username}, welcome to **beast's server!**\n\nRemember, if you leave you will be banned.`
	const privateMessage = "Have a great time here in **beast's server**.\n\nWAIT FOR 20 MINUTES TO OPEN THE RELEASE CHANNEL!\n\nRemember, if you leave you will be banned. DM beast to go back."

	// Send a message to the #welcome channel, notifying others than the user has joined.
	client.channels
		.fetch(welcomeChannelID)
		.then(channel => channel.send(announceMessage))

	console.log(`+++++\n${user.tag} has joined the server`)

	// DM the user.
	user
		.createDM()
		.then(channel => {
			try {
				channel.send(privateMessage)
				console.log(`DM'd a welcome message to ${user.tag}`)
			} catch (error) {
				console.error(`Could not DM a welcome message to ${user.tag}`, error)
			}
		})
})

// Event handler for when a user has left/been kicked from beast's server.
client.on("guildMemberRemove", member => {
	// TODO: Timestamps, proper logging?
	console.log(`-----\n${member.user.tag} has left the server`)

	// Ban the user from the server.
	member.ban()

	const banMessage = getBanMessage(member.user)
	
	// Send a message to the #bye channel, notifying others than the user has left.
	client.channels
		.fetch(byeChannelID)
		.then(channel => channel.send(banMessage))

	// Send a message to beast.
	client.users
		.fetch(notifyUserID)
		.then(user => {
			user
				.createDM()
				.then(channel => channel.send(banMessage))

			console.log(`DM'd ${user.tag}`)
		})
	
	// TODO: Make function for sending DMs (and fix concurrency bullshit)
	// TODO: Handle edge cases e.g. ban self, ban bot
})

// Event handler for when a user is banned from a server.
client.on("guildBanAdd", ban => {
	// TODO: Send a message to the #bye channel, notifying others that the user 
	// has been banned.
	const banLog = `${ban.user.tag} has been banned from the server`
	console.log(banLog)
})

// Login to establish a WebSocket connection to Discord.
keepAlive()
client.login(token)

// Place client.login() in a try/catch and alert user if using invalid token
