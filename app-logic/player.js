import Gameboard from "./gameboard";

export default class Player {
    constructor() {
        this._attackSq = null;
        this._selectedPositions = null;
        this.alreadyAttacked = [];
    }

    set attackSq(coords) {
        this._attackSq = coords;
    }

    get attackSq() {
        return this._attackSq;
    }

    set selectedPositions(posData) {
        this._selectedPositions = posData;
    }

    get selectedPositions() {
        return this._selectedPositions;
    }

    generateRandomPositions() {
        const selectedPositions = [];
        const usedCoords = [];

        const addShip = (length, isVertical = true) => {
            const coords = [];
            let isValid = false;
            let iterations = 0;

            while (!isValid && iterations < 100) {
                iterations++;

                const firstCoord = [
                    Math.floor(Math.random() * 10) + 1,
                    Math.floor(Math.random() * 10) + 1,
                ];

                if (!isVertical) {
                    [firstCoord[0], firstCoord[1]] = [
                        firstCoord[1],
                        firstCoord[0],
                    ];
                }

                if (firstCoord[0] > 10 || firstCoord[1] > 10) {
                    continue;
                }

                let isOverlap = false;
                for (let i = 0; i < length; i++) {
                    const coordToCheck = isVertical
                        ? [firstCoord[0] + i, firstCoord[1]]
                        : [firstCoord[0], firstCoord[1] + i];
                    if (usedCoords.includes(coordToCheck.toString())) {
                        isOverlap = true;
                        break;
                    }
                }
                if (isOverlap) {
                    continue;
                }

                for (let i = 0; i < length; i++) {
                    const coordToAdd = isVertical
                        ? [firstCoord[0] + i, firstCoord[1]]
                        : [firstCoord[0], firstCoord[1] + i];
                    if (coordToAdd[0] > 10 || coordToAdd[1] > 10) {
                        isValid = false;
                        break;
                    }
                    if (usedCoords.includes(coordToAdd.toString())) {
                        isValid = false;
                        break;
                    }
                    isValid = true;
                }
                if (isValid) {
                    for (let i = 0; i < length; i++) {
                        const coordToAdd = isVertical
                            ? [firstCoord[0] + i, firstCoord[1]]
                            : [firstCoord[0], firstCoord[1] + i];
                        coords.push(coordToAdd);
                        usedCoords.push(coordToAdd.toString());
                    }
                    break;
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
            addShip(2, Math.random() < 0.5);
        }
        for (let i = 0; i < 4; i++) {
            addShip(1, Math.random() < 0.5);
        }

        this._selectedPositions = selectedPositions;
    }

    calcAttackSq() {
        //TEMPORARY: TO BE REPLACED WITH DOM INPUT
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
        if (availableCells.length === 0) {
            // no available cells left, return null or throw an error
            //throw error.console("all the squares are taken");
            return "full";
        }
        const randIndex = Math.floor(Math.random() * availableCells.length);
        const randCell = availableCells[randIndex];
        this._attackSq = randCell;
        this.alreadyAttacked.push(randCell);
    }
}

/*
generateRandomPositions() {
        const selectedPositions = [];
        const usedCoords = [];

        const addShip = (length) => {
            const coords = [];
            let isValid = false;
            let iterations = 0;

            while (!isValid && iterations < 100) {
                iterations++;

                const firstCoord = [
                    Math.floor(Math.random() * 10) + 1,
                    Math.floor(Math.random() * 10) + 1,
                ];

                // Check if any coordinate is out of bounds
                if (firstCoord[0] > 10 || firstCoord[1] > 10) {
                    continue;
                }

                // Check if any coordinate is already used
                let isOverlap = false;
                for (let i = 0; i < length; i++) {
                    const coordToCheck = [firstCoord[0] + i, firstCoord[1]];
                    if (usedCoords.includes(coordToCheck.toString())) {
                        isOverlap = true;
                        break;
                    }
                    const coordToCheck2 = [firstCoord[0], firstCoord[1] + i];
                    if (usedCoords.includes(coordToCheck2.toString())) {
                        isOverlap = true;
                        break;
                    }
                }
                if (isOverlap) {
                    continue;
                }

                // Check if all coordinates are valid
                for (let i = 0; i < length; i++) {
                    const coordToCheck = [firstCoord[0] + i, firstCoord[1]];
                    if (
                        coordToCheck[0] > 10 ||
                        coordToCheck[1] > 10 ||
                        coordToCheck[0] < 1 ||
                        coordToCheck[1] < 1
                    ) {
                        isValid = false;
                        break;
                    }
                    const coordToCheck2 = [firstCoord[0], firstCoord[1] + i];
                    if (
                        coordToCheck2[0] > 10 ||
                        coordToCheck2[1] > 10 ||
                        coordToCheck2[0] < 1 ||
                        coordToCheck2[1] < 1
                    ) {
                        isValid = false;
                        break;
                    }
                    isValid = true;
                }
                if (isValid) {
                    for (let i = 0; i < length; i++) {
                        const coordToAdd = [firstCoord[0] + i, firstCoord[1]];
                        coords.push(coordToAdd);
                        usedCoords.push(coordToAdd.toString());
                    }
                    break;
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
*/
