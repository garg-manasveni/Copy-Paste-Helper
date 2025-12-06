const textBox = document.getElementById("textBox");
const copyBtn = document.getElementById("copyBtn");
const pasteBtn = document.getElementById("pasteBtn");
const statusMsg = document.getElementById("status");

const themeToggle = document.getElementById("themeToggle");

const copySound = document.getElementById("copySound");
const pasteSound = document.getElementById("pasteSound");

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

copyBtn.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(textBox.value);
        showStatus("Copied!", "limegreen");
        copySound.play();
    } catch (error) {
        showStatus("Copy Failed", "red");
    }
});

pasteBtn.addEventListener("click", async () => {
    try {
        const text = await navigator.clipboard.readText();
        textBox.value = text;
        showStatus("Pasted!", "orange");
        pasteSound.play();
    } catch {
        showStatus("Paste Blocked", "red");
    }
});

function showStatus(message, color) {
    statusMsg.textContent = message;
    statusMsg.style.color = color;

    setTimeout(() => {
        statusMsg.textContent = "";
    }, 2000);
}


themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
    applyTheme(newTheme);
});


function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark", "dark-mode");
        document.body.classList.remove("light-mode");
    } else {
        document.body.classList.remove("dark", "dark-mode");
        document.body.classList.add("light-mode");
    }
    localStorage.setItem("theme", theme);
}
