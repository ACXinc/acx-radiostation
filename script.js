// 🎧 YOUR REAL STREAM FROM CASTER
let audio = new Audio("http://sapircast.caster.fm:18431/5SPef");

let isPlaying = false;

const playBtn = document.getElementById("playBtn");
const track = document.getElementById("track");

playBtn.addEventListener("click", () => {
    if (!isPlaying) {
        audio.play();
        playBtn.innerText = "⏸ Pause";
        track.innerText = "🔴 LIVE NOW";
    } else {
        audio.pause();
        playBtn.innerText = "▶ Play Live";
        track.innerText = "Paused";
    }
    isPlaying = !isPlaying;
});

// VISUALIZER
const bars = document.getElementById("bars");

for (let i = 0; i < 50; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.animationDelay = (i * 0.03) + "s";
    bars.appendChild(bar);
}