console.log("Welcome to Shikha's Music Player!")
const song = document.getElementById("title");
const artist = document.getElementById("artist");
const img_box = document.getElementById("img_box");
const img = document.getElementById("img");
const play_music = document.getElementById("play");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const music = document.querySelector("audio");
const song_duration = document.getElementById("duration");
const progress_div = document.getElementById("progress_div")

//play song
let song_playing = false;
function play_song(){
    song_playing = true;
    music.play();
    play_music.classList.replace("fa-play", "fa-pause");
    img_box.classList.add("anime");
}

function pause_song(){
    song_playing = false;
    music.pause();
    play_music.classList.replace("fa-pause", "fa-play");
    img_box.classList.remove("anime");
}

play_music.addEventListener("click", () => {
    song_playing ? pause_song() : play_song();
})

//change song
const songs = [
{
    num: 1,
    title: "Ek Pyar Ka Nagma",
    artist: "Sanam Puri",
},
{
    num: 2,
    title: "Diwane Hum Nahi",
    artist: "Aditya Yadav",
},
{
    num: 3,
    title: "Musafir",
    artist: "Atif Aslam",
},
{
    num: 4,
    title: "Wah Wai Wahh",
    artist: "Neha Kakkar & Sukhe",
},
{
    num: 6,
    title: "Huye Bechain",
    artist: "Yaseer Desai",
},
{
    num: 7,
    title: "Dil Ibaadat",
    artist: "KK",
},
{
    num: 8,
    title: "Bekhayali",
    artist: "Sachet Tondon",
},
{
    num: 5,
    title: "Tere Hoke Rahenge",
    artist: "Arijit Singh",
}
];

function loadSongs(songs) { 
    song.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = `music${songs.num}.mp3`;
    img.src = `image${songs.num}.jpeg`;
}
let songNum = 0;
function nextSong() {
    songNum = (songNum + 1) % songs.length;
    loadSongs(songs[songNum]);
    play_song();
}
function prevSong() {
    songNum = (songNum - 1 + songs.length) % songs.length;
    loadSongs(songs[songNum]);
    play_song();
}

//progress bar & song timing
music.addEventListener("timeupdate", (event) => {
    let progress = document.getElementById("progress");
    let ctime = document.getElementById("ctime");
    const { currentTime, duration } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;
    let min = Math.floor(duration / 60);
    let sec = Math.floor(duration % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    if (duration) {
        song_duration.textContent = `${min}:${sec}`;
    }
    let cur_min = Math.floor(currentTime / 60);
    let cur_sec = Math.floor(currentTime % 60);
    if (cur_sec < 10) {
      cur_sec = `0${cur_sec}`;
    }
    if (currentTime) {
        ctime.textContent = `${cur_min}:${cur_sec}`;
  }
})

//progress bar click
progress_div.addEventListener("click", event => {
    const { duration } = music;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    music.currentTime = move_progress;
})

music.addEventListener("ended", nextSong);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);