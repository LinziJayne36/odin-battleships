export const playSound = (soundType) => {
    //'hit', 'miss', 'sunk', 'start'
    if (soundType === "hit") {
        const soundUrl = "./ui/uiSounds/hitSound.mp3";
        const explosionSound = new Audio(soundUrl);
        explosionSound.play();
    } else if (soundType === "miss") {
        const soundUrl = "./ui/uiSounds/missSound.mp3";
        const explosionSound = new Audio(soundUrl);
        explosionSound.play();
    } else if (soundType === "sunk") {
        const soundUrl = "./ui/uiSounds/sunkSound.mp3";
        const explosionSound = new Audio(soundUrl);
        explosionSound.play();
    } else if (soundType === "start") {
        const soundUrl = "./ui/uiSounds/startBell.mp3";
        const startBellSound = new Audio(soundUrl);
        startBellSound.play();
    } else if (soundType === "lose") {
        const soundUrl = "./ui/uiSounds/loseSound.mp3";
        const loseSound = new Audio(soundUrl);
        loseSound.play();
    } else if (soundType === "win") {
        const soundUrl = "./ui/uiSounds/winSound.mp3";
        const winSound = new Audio(soundUrl);
        winSound.play();
    } else if (soundType === "disallowed") {
        const soundUrl = "./ui/uiSounds/disallowedSound.mp3";
        const disallowedSound = new Audio(soundUrl);
        disallowedSound.volume = 0.1;
        disallowedSound.play();
    }
};
