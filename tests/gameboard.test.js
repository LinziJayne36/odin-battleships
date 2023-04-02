import Gameboard from "../app-logic/gameboard";
import { describe, expect, it, test } from "vitest";
describe("#Gameboard", () => {
    test("the board property should initially represent the 100 empty board cells", () => {
        const playerGameboard = new Gameboard();
        expect(playerGameboard.board).toEqual([
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["2", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["3", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["5", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["6", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["7", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["8", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["9", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["10", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ]);
    });
    test("the placeShips() method should be able to place ships at specific coordinated by calling Ship class", () => {
        const playerGameboard = new Gameboard();
        expect(playerGameboard.placeShips([2, 2]));
    });
});
