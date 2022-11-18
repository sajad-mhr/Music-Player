const musicList = [
  {
    cover: "assets/images/arayeshghaliz.jpeg",
    songName: "Arayesh Ghaliz",
    artist: "Homayoun Shajarian",
    song: "assets/music/Homayoun Shajarian - Ba Man Sanama (320).mp3",
  },
  {
    cover: "assets/images/ezterab.jpeg",
    songName: "Ezterab",
    artist: "Poobon",
    song: "assets/music/Poobon - Ezterab.mp3",
  },
  {
    cover: "assets/images/slowly.jpeg",
    songName: "Let Me Down Slowly",
    artist: "Alec Benjamin",
    song: "assets/music/Let_Me_Down_Slowly.mp3",
  },
];

const $ = document;
const audioElem = $.querySelector("audio");
const playBtn = $.querySelector(".play-music");
const iconPlay = $.querySelector("#playing");
const previosBtn = $.querySelector(".previos-music");
const nextBtn = $.querySelector(".next-music");
const artistSong = $.querySelector(".artist");
const coverSong = $.querySelector(".music-img");
const nameSong = $.querySelector(".song-name");
const currentTimeElem = $.querySelector(".current-time");
const durationElem = $.querySelector(".duration");
const progress = $.querySelector(".progress");
const progressContainer = $.querySelector(".progress-container");
const rate = $.getElementById("rate");
const playbackRate = $.querySelector(".playback-rate");
const replay = $.querySelector(".replay");
const background = $.querySelector(".container");


let isPlay = false;
function playMusic() {
  isPlay = true;
  audioElem.play();
  iconPlay.classList.replace("fa-play", "fa-pause");
}

function pauseMusic() {
  isPlay = false;
  audioElem.pause();
  iconPlay.classList.replace("fa-pause", "fa-play");
}

playBtn.addEventListener("click", function () {
  if (!isPlay) {
    playMusic();
  } else {
    pauseMusic();
  }

  // if (isPlay ||) {
  //   const interval = setInterval(function () {
  //     if (isPlay ||) {
  //       let redColor = Math.floor(Math.random() * 255);
  //       let greenColor = Math.floor(Math.random() * 255);
  //       let blueColor = Math.floor(Math.random() * 255);
  //       background.style.background = `rgb(${redColor},${greenColor},${blueColor})`;
  //       console.log(background.style.background);
  //     } else {
  //       background.style.background = "#2e2e2e";
  //       clearInterval(interval);
  //     }
  //   }, audioElem.playbackRate * 1000);
  // }
});

let songIndex = 0;

function loadSong(song) {
  console.log(song);
  audioElem.src = song.song;
  nameSong.innerHTML = song.songName;
  artistSong.innerHTML = song.artist;
  coverSong.setAttribute("src", song.cover);
}

function previosMusic() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = musicList.length - 1;
  }
  loadSong(musicList[songIndex]);
  playMusic();
  audioElem.playbackRate = 1;
  rate.innerHTML = "1x";
}

function nextMusic() {
  songIndex++;
  if (songIndex > musicList.length - 1) {
    songIndex = 0;
  }
  loadSong(musicList[songIndex]);
  playMusic();
  audioElem.playbackRate = 1;
  rate.innerHTML = "1x";
}

loadSong(musicList[songIndex]);

function updateProgressBar(event) {
  if (isPlay || !isPlay) {
    const duration = event.srcElement.duration;
    const currentTime = event.srcElement.currentTime;

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationElem.innerHTML = durationMinutes + ":" + durationSeconds;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeElem.innerHTML = currentMinutes + ":" + currentSeconds;
  }
}

function setProgressBar(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audioElem.duration;
  audioElem.currentTime = (clickX / width) * duration;
  playMusic()
}

audioElem.playbackRate = 1;
function playBackRate() {
  if (audioElem.playbackRate === 1) {
    audioElem.playbackRate = 2;
    rate.innerHTML = "2x";
  } else if (audioElem.playbackRate === 2) {
    audioElem.playbackRate = 3;
    rate.innerHTML = "3x";
  } else if (audioElem.playbackRate === 3) {
    audioElem.playbackRate = 4;
    rate.innerHTML = "4x";
  } else if (audioElem.playbackRate === 4) {
    audioElem.playbackRate = 1;
    rate.innerHTML = "1x";
  }
}

function Replay() {
  audioElem.currentTime = 0;
}

progressContainer.addEventListener("click", setProgressBar);
audioElem.addEventListener("timeupdate", updateProgressBar);
audioElem.addEventListener("ended", nextMusic);
previosBtn.addEventListener("click", previosMusic);
nextBtn.addEventListener("click", nextMusic);
playbackRate.addEventListener("click", playBackRate);
replay.addEventListener("click", Replay);
