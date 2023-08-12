export const playSound = (soundType) => {
    //'hit', 'miss', 'sunk', 'start'
    if (soundType === "hit") {
        const soundUrl = "./ui/hitSound.mp3";
        const explosionSound = new Audio(soundUrl);
        explosionSound.play();
    } else if (soundType === "miss") {
        const soundUrl = "./ui/missSound.mp3";
        const explosionSound = new Audio(soundUrl);
        explosionSound.play();
    } else if (soundType === "sunk") {
        const soundUrl = "./ui/sunkSound.mp3";
        const explosionSound = new Audio(soundUrl);
        explosionSound.play();
    } else if (soundType === "start") {
        const soundUrl = "./ui/startBell.mp3";
        const startBellSound = new Audio(soundUrl);
        startBellSound.play();
    } else if (soundType === "lose") {
        const soundUrl = "./ui/loseSound.mp3";
        const loseSound = new Audio(soundUrl);
        loseSound.play();
    } else if (soundType === "win") {
        const soundUrl = "./ui/winSound.mp3";
        const winSound = new Audio(soundUrl);
        winSound.play();
    } else if (soundType === "disallowed") {
        const soundUrl = "./ui/disallowedSound.mp3";
        const disallowedSound = new Audio(soundUrl);
        disallowedSound.volume = 0.1;
        disallowedSound.play();
    }
};
