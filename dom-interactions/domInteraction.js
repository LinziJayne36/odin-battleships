import { playSound } from "../ui/uiSounds/playSound";

export const getPlayerAttackInput = (cellClass) => {
    //ie. 'playerSquares' or 'computerSquares'
    //where cellClass tells us which player's grid we are attaching the event listeners to...
    return new Promise((resolve) => {
        const squares = document.querySelectorAll(`.${cellClass}`);
        let inputCoord;
        squares.forEach((square) => {
            square.addEventListener("click", (event) => {
                const row = parseInt(event.target.dataset.row);
                const col = parseInt(event.target.dataset.col);
                inputCoord = [row, col];
                if (square.innerText === "/" || square.innerText === "X") {
                    playSound("disallowed");
                }
                squares.forEach((square) =>
                    square.removeEventListener("click", () => {})
                );
                resolve(inputCoord);
            });
        });
    });
};

//This function is for the random generation of player ship placements
export const getRandomShipPlacements = () => {
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
                [firstCoord[0], firstCoord[1]] = [firstCoord[1], firstCoord[0]];
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

    player._selectedPositions = selectedPositions;
};
