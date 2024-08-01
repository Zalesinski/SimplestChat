const socket = io();

const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

const username = prompt("Enter your username:");
socket.emit("set username", username);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit("chat message", input.value);
        input.value = "";
    }
});

socket.on("chat message", (message) => {
    createMessageElement(message);
});

socket.on("load messages", (messages) => {
    messages.forEach((message) => {
        createMessageElement(message);
    });
});
