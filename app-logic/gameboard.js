import Ship from "../app-logic/ship";
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

    updateBoard(info) {
        //info to be an ARRAY of data of what to put in which cell eg for a ship of
        //length 2 the args could be:[[[2],[3], "Sh"], [[2],[4], "Sh"]]

        info.forEach((item) => {
            this._board[item[0]][item[1]] = item[2]; //for every coordinate in the passed in array, the desired character / or X
            //is recorded at that coordinate in board (from the 3rd index position 2 of the passed array)
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

    placeShips(positionsData) {
        positionsData.forEach((shipObj) => {
            //creates the ships using the passed data and adds them to the ships property of gameboard
            const ship = new Ship(shipObj.length, shipObj.coords);
            this.ships = ship; //calls setter method
        });
        const infoArr = [];
        positionsData.forEach((shipPosition) => {
            shipPosition.coords.forEach((item) => {
                infoArr.push([item[0], item[1], "S"]);
            });
        });

        /*let infoArr = [
            [2, 3, "/"],
            [2, 4, "/"],
        ];*/
        console.log(infoArr);
        console.log("my log!!!");
        this.updateBoard(infoArr);
    }

    checkMove(coords) {
        //if the cell at coords has '/' or 'X' returns false
        //else it returns true
        //need to search in board property to find the coords cell and return its contents
        //can then use that to do the check
        if (
            this.board[coords[0]][coords[1]] === "/" ||
            this.board[coords[0]][coords[1]] === "X"
        ) {
            console.log(this.board[coords[0]][coords[1]]);
            return false;
        } else {
            console.log(this.board[coords[0]][coords[1]]);
            return true;
        }
    }

    hitMiss(validCoords) {
        //if the cell at validCoords has 'S' it returns 'hit'
        //else if it has '-' it returns 'miss'
        if (this.board[validCoords[0]][validCoords[1]] === "S") {
            return "hit";
        } else if (this.board[validCoords[0]][validCoords[1]] === "-") {
            return "miss";
        }
    }
}
