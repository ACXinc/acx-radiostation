let audio = new Audio("http://sapircast.caster.fm:18431/5SPef");

const btn = document.getElementById("playBtn");
const track = document.getElementById("track");
const status = document.getElementById("status");
const volume = document.getElementById("volume");

volume.value = 0.7;
audio.volume = 0.7;

let playing = false;

btn.onclick = () => {
    if (!playing) {
        audio.play()
            .then(() => {
                track.innerText = "🔴 LIVE";
                status.innerText = "LIVE NOW";
            })
            .catch(() => {
                track.innerText = "OFFLINE";
                status.innerText = "STREAM OFFLINE";
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

volume.oninput = () => {
    audio.volume = volume.value;
};