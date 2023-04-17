import Game from "../app-logic/game";
import Gameboard from "../app-logic/gameboard";
import { describe, expect, it, test } from "vitest";
describe("#Game", () => {
    test("the isWon property should initially be set to false", () => {
        const game = new Game();
        expect(game.isWon).toBe(false);
    });
    test("the isWon property can be toggled between true or false using its setter and returned via its getter", () => {
        const game = new Game();
        game.isWon = true;
        expect(game.isWon).toBe(true);
    });
    /* test("the checkGame method should check the gameboard of both players to see if either player has won", () => {
        const playerGameboard = new Gameboard();
        const computerGameboard = new Gameboard();
        const game = new Game();
        playerGameboard._shipsLeft = 5;
        computerGameboard._shipsLeft = 1;
        game.checkGame();
        expect(game.isWon).toBe(false); //to test this when ready, expect true and set one players shipsLeft to 0 above...
    });*/
    test("the whoWon property can be set to 'player' or 'computer' and can be returned via its getter", () => {
        const game = new Game();
        game.whoWon = "PLAYER";
        expect(game.whoWon).toBe("PLAYER");
    });
});
