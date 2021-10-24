const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    },
});

io.on("connection",(socket) => {
    console.log(`${new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()} [Server] A client has connected!`);

    socket.on("message_send",(data) => {
        socket.to(data.room).emit("message_recieve",data);
    })

    socket.on("disconnect",() => {
        console.log(`${new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()} [Server] Client disconnected.`);
    })

});

server.listen(3001,() => {
    console.log(`${new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()} [Server] Server has started.`);
})