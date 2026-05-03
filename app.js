const coverImage = "your-image.jpg"; // ✅ YOUR IMAGE USED HERE

const data = {
    afro: [
        {title: "AFRO HOUSE LIVE PART II", src: "music/afro1.mp3"}
    ],
    edm: [
        {title: "EDM VIP MIX", src: "music/edm1.mp3"}
    ],
    tech: [
        {title: "WELCOME TO THE UNDERGROUND", src: "music/tech1.mp3"}
    ],
    house: [
        {title: "ACX INTRO MIX", src: "music/house1.mp3"}
    ],
    monthly: [
        {title: "EXPLORE THE CULTURE", src: "music/month1.mp3"}
    ]
};

const grid = document.getElementById("grid");
const title = document.getElementById("title");
const nowPlaying = document.getElementById("nowPlaying");

let audio = new Audio();
audio.volume = 0.7;

/* 🎧 LOAD GENRE */
function loadGenre(genre, event) {

    document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
    if (event) event.target.classList.add("active");

    grid.innerHTML = "";
    title.innerText = genre.toUpperCase();

    data[genre].forEach(track => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${coverImage}">
            <div class="card-title">DJ ADEM - ${track.title}</div>
        `;

        card.onclick = () => playTrack(track);

        grid.appendChild(card);
    });
}

/* 🎵 PLAY TRACK */
function playTrack(track) {
    audio.src = track.src;
    audio.play();

    nowPlaying.innerText = "DJ ADEM - " + track.title;
    document.getElementById("playBtn").innerText = "⏸";
}

/* ▶️ PLAY / PAUSE */
function togglePlay() {
    if (!audio.src) return;

    if (audio.paused) {
        audio.play();
        document.getElementById("playBtn").innerText = "⏸";
    } else {
        audio.pause();
        document.getElementById("playBtn").innerText = "▶";
    }
}

/* 🎧 VISUALIZER */
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let source = audioCtx.createMediaElementSource(audio);
let analyser = audioCtx.createAnalyser();

source.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize = 64;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
    requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let barWidth = canvas.width / bufferLength;

    for (let i = 0; i < bufferLength; i++) {
        let barHeight = dataArray[i];

        ctx.fillStyle = "#00f0ff";
        ctx.fillRect(i * barWidth, 60 - barHeight / 2, barWidth - 2, barHeight);
    }
}

draw();

/* INIT */
loadGenre("afro");