import express from "express"

const server = express()

server.all("/", (req, res) => {
  res.send("Your bot is alive!")
})

const keepAlive = () => {
  server.listen(3000, () => {
		console.log("Server is Ready!")
	})
}

export default keepAlive
