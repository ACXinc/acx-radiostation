// ✅ USE PUBLIC STREAM (.mp3)
let audio = new Audio("http://sapircast.caster.fm:18431/5SPef.mp3");

const btn = document.getElementById("playBtn");
const track = document.getElementById("track");
const status = document.getElementById("status");
const volume = document.getElementById("volume");

volume.value = 0.7;
audio.volume = 0.7;

let playing = false;

// 🔴 HANDLE STREAM ERRORS (NO POPUP)
audio.onerror = () => {
    track.innerText = "❌ STREAM BLOCKED";
    status.innerText = "PRIVATE / OFFLINE";
};

// ▶ PLAY BUTTON
btn.onclick = () => {
    if (!playing) {
        audio.play()
            .then(() => {
                track.innerText = "🔴 LIVE";
                status.innerText = "LIVE NOW";
            })
            .catch(() => {
                track.innerText = "❌ CANNOT PLAY";
                status.innerText = "CHECK STREAM";
            });

        btn.innerText = "⏸";
    } else {
        audio.pause();
        track.innerText = "PAUSED";
        status.innerText = "PAUSED";
        btn.innerText = "▶";
    }

    playing = !playing;
};

// 🔊 VOLUME
volume.oninput = () => {
    audio.volume = volume.value;
};