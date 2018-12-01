/* @flow */

/**
 * This file is used for creating a websocket connection
 * emit(room, payload) is used for broadcasting a message to websockets listening in that room
 */

/**
 * [createConnection - singleton instance of IO connection]
 */
let io;
let isConnected = false;
let socket;

export function createSocketConnection(express: {app: any, io: any}) {
  io = express.io;
  io.on('connection', (connection: {emit: Function}) => {
    isConnected = true;
    socket = connection;
  });
}

// Async function
export function emit(room: string, payload: Object) {
  return isConnected ? socket.emit(room, payload) : null;
}
