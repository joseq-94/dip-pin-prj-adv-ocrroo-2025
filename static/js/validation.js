const fileInput = document.getElementById("fileInput");
const form = document.getElementById("uploadForm");

form.addEventListener("submit", (e) => {
    if (!fileInput.files.length) {
        e.preventDefault();
        alert("Please upload an image before submitting.");
        return;
    }

    const file = fileInput.files[0];
    const allowed = ["image/jpeg", "image/png"];

    if (!allowed.includes(file.type)) {
        e.preventDefault();
        alert("Only JPG and PNG files are allowed.");
        return;
    }
});