export const playMusic = (action) => {
    // 'start' or 'stop'
    const musicUrl = "./ui/uiSounds/startScreenMusic.mp3";
    const startScreenMusic = new Audio(musicUrl);
    if (action === "start") {
        //startScreenMusic.play();
    } else if (action === "stop") {
        startScreenMusic.volume = 0;
    }
};
