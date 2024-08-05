const colorContrast = require("color-contrast");

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    const contrastRatio = colorContrast(color, "#fff");
    if (contrastRatio < 4.5) {
        return generateRandomColor();
    } else {
        return color;
    }
}

module.exports = generateRandomColor;
