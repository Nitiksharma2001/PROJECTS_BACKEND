import { v4 as uuidv4 } from 'uuid'
const room_ids = {}
const global_colors = ['w', 'b']

export function chessSockets(io, socket) {
  socket.on('find-player', () => {
    const values = Object.entries(room_ids).find(([_, sockets]) => sockets.length == 1)
    const new_room_id = uuidv4()
    if (!values) {
      return (room_ids[new_room_id] = [socket])
    }
    const [room_id, sockets] = values
    const both_player = [socket, ...sockets]
    const first_value = Math.round(Math.random())
    const colors = [global_colors[first_value], global_colors[1 - first_value]]
    both_player.forEach((player, i) => player.emit('match-start', colors[i]))
    delete room_ids[room_id]
  })

  socket.on('chess-move', (updatedFen) => {
    socket.broadcast.emit('new-fen', updatedFen)
  })
}
