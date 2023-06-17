export default class Ship {
    constructor(lengthInt, coordArr) {
        this.length = lengthInt;
        this._hits = 0;
        this._sunk = false; //this.isSunk();
        this._coords = coordArr;
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

    stateType() {
        if (this.length === 4) {
            return "Battleship";
        } else if (this.length === 3) {
            return "Cruiser";
        } else if (this.length === 2) {
            return "Sub";
        } else if (this.length === 1) {
            return "Destroyer";
        }
    }

    get hits() {
        return this._hits;
    }

    get sunk() {
        return this._sunk;
    }

    set coords(position) {
        this._coords = position;
    }

    get coords() {
        return this._coords;
    }
}
