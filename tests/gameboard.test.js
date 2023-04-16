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
        expect(gameboard.misses).toEqual([[2, 2]]);
    });
    test("the hits method and hits getter method set and retrieve the value of _hits", () => {
        const playerGameboard = new Gameboard();
        playerGameboard.hits = [2, 4];

        expect(playerGameboard.hits).toEqual([[2, 4]]);
    });
    test("the method for updating board (updateBoard) should allow us to record an appropriate symbol at given coords, while the getter method of board returns those recorded values", () => {
        const anotherGameboard = new Gameboard();
        anotherGameboard.updateBoard([
            [2, 3, "/"],
            [2, 4, "/"],
        ]);

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
    /* test("the set shipsLeft setter should calculate the number of unsunk ships remaining in the array in the ships: preoperty, the getter should return that number", () => {
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
    });*/
    test("the placeShips method will create 10 ship objects, using the passed in array of objects containing ship placement coordinates and lengths, and to store them in the ships property of the gameboard object..", () => {
        //For now, we will call placeShips directly from here, passing in a preconstructed array of dummy data
        //Eventually, placeShips will be called from inside the sendPositions method of the player object, and the data will be the selectedPositions
        //property data of Player... e.g: player.sendPositions(this.selectedPositions)
        const gameboard = new Gameboard();
        //array of 10 0bjects, each one containing coords and length of a single ship
        const dummySelectedPositions = [
            {
                coords: [
                    [7, 3],
                    [8, 3],
                    [9, 3],
                    [10, 3],
                ],
                length: 4, //Battleship info
            },
            {
                coords: [
                    [2, 2],
                    [3, 2],
                    [4, 2],
                ],
                length: 3, //Cruiser info
            },
            {
                coords: [
                    [7, 5],
                    [7, 6],
                    [7, 7],
                ],
                length: 3, //Cruiser info
            },
            {
                coords: [
                    [2, 5],
                    [2, 6],
                ],
                length: 2, //Sub info
            },
            {
                coords: [
                    [1, 9],
                    [2, 9],
                ],
                length: 2, //Sub info},
            },
            {
                coords: [
                    [7, 9],
                    [7, 10],
                ],
                length: 2, //Sub info},
            },
            { coords: [[4, 8]], length: 1 }, //Destroyer info
            { coords: [[5, 5]], length: 1 }, //Destroyer info
            { coords: [[5, 10]], length: 1 }, //Destroyer info
            { coords: [[10, 7]], length: 1 }, //Destroyer info
        ];
        gameboard.placeShips(dummySelectedPositions); //calling placeShips method with our dummy data
        console.log(gameboard.ships);
        expect(gameboard.ships).toEqual([
            {
                length: 4,
                _hits: 0,
                _sunk: false,
                _coords: [
                    [7, 3],
                    [8, 3],
                    [9, 3],
                    [10, 3],
                ],
            },
            {
                length: 3,
                _hits: 0,
                _sunk: false,
                _coords: [
                    [2, 2],
                    [3, 2],
                    [4, 2],
                ],
            },
            {
                length: 3,
                _hits: 0,
                _sunk: false,
                _coords: [
                    [7, 5],
                    [7, 6],
                    [7, 7],
                ],
            },
            {
                length: 2,
                _hits: 0,
                _sunk: false,
                _coords: [
                    [2, 5],
                    [2, 6],
                ],
            },
            {
                length: 2,
                _hits: 0,
                _sunk: false,
                _coords: [
                    [1, 9],
                    [2, 9],
                ],
            },
            {
                length: 2,
                _hits: 0,
                _sunk: false,
                _coords: [
                    [7, 9],
                    [7, 10],
                ],
            },
            { length: 1, _hits: 0, _sunk: false, _coords: [[4, 8]] },
            { length: 1, _hits: 0, _sunk: false, _coords: [[5, 5]] },
            { length: 1, _hits: 0, _sunk: false, _coords: [[5, 10]] },
            { length: 1, _hits: 0, _sunk: false, _coords: [[10, 7]] },
        ]);
    });

    test("the placeShips method will record each ship's position in the board property with 'S'.", () => {
        const gameboard = new Gameboard();
        const dummySelectedPositions = [
            {
                coords: [
                    [7, 3],
                    [8, 3],
                    [9, 3],
                    [10, 3],
                ],
                length: 4, //Battleship info
            },
            {
                coords: [
                    [2, 2],
                    [3, 2],
                    [4, 2],
                ],
                length: 3, //Cruiser info
            },
            {
                coords: [
                    [7, 5],
                    [7, 6],
                    [7, 7],
                ],
                length: 3, //Cruiser info
            },
            {
                coords: [
                    [2, 5],
                    [2, 6],
                ],
                length: 2, //Sub info
            },
            {
                coords: [
                    [1, 9],
                    [2, 9],
                ],
                length: 2, //Sub info},
            },
            {
                coords: [
                    [7, 9],
                    [7, 10],
                ],
                length: 2, //Sub info},
            },
            { coords: [[4, 8]], length: 1 }, //Destroyer info
            { coords: [[5, 5]], length: 1 }, //Destroyer info
            { coords: [[5, 10]], length: 1 }, //Destroyer info
            { coords: [[10, 7]], length: 1 }, //Destroyer info
        ];
        gameboard.placeShips(dummySelectedPositions); //calling placeShips method with our dummy data
        //let infoArr = [];
        //need to construct an array in the suitable format to be passed to the board(info)setter
        //needs to be like: [[2,3,'S],[2,4,'S]]

        expect(gameboard.board).toEqual([
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            ["1", "-", "-", "-", "-", "-", "-", "-", "-", "S", "-"],
            ["2", "-", "S", "-", "-", "S", "S", "-", "-", "S", "-"],
            ["3", "-", "S", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["4", "-", "S", "-", "-", "-", "-", "-", "S", "-", "-"],
            ["5", "-", "-", "-", "-", "S", "-", "-", "-", "-", "S"],
            ["6", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
            ["7", "-", "-", "S", "-", "S", "S", "S", "-", "S", "S"],
            ["8", "-", "-", "S", "-", "-", "-", "-", "-", "-", "-"],
            ["9", "-", "-", "S", "-", "-", "-", "-", "-", "-", "-"],
            ["10", "-", "-", "S", "-", "-", "-", "S", "-", "-", "-"],
        ]);
    });

    test("the checkMove method will take a set of coords and check to see if the move is valid, returning true or false", () => {
        const gameboard = new Gameboard();
        const dummyMove = [2, 2];
        const isValid = gameboard.checkMove(dummyMove);
        expect(isValid).toStrictEqual(true);
    });
    test("the hitMiss method will take the set of valid move coords and check if it's a hit (if 'S' at coords) or if it's a miss ('-' at coords). It returns 'hit' or 'miss", () => {
        const gameboard = new Gameboard();
        const validMove = [2, 2];
        const hitOrMiss = gameboard.hitMiss(validMove);
        expect(hitOrMiss).toBe("miss");
    });

    //test("the receiveAttack method will take a set of passed coords and store them. It should call checkGame() for validity check, call hitMiss(), and conditionally update board, ships, hits,and sunk before calling checkGame()")
});
