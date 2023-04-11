export default class ComputerPlayer {
    constructor() {
        this._attackSq = null;
        this._selectedPositions = null;
    }
    get selectedPositions() {
        return this._selectedPositions;
    }
    calcSelectedPositions() {
        const positions = [];

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

            positions.push(coords);
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

        this._selectedPositions = positions;
    }
}
