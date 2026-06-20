const form = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");
const ocrResult = document.getElementById("ocrResult");
const downloadBtn = document.getElementById("downloadBtn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!fileInput.files.length) {
        alert("Please upload an image before submitting.");
        return;
    }

    const file = fileInput.files[0];
    const allowed = ["image/jpeg", "image/png"];

    if (!allowed.includes(file.type)) {
        alert("Only JPG and PNG files are allowed.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            alert("Error processing image.");
            return;
        }

        const data = await response.json();
        ocrResult.textContent = data.text || "No text extracted.";
        downloadBtn.disabled = !data.text;

    } catch (err) {
        console.error(err);
        alert("Unexpected error.");
    }
});

downloadBtn.addEventListener("click", () => {
    const text = ocrResult.textContent;

    if (!text || text === "No text extracted yet.") {
        alert("No text available to download.");
        return;
    }

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "ocr_result.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
});