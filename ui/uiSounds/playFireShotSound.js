export const playFireShotSound = (outcome) => {
    //'hit', 'miss', or 'sunk'
    if (outcome === "hit") {
        const soundUrl = "./ui/uiSounds/hitSound.mp3";
        const explosionSound = new Audio(soundUrl);
        explosionSound.play();
    } else if (outcome === "miss") {
        const soundUrl = "./ui/uiSounds/missSound.mp3";
        const explosionSound = new Audio(soundUrl);
        explosionSound.play();
    } else if (outcome === "sunk") {
        const soundUrl = "./ui/uiSounds/sunkSound.mp3";
        const explosionSound = new Audio(soundUrl);
        explosionSound.play();
    }
};
