const themeToggle = document.getElementById("themeToggle");

function applyTheme() {
    const theme = localStorage.getItem("theme") || "light";
    document.body.dataset.theme = theme;
}

themeToggle.addEventListener("click", () => {
    const current = localStorage.getItem("theme") || "light";
    const next = current === "light" ? "dark" : "light";
    localStorage.setItem("theme", next);
    applyTheme();
});

applyTheme();