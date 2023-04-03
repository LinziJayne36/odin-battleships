import Gameboard from "../app-logic/gameboard";
import Ship from "../app-logic/ship";
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
    test("the hits method and hits getter method set and retrieve the value of _hits", () => {
        const playerGameboard = new Gameboard();
        playerGameboard.hits = [
            [2, 4],
            [3, 7],
            [8, 8],
        ];

        expect(playerGameboard.hits).toEqual([
            [2, 4],
            [3, 7],
            [8, 8],
        ]);
    });
    test("the setter method for board should allow us to record an appropriate symbol at given coords, while the getter method returns those recorded values", () => {
        const anotherGameboard = new Gameboard();
        anotherGameboard.board = [
            [[2], [3], "/"],
            [[2], [4], "/"],
        ];
        expect(anotherGameboard.board[2][3]).toBe("/");
        expect(anotherGameboard.board[2][4]).toBe("/");
    });
    test("the setter method for ships should add a given ship object to the array, while the getter method should return it", () => {
        const gameboard = new Gameboard();
        gameboard.ships = new Ship(2);
        expect(gameboard.ships[0]).toBeInstanceOf(Ship);
    });
    test("the sunk method should add sunk ships to sunk", () => {
        const gameboard = new Gameboard();
        gameboard.ships = new Ship(2); //creating some ships to populate ships: array
        gameboard.ships = new Ship(4); // ...
        gameboard.ships = new Ship(1); // ...
        gameboard.ships[0].hit(); //sinking the ship
        gameboard.ships[0].hit(); //sinking the ship

        expect(gameboard.ships[0].sunk).toEqual(true); //ensure setting up the sunk ship in ships array worked
        gameboard.issunk();
        expect(gameboard.sunk).toEqual(1);
    });
    test("the set shipsLeft setter should calculate the number of unsunk ships remaining in the array in the ships: preoperty, the getter should return that number", () => {
        const gameboard = new Gameboard();
        gameboard.ships = new Ship(2); //creating some ships to populate ships array
        gameboard.ships = new Ship(4); // ...
        gameboard.ships = new Ship(1); // ...
        gameboard.ships = new Ship(1); // ...
        gameboard.ships[0].hit(); //sinking the ship
        gameboard.ships[0].hit(); //sinking the ship
        gameboard.issunk(); //setting sunk property
        gameboard.shipsLeftover();
        expect(gameboard.shipsLeft).toEqual(3);
    });
});
