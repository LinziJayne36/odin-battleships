export const playMusic = (action) => {
    // 'start' or 'stop'

    if (action === "start") {
        const musicUrl = "./ui/uiSounds/startScreenMusic.mp3";
        const startScreenMusic = new Audio(musicUrl);
        startScreenMusic.play();
    }
};
