const express = require("express");
const http = require("http");
const { disconnect } = require("process");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = new Map();
const messages = [];

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("A user has connected");

    socket.emit("load messages", messages);

    socket.on("disconnect", () => {
        console.log("A user has disconnected");
        // users.delete(socket.id);
    });

    socket.on("set username", (username) => {
        users.set(socket.id, username);
        socket.emit("user connected", username);
    });

    socket.on("chat message", (msg) => {
        const user = users.get(socket.id);
        const message = { username: user, message: msg };
        messages.push(message);
        io.emit("chat message", message);
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
