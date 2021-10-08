/* eslint-disable no-undef */
require("dotenv").config()

const token = process.env["DISCORD_BOT_TOKEN"]
const notifyChannelID = process.env["NOTIFY_CHANNEL_ID"]
const notifyUserID = process.env["NOTIFY_USER_ID"]
const welcomeChannelID = process.env["WELCOME_CHANNEL_ID"]
const byeChannelID = process.env["BYE_CHANNEL_ID"]

module.exports = { 
	token, 
	notifyChannelID, 
	notifyUserID, 
	welcomeChannelID, 
	byeChannelID 
}
