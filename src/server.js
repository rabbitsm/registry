import restify from 'restify'
import mongoose from 'mongoose'

import ItemController from './controllers/ItemController'

const SERVER_PORT = process.env.SERVER_PORT

mongoose.connect(process.env.MONGODB_URL)

const server = restify.createServer({
  name: process.env.SERVER_NAME
})

const dbConnection = mongoose.connection

dbConnection.on("error", (err) => console.error("Error connecting to mongodb: ", err));

dbConnection.on("open", () => console.log("MongoDB connected"));

server.use(restify.plugins.bodyParser())

server.get('/', (req, res, next) => {
  console.log('home')
  res.json({message: 'hello'})
  next()
})

server.post('/item', ItemController.create)
server.get('/item/:name', ItemController.read)
server.get('/item/:name/:version', ItemController.read)

server.listen(SERVER_PORT, console.log(`API running on port ${SERVER_PORT}`))