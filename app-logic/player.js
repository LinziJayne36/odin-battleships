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
    /*
    generateRandomPositions() {
        return new Promise((resolve) => {
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
                            ? [firstCoord[0] + i, firstCoord[1]] //do this in horizontal oriented ship
                            : [firstCoord[0], firstCoord[1] + i]; //do this in vertical oriented ship
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
                        console.log(coordToAdd);
                    }
                    if (isValid) {
                        for (let i = 0; i < length; i++) {
                            const coordToAdd = isVertical
                                ? [firstCoord[0] + i, firstCoord[1]]
                                : [firstCoord[0], firstCoord[1] + i];
                            coords.push(coordToAdd);
                            console.log(coordToAdd);

                            usedCoords.push(coordToAdd.toString());
                        }
                        break;
                    }
                    
                }

                selectedPositions.push({
                    coords: coords, //where coords are suggested coords for 1 ship cell only...
                    length: length,
                });
                console.log(selectedPositions);

                let neighbourSquares = [];
                //TODO: find neighbouring coordinates of each coord in selectedPositions.coords array and push these to usedCoords array

                //this just puts each selected coord into a readable string
                let eachCoord = [];
                coords.forEach((coordPair) => {
                    eachCoord.push(`${coordPair[0]},${coordPair[1]}`);
                    console.log(eachCoord);
                });
            };

            addShip(4); //add one battleship

            //add 2 cruisers
            for (let i = 0; i < 2; i++) {
                addShip(3);
            }

            //add 3 subs
            for (let i = 0; i < 3; i++) {
                addShip(2, Math.random() < 0.5);
            }

            //add 4 destroyers
            for (let i = 0; i < 4; i++) {
                addShip(1, Math.random() < 0.5);
            }

            this._selectedPositions = selectedPositions;
            resolve(this._selectedPositions);
        });
    }
*/
    generateRandomPositions() {
        return new Promise((resolve) => {
            const selectedPositions = [];
            const usedCoords = [];

            const addShip = (length) => {
                const coords = [];
                let isValid = false;
                let iterations = 0;

                while (!isValid && iterations < 100) {
                    iterations++;

                    const isVertical = Math.random() < 0.5;
                    let x, y;

                    if (isVertical) {
                        x = Math.floor(Math.random() * 10) + 1;
                        y = Math.floor(Math.random() * (11 - length)) + 1;
                    } else {
                        x = Math.floor(Math.random() * (11 - length)) + 1;
                        y = Math.floor(Math.random() * 10) + 1;
                    }

                    const cells = [];

                    for (let i = 0; i < length; i++) {
                        if (isVertical) {
                            const nx = x;
                            const ny = y + i;
                            cells.push([nx, ny]);
                        } else {
                            const nx = x + i;
                            const ny = y;
                            cells.push([nx, ny]);
                        }
                    }

                    let isOverlap = false;

                    for (const [nx, ny] of cells) {
                        const neighbors = [
                            [nx, ny], // current cell
                            [nx, ny - 1], // above
                            [nx, ny + 1], // below
                            [nx - 1, ny], // left
                            [nx + 1, ny], // right
                            [nx - 1, ny - 1], // top left diagonal
                            [nx + 1, ny - 1], // top right diagonal
                            [nx - 1, ny + 1], // bottom left diagonal
                            [nx + 1, ny + 1], // bottom right diagonal
                        ];

                        for (const [cx, cy] of neighbors) {
                            if (
                                cx >= 1 &&
                                cx <= 10 &&
                                cy >= 1 &&
                                cy <= 10 &&
                                usedCoords.includes([cx, cy].toString())
                            ) {
                                isOverlap = true;
                                break;
                            }
                        }

                        if (isOverlap) {
                            break;
                        }
                    }

                    if (!isOverlap) {
                        for (const [nx, ny] of cells) {
                            coords.push([nx, ny]);
                            usedCoords.push([nx, ny].toString());
                        }
                        isValid = true;
                    }
                }

                if (isValid) {
                    selectedPositions.push({
                        coords: coords,
                        length: length,
                    });
                }
            };

            addShip(4); //add one battleship

            //add 2 cruisers
            for (let i = 0; i < 2; i++) {
                addShip(3);
            }

            //add 3 subs
            for (let i = 0; i < 3; i++) {
                addShip(2, Math.random() < 0.5);
            }

            //add 4 destroyers
            for (let i = 0; i < 4; i++) {
                addShip(1, Math.random() < 0.5);
            }

            this._selectedPositions = selectedPositions;
            resolve(this._selectedPositions);
        });
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
