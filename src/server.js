import restify from 'restify'
import mongoose from 'mongoose'

const SERVER_PORT = process.env.SERVER_PORT

mongoose.connect(process.env.MONGODB_URL)

const server = restify.createServer({
  name: process.env.SERVER_NAME
})

const dbConnection = mongoose.connection

dbConnection.on("error", (err) => console.error("Error connecting to mongodb: ", err));

dbConnection.on("open", () => console.log("MongoDB connected"));

server.get('/', (req, res, next) => {
  console.log('home')
  res.json({message: 'hello'})
  next()
})

server.listen(SERVER_PORT, console.log(`API running on port ${SERVER_PORT}`))