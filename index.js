import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

const configureConnectionMonitor = (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected')
    });
}

const configureChat = (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
}

const configureNickname = (socket) => {

}

io.on('connection', (socket) => {
    configureConnectionMonitor(socket);
    configureChat(socket);
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});