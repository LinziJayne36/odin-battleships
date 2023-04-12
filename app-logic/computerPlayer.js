export default class ComputerPlayer {
    constructor() {
        this._attackSq = null;
        this._selectedPositions = null;
        this.alreadyAttacked = [];
    }
    get selectedPositions() {
        return this._selectedPositions;
    }

    get attackSq() {
        return this._attackSq;
    }

    calcSelectedPositions() {
        const selectedPositions = [];

        const addShip = (length) => {
            const coords = [];
            const firstCoord = [
                Math.floor(Math.random() * (10 - length + 1)),
                Math.floor(Math.random() * 10),
            ];
            coords.push(firstCoord);

            if (Math.random() < 0.5) {
                for (let i = 1; i < length; i++) {
                    coords.push([firstCoord[0] + i, firstCoord[1]]);
                }
            } else {
                for (let i = 1; i < length; i++) {
                    coords.push([firstCoord[0], firstCoord[1] + i]);
                }
            }

            selectedPositions.push({
                coords: coords,
                length: length,
            });
        };

        addShip(4);
        for (let i = 0; i < 2; i++) {
            addShip(3);
        }
        for (let i = 0; i < 3; i++) {
            addShip(2);
        }
        for (let i = 0; i < 4; i++) {
            addShip(1);
        }

        this._selectedPositions = selectedPositions;
    }

    calcAttackSq() {
        let allCells = [];
        for (let y = 1; y <= 10; y++) {
            for (let x = 1; x <= 10; x++) {
                allCells.push([y, x]);
            }
        }

        const availableCells = allCells.filter((cell) => {
            for (let attackedCell of this.alreadyAttacked) {
                if (
                    cell[0] === attackedCell[0] &&
                    cell[1] === attackedCell[1]
                ) {
                    return false;
                }
            }
            return true;
        });
        const randIndex = Math.floor(Math.random() * availableCells.length);
        const randCell = availableCells[randIndex];
        this._attackSq = randCell;
        this.alreadyAttacked.push(randCell);
    }
}
