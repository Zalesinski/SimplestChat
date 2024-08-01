function createMessageElement(message) {
    const item = document.createElement("li");
    item.textContent = `${message.username}: ${message.message}`;
    messages.appendChild(item);
}
