const API_BASE = "";

let currentVideoId = "";
let videoPlayer = null;

// Initialize
window.onload = () => {
    videoPlayer = document.getElementById("videoPlayer");
    loadVideos();
};

// Load videos list
async function loadVideos() {
    try {
        const res = await fetch(`${API_BASE}/video`);
        const data = await res.json();
        const select = document.getElementById("videoSelect");

        select.innerHTML = '<option value="">-- Select Video --</option>';

        data.videos.forEach(v => {
            const opt = document.createElement("option");
            opt.value = v.id;
            opt.textContent = v.id.toUpperCase();
            select.appendChild(opt);
        });
    } catch (error) {
        console.error("Error loading videos:", error);
    }
}

// Load metadata + video
async function loadVideoMetadata() {
    currentVideoId = document.getElementById("videoSelect").value;
    if (!currentVideoId) return;

    try {
        const res = await fetch(`${API_BASE}/video/${currentVideoId}`);
        const data = await res.json();

        document.getElementById("metadata").textContent =
            JSON.stringify(data, null, 2);

        loadVideoSource();
    } catch (error) {
        console.error("Error loading metadata:", error);
    }
}

// Load video file
function loadVideoSource() {
    if (!currentVideoId || !videoPlayer) return;

    videoPlayer.src = `/static/video/oop.mp4`;
    videoPlayer.load();
}

// Jump to time
function jumpToTime() {
    const min = parseInt(document.getElementById("minutes").value) || 0;
    const sec = parseInt(document.getElementById("seconds").value) || 0;

    videoPlayer.currentTime = min * 60 + sec;
}

// OCR
async function runOCR() {
    if (!currentVideoId) {
        alert("Select a video first");
        return;
    }

    const seconds = Math.floor(videoPlayer.currentTime);
    const resultDiv = document.getElementById("ocrResult");

    resultDiv.innerHTML = `<p>Scanning at ${seconds}s...</p>`;

    try {
        const res = await fetch(
            `${API_BASE}/video/${currentVideoId}/frame/${seconds}/ocr`
        );

        const data = await res.json();

        resultDiv.innerHTML = data.text
            ? `<div class="ocr-text">${data.text}</div>`
            : `<em>No text detected.</em>`;
    } catch (e) {
        resultDiv.innerHTML = `<p style="color:red;">OCR failed</p>`;
    }
}