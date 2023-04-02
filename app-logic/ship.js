export default class Ship {
    constructor(lengthInt) {
        this.length = lengthInt;
        this.hits;
        this.sunk = false;
    }
    hit() {
        this.hits++;
    }
    isSunk() {
        if (this.length === this.hits) {
            this.sunk = true;
        } else {
            this.sunk = false;
        }
    }
}
