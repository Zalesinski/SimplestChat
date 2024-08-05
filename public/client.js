const socket = io();

const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

const modal = document.getElementById("modal");
const submitUsernameButton = document.getElementById("submit-username");
const usernameInput = document.getElementById("username-input");

function showModal() {
    modal.style.display = "block";
}

function hideModal() {
    modal.style.display = "none";
}

showModal();

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

submitUsernameButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username) {
        socket.emit("set username", username);
        hideModal();
    }
});

usernameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const username = usernameInput.value.trim();
        if (username) {
            socket.emit("set username", username);
            hideModal();
        }
    }
});
