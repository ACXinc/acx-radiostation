// 🎧 STREAM
let audio = new Audio("http://sapircast.caster.fm:18431/5SPef.mp3");
audio.crossOrigin = "anonymous"; // IMPORTANT
audio.preload = "none";

const btn = document.getElementById("playBtn");
const track = document.getElementById("track");
const status = document.getElementById("status");
const volume = document.getElementById("volume");

volume.value = 0.7;
audio.volume = 0.7;

let playing = false;

// 🔴 DEBUG ERRORS
audio.addEventListener("error", (e) => {
    console.log("STREAM ERROR:", audio.error);
    track.innerText = "❌ STREAM ERROR";
    status.innerText = "LINK OR SERVER BLOCKED";
});

// ▶ PLAY BUTTON
btn.onclick = async () => {
    if (!playing) {
        try {
            await audio.play();

            track.innerText = "🔴 LIVE";
            status.innerText = "STREAMING NOW";
            btn.innerText = "⏸";

        } catch (err) {
            console.log("PLAY ERROR:", err);

            track.innerText = "❌ CANNOT PLAY";
            status.innerText = "STREAM BLOCKED / OFFLINE";
        }
    } else {
        audio.pause();

        track.innerText = "PAUSED";
        status.innerText = "PAUSED";
        btn.innerText = "▶";
    }

    playing = !playing;
};

// 🔊 VOLUME CONTROL
volume.addEventListener("input", () => {
    audio.volume = parseFloat(volume.value);
});