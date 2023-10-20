console.log("Welcome to spotify");


//Initialize the variable
let songIndex = 0;
// let audioElement = new Audio('/music/titanic.mp3');

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "My heart will go on", filePath: "/music/titanic.mp3", coverPath: "titanic.jpg" },
    { songName: "One Direction", filePath: "/music/one.mp3", coverPath: "night-changes-song-status.jpg" },
    { songName: "Woh din kea the", filePath: "/music/w.mp3", coverPath: "Woh-Din-Arijit-Singh-Version-From-Chhichhore--Hindi-2019-20190828231538-500x500.jpg" },
    { songName: "No Lie", filePath: "/music/nolie.mp3", coverPath: "no lie.jpg" },
    { songName: "Perfect", filePath: "/music/perfect.mp3", coverPath: "perfect.jpg" },
    { songName: "Pehli Nazar Mein", filePath: "/music/pehli.mp3", coverPath: "pehli nazar mein.jpg" },
    { songName: "Tere Hawale", filePath: "/music/tere.mp3", coverPath: "Tere-Hawaale-From-Laal-Singh-Chaddha-Hindi-2022-20220804093945-500x500.jpg" },
    { songName: "Tum Se hi", filePath: "/music/tum.mp3", coverPath: "tum se hi.jpg" },
    { songName: "Moh moh ke dhage", filePath: "/music/moh.mp3", coverPath: "moh.jpg" },
    { songName: "Ek zindagi meri", filePath: "/music/zin.mp3", coverPath: "ek zindagi meri.webp" },
]

let audioElement = new Audio(songs[songIndex].filePath);

songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});



//audioElement.play()

//Handle play/ pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        if (audioElement.currentTime > 0) {
            audioElement.play();
        } else {
            audioElement.currentTime = 0;
            audioElement.play();
        }
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((el, i) => {
            if (i === songIndex) {
                el.classList.remove('fa-play-circle');
                el.classList.add('fa-pause-circle');
            } else {
                el.classList.remove('fa-pause-circle');
                el.classList.add('fa-play-circle');
            }
        });
        Array.from(document.getElementsByClassName('gif')).forEach((el, i) => {
            if (i === songIndex) {
                el.style.opacity = 1;
            } else {
                el.style.opacity = 0;
            }
        });
        Array.from(document.getElementsByClassName('albumCover')).forEach((el, i) => {
            if (i === songIndex) {
                el.classList.add('rotate');
            } else {
                el.classList.remove('rotate');
            }
        });

    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');

        Array.from(document.getElementsByClassName('songItemPlay')).forEach((el, i) => {

            el.classList.remove('fa-pause-circle');
            el.classList.add('fa-play-circle');
        });

        Array.from(document.getElementsByClassName('gif')).forEach((el, i) => {

            el.style.opacity = 0;

        });
        Array.from(document.getElementsByClassName('albumCover')).forEach((el, i) => {

            el.classList.remove('rotate');

        });
    }

})



//Listen to Events

audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress);
    myProgressBar.value = progress;

})

audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    // audioElement.currentTime = 0;
    // audioElement.play();
    myProgressBar.value = 0;
    isPausing = true;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');

    setTimeout(() => {
        audioElement.currentTime = 0;
        audioElement.play();
        isPausing = false;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }, 200);

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((el, i) => {
        if (i === songIndex) {
            el.classList.remove('fa-play-circle');
            el.classList.add('fa-pause-circle');
        } else {
            el.classList.remove('fa-pause-circle');
            el.classList.add('fa-play-circle');
        }
    });

    Array.from(document.getElementsByClassName('gif')).forEach((el, i) => {
        if (i === songIndex) {
            el.style.opacity = 1;
        } else {
            el.style.opacity = 0;
        }
    });

    Array.from(document.getElementsByClassName('albumCover')).forEach((el, i) => {
        if (i === songIndex) {
            el.classList.add('rotate');
        } else {
            el.classList.remove('rotate');
        }
    });
})


myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;

})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });


}

let check = 0;


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {

        // const index = e.target.id;


        songIndex = index;

        if (e.target.classList.contains('fa-play-circle')) {
            makeAllPlays();
            console.log(e);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');

            Array.from(document.getElementsByClassName('gif')).forEach((el, i) => {
                if (i === songIndex) {
                    el.style.opacity = 1;
                } else {
                    el.style.opacity = 0;
                }
            });

            Array.from(document.getElementsByClassName('albumCover')).forEach((el, i) => {
                if (i === songIndex) {
                    el.classList.add('rotate');
                } else {
                    el.classList.remove('rotate');
                }
            });
            // audioElement.src = songs[index].filePath;
            // audioElement.currentTime = 0;

            // audioElement = new Audio(songs[index].filePath);

            // audioElement.play();
            if (check == 0 && audioElement.paused) {
                audioElement.src = songs[index].filePath;
                audioElement.play();
                check = 1;
            } else if (audioElement.paused) {
                audioElement.play();
            } else {
                audioElement.src = songs[index].filePath;
                audioElement.currentTime = 0;
                audioElement.play();
            }
            Array.from(document.getElementsByClassName('gif')).forEach((el, i) => {
                if (i === songIndex) {
                    el.style.opacity = 1;
                } else {
                    el.style.opacity = 0;
                }
            });
            Array.from(document.getElementsByClassName('albumCover')).forEach((el, i) => {
                if (i === songIndex) {
                    el.classList.add('rotate');
                } else {
                    el.classList.remove('rotate');
                }
            });
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        } else {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            Array.from(document.getElementsByClassName('gif')).forEach((el, i) => {
                if (i === songIndex) {
                    el.style.opacity = 0;
                }
            });
            Array.from(document.getElementsByClassName('albumCover')).forEach((el, i) => {

                el.classList.remove('rotate');

            });
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }


        // makeAllPlays();
        // console.log(e);
        // e.target.classList.remove('fa-play-circle');
        // e.target.classList.add('fa-pause-circle');
        // audioElement.src = `music/${index}.mp3`;
        // audioElement.currentTime = 0;
        // audioElement.play();
        // masterPlay.classList.remove('fa-play-circle');
        // masterPlay.classList.add('fa-pause-circle');
        // gif.style.opacity = 1;
    })
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    // audioElement.currentTime = 0;
    // audioElement.play();
    myProgressBar.value = 0;
    isPausing = true;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');

    setTimeout(() => {
        audioElement.currentTime = 0;
        audioElement.play();
        isPausing = false;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }, 200);

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((el, i) => {
        if (i === songIndex) {
            el.classList.remove('fa-play-circle');
            el.classList.add('fa-pause-circle');
        } else {
            el.classList.remove('fa-pause-circle');
            el.classList.add('fa-play-circle');
        }
    });
    Array.from(document.getElementsByClassName('gif')).forEach((el, i) => {
        if (i === songIndex) {
            el.style.opacity = 1;
        } else {
            el.style.opacity = 0;
        }
    });

    Array.from(document.getElementsByClassName('albumCover')).forEach((el, i) => {
        if (i === songIndex) {
            el.classList.add('rotate');
        } else {
            el.classList.remove('rotate');
        }
    });
});

document.getElementById('prev').addEventListener('click', () => {
    if (songIndex == 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex--;
    }
    audioElement.src = songs[songIndex].filePath;
    // audioElement.currentTime = 0;
    // audioElement.play();
    myProgressBar.value = 0;
    isPausing = true;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');

    setTimeout(() => {
        audioElement.currentTime = 0;
        audioElement.play();
        isPausing = false;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }, 200);

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((el, i) => {
        if (i === songIndex) {
            el.classList.remove('fa-play-circle');
            el.classList.add('fa-pause-circle');
        } else {
            el.classList.remove('fa-pause-circle');
            el.classList.add('fa-play-circle');
        }
    });
    Array.from(document.getElementsByClassName('gif')).forEach((el, i) => {
        if (i === songIndex) {
            el.style.opacity = 1;
        } else {
            el.style.opacity = 0;
        }
    });

    Array.from(document.getElementsByClassName('albumCover')).forEach((el, i) => {
        if (i === songIndex) {
            el.classList.add('rotate');
        } else {
            el.classList.remove('rotate');
        }
    });
});

