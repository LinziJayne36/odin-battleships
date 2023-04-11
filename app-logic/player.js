import Gameboard from "./gameboard";
export default class Player {
    constructor() {
        this._attackSq = null;
        this._selectedPositions = null;
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

    sendPositions(positions) {
        Gameboard.placeShips(positions);
    }
}
