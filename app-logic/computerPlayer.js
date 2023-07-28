export default class ComputerPlayer {
    constructor() {
        this._attackSq = null;
        this._selectedPositions = null;
        this.alreadyAttacked = [];
        this.targetPositions = null;
    }
    get selectedPositions() {
        return this._selectedPositions;
    }

    get attackSq() {
        return this._attackSq;
    }
    /*
    calcSelectedPositions() {
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
    */

    calcSelectedPositions() {
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

    calcAttackSq(targets) {
        if (targets) {
            //TODO: choose from these coords
            console.log(targets);
            let unusedCells = [];
            let cellElem;
            this.targetPositions = targets;

            targets.forEach((cell) => {
                cellElem = document.getElementById(`${cell[0]},${cell[1]}`);
                if (cellElem.innerText !== "X" && cellElem.innerText !== "/") {
                    unusedCells.push(cell);
                }
            });
            console.log(unusedCells);
            //Identify those cells which already have X or /  and exclude them from being added to available cells
            const availableCells = unusedCells.filter((cell) => {
                for (let attackedCell of this.alreadyAttacked) {
                    if (cell === attackedCell && cell === attackedCell) {
                        return false;
                    }
                }
                return true;
            });
            console.log(availableCells);
            if (availableCells.length === 0) {
                // no available cells left, return null or throw an error
                return "full"; //this should never happen once the computer chooses smartly
            }
            let tryNext = availableCells.length - 1; //index num of cell to try next
            console.log(typeof tryNext);
            let nextCell = availableCells[tryNext];
            console.log(typeof nextCell);
            this._attackSq = nextCell;
            this.alreadyAttacked.push(nextCell);
            //targets.pop();
            console.log(nextCell);
            console.log(this._attackSq);
            console.log(this.targetPositions); //ERROR: Not showing all possible target positions...
            // const randIndex = Math.floor(Math.random() * availableCells.length);
            // const randCell = availableCells[randIndex];
            // this._attackSq = randCell;
            // this.alreadyAttacked.push(randCell);
        }
        if (!targets || this.targetPositions === null) {
            //and if there was no arg supplied to this method, do this instead........................................................................
            let allCells = [];
            for (let y = 1; y <= 10; y++) {
                for (let x = 1; x <= 10; x++) {
                    allCells.push([y, x]);
                }
            }
            let unusedCells = [];
            let cellElem;
            console.log(allCells);
            allCells.forEach((cell) => {
                cellElem = document.getElementById(`${cell[0]},${cell[1]}`);
                if (cellElem.innerText !== "X" && cellElem.innerText !== "/") {
                    unusedCells.push(cell);
                }
            });

            //Identify those cells which already have X or /  and exclude them from being added to available cells
            const availableCells = unusedCells.filter((cell) => {
                console.log(cell);
                for (let attackedCell of this.alreadyAttacked) {
                    if (cell === attackedCell && cell === attackedCell) {
                        return false;
                    }
                }

                /*for (let attackedCell of this.alreadyAttacked) {
                    if (
                        cell[0] === attackedCell[0] &&
                        cell[1] === attackedCell[1]
                    ) {
                        return false;
                    }
                } */

                return true;
            });
            if (availableCells.length === 0) {
                // no available cells left, return null or throw an error
                return "full"; //this should never happen once the computer chooses smartly
            }
            const randIndex = Math.floor(Math.random() * availableCells.length);
            const randCell = availableCells[randIndex];
            this._attackSq = randCell;
            this.alreadyAttacked.push(randCell);
        }
    }
}
