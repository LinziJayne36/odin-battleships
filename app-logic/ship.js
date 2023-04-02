export default class Ship {
    constructor(lengthInt) {
        this.length = lengthInt;
        this._hits = 0;
        this._sunk = this.isSunk();
        this._coords = this.setCoords;
    }
    hit() {
        this._hits++;
        this.isSunk();
    }
    isSunk() {
        if (this.length === this._hits) {
            this._sunk = true;
        } else {
            this._sunk = false;
        }
    }
    get hits() {
        return this._hits;
    }

    get sunk() {
        return this._sunk;
    }

    set setCoords(position) {
        this._coords = position;
    }

    get getCoords() {
        return this._coords;
    }
}
