export default class Gameboard {
    constructor() {
        this._board = [
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["2", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["3", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["5", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["6", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["7", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["8", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["9", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["10", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ];
        this._ships = [];
        this._misses = this.misses;
        this._hits = this.hits;
        this._sunk = 0;
        this._shipsLeft = this.shipsLeftover();
    }

    set board(info) {
        //info to be an ARRAY of data of what to put in which cell eg for a ship of
        //length 2 the args could be:[[[2],[3], "Sh"], [[2],[4], "Sh"]]
        info.forEach((item) => {
            this._board[item[0]][item[1]] = item[2];
        });
    }

    get board() {
        return this._board;
    }

    set ships(shipObj) {
        this._ships.push(shipObj);
    }

    get ships() {
        return this._ships;
    }

    set misses(position) {
        this._misses = position;
    }

    get misses() {
        return this._misses;
    }

    set hits(coords) {
        coords.forEach((coord) => {
            this._hits = coords;
        });
    }

    get hits() {
        return this._hits;
    }

    issunk() {
        this._ships.forEach((ship) => {
            if (ship.sunk) {
                this._sunk++;
            }
        });
    }

    get sunk() {
        return this._sunk;
    }

    shipsLeftover() {
        let sunkNum = this._sunk;
        let lengthNum = this._ships.length;
        this._shipsLeft = lengthNum - sunkNum;
    }

    get shipsLeft() {
        return this._shipsLeft;
    }
}
