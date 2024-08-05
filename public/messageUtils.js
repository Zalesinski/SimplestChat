function createMessageElement(message) {
    const item = document.createElement("li");
    item.style.color = message.user.color;
    item.textContent = `${message.user.username}: ${message.textContent}`;
    messages.appendChild(item);
}
