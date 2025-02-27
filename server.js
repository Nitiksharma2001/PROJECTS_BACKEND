import 'dotenv/config'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { chessSockets } from './sockets/chess.js'

const app = express()
const server = createServer(app)
const io = new Server(server, { cors: [process.env.FRONTEND_URL] })

io.on('connection', (socket) => chessSockets(io, socket))

server.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})
