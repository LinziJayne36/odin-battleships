export default class Player {
    constructor() {
        this._attackSq = null;
        this._selectedPositions = null;
    }

    set setAttackSq(coords) {
        this._attackSq = coords;
    }

    get setAttackSq() {
        return this._attackSq;
    }

    set selectedPositions(posData) {
        this._selectedPositions = posData;
    }

    get selectedPositions() {
        return this._selectedPositions;
    }
}
