import "dotenv/config.js"

const token = process.env["DISCORD_BOT_TOKEN"]
const notifyChannelID = process.env["NOTIFY_CHANNEL_ID"]
const notifyUserID = process.env["NOTIFY_USER_ID"]

export { token, notifyChannelID, notifyUserID }