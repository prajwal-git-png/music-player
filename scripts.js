let audioPlayer = document.getElementById("audioPlayer");
let musicFilesInput = document.getElementById("musicFiles");
let selectedFilesDiv = document.getElementById("selectedFiles"); // New reference to the selected files div
let currentTrackIndex = 0;
let shuffle = false;

function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

function muteUnmute() {
    audioPlayer.muted = !audioPlayer.muted;
}

function nextTrack() {
    if (shuffle) {
        currentTrackIndex = Math.floor(Math.random() * audioPlayer.playlist.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % audioPlayer.playlist.length;
    }
    playCurrentTrack();
}

function toggleShuffle() {
    shuffle = !shuffle;
    if (shuffle) {
        shuffleArray(audioPlayer.playlist);
    }
}

function playCurrentTrack() {
    if (audioPlayer.playlist && audioPlayer.playlist.length > 0) {
        audioPlayer.src = audioPlayer.playlist[currentTrackIndex];
        audioPlayer.play();
    }
}

musicFilesInput.addEventListener("change", function() {
    let files = this.files;
    audioPlayer.playlist = [];
    selectedFilesDiv.innerHTML = ""; // Clear the selected files list
    for (let i = 0; i < files.length; i++) {
        let file = URL.createObjectURL(files[i]);
        audioPlayer.playlist.push(file);
        let fileName = document.createElement("div");
        fileName.textContent = files[i].name;
        selectedFilesDiv.appendChild(fileName); // Append each selected file name to the list
    }
    currentTrackIndex = 0;
    playCurrentTrack();
});

// Add event listeners to dynamically created file names to select tracks
selectedFilesDiv.addEventListener("click", function(event) {
    if (event.target.tagName === "DIV") {
        let selectedFileName = event.target.textContent;
        let selectedIndex = Array.from(selectedFilesDiv.children).indexOf(event.target);
        currentTrackIndex = selectedIndex;
        playCurrentTrack();
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
