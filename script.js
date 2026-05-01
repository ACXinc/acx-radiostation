// AUDIO STREAM (FREE DEMO STREAM)
let audio = new Audio("https://stream.zeno.fm/f3wvbbqmdg8uv");
let isPlaying = false;

const playBtn = document.getElementById("playBtn");
const trackText = document.getElementById("track");

playBtn.addEventListener("click", () => {
    if (!isPlaying) {
        audio.play();
        playBtn.innerText = "⏸ Pause";
        trackText.innerText = "🔴 Live Streaming...";
    } else {
        audio.pause();
        playBtn.innerText = "▶ Play Live";
        trackText.innerText = "Paused";
    }
    isPlaying = !isPlaying;
});

// VISUALIZER
const barsContainer = document.getElementById("bars");

for (let i = 0; i < 40; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.animationDelay = (i * 0.05) + "s";
    barsContainer.appendChild(bar);
}