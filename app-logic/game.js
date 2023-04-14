export default class Game {
    constructor() {
        this._isWon = false;
        this._whoWon = null;
    }

    get isWon() {
        return this._isWon;
    }

    get whoWon() {
        return this._whoWon;
    }
}
