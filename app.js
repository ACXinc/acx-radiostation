let audio = new Audio();
let currentMix = [];
let index = 0;

/* 🎵 DATA */
const mixes = {
    tech: [
        { title: "UNDERGROUND INTRO VOL 1", cover: "your-image.jpg" },
        { title: "TECH ENERGY VOL 1", cover: "your-image.jpg" }
    ],
    edm: [
        { title: "CULTURE INTRO VOL 1", cover: "your-image.jpg" },
        { title: "EDM EXPLOSION VOL 1", cover: "your-image.jpg" }
    ]
};

/* 🏠 ENTER RADIO */
function enterRadio() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
}

/* 🎧 OPEN GENRE */
function openGenre(type) {

    document.getElementById("genreTitle").innerText =
        type.toUpperCase() + " MIXES";

    let list = document.getElementById("mixList");
    list.innerHTML = "";

    mixes[type].forEach((mix) => {

        let div = document.createElement("div");
        div.className = "mix-card";

        div.innerHTML = `
            <img src="${mix.cover}">
            <h4>${mix.title}</h4>
        `;

        div.onclick = () => startMix(mix);

        list.appendChild(div);
    });
}

/* ▶ START MIX */
function startMix(mix) {

    currentMix = Array.from({length:10}, (_,i)=>
        `music/${mix.title.toLowerCase().includes("tech") ? "tech" : "edm"}/VOL1/${i+1}.mp3`
    );

    index = 0;

    document.getElementById("mixTitle").innerText =
        mix.title;

    playTrack();
}

/* ▶ PLAY TRACK (FIXED ENGINE) */
function playTrack() {

    audio.pause();
    audio = new Audio();

    audio.src = currentMix[index];
    audio.load();

    audio.play().catch(err => {
        console.log("Audio blocked or missing file:", err);
    });

    audio.ontimeupdate = () => {

        let p = (audio.currentTime / audio.duration) * 100;
        document.getElementById("bar").style.width = p + "%";

        if (audio.duration - audio.currentTime < 3) {
            nextTrack();
            audio.ontimeupdate = null;
        }
    };

    document.getElementById("trackInfo").innerText =
        "Track " + (index + 1) + " / 10";
}

/* ▶ NEXT TRACK */
function nextTrack() {

    index++;

    if (index >= currentMix.length) {
        index = 0;
    }

    playTrack();
}