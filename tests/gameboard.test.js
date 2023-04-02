import Gameboard from "../app-logic/gameboard";
import { describe, expect, it, test } from "vitest";
describe("#Gameboard", () => {
    test("the board property should initially represent the 100 empty board cells, and the board getter method should return the value of _board", () => {
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

    test("the misses setter method and misses getter methods set and retireve the value of _misses", () => {
        const gameboard = new Gameboard();
        gameboard.misses = [2, 2];
        expect(gameboard.misses).toEqual([2, 2]);
    });
    test("the hits setter method and hits getter method set and retrieve the value of _hits", () => {
        const playerGameboard = new Gameboard();
        playerGameboard.hits = [
            [2, 4],
            [3, 7],
        ];
        expect(playerGameboard.hits).toEqual([
            [2, 4],
            [3, 7],
        ]);
    });
    test("the getter method for sunk property should return the number of sunk ships on the gameboard", () => {
        const gameboard1 = new Gameboard();
        //need to figure out how to test this at this stage...
    });
});
