import "normalize.css";
import "./style.css";
import Player from "./app-logic/player";
import ComputerPlayer from "./app-logic/computerPlayer";
import Gameboard from "./app-logic/gameboard";
import Game from "./app-logic/game";
import Grid from "./ui/grid";
import { getPlayerAttackInput } from "./dom-interactions/domInteraction";
//import { handlingGridClicks } from "./dom-interactions/domInteraction";
import Ship from "./app-logic/ship";
let computerTurn = {
    val: false,
};

async function gameLoop() {
    //setup the game
    console.log("gameLoop was called");
    //let computerTurn = false;

    let validMove = false;
    const game = new Game();
    /*const computerGrid = new Grid((row, col) => {
        console.log(`grid got clicked at ${row},${col}`);
    });
    computerGrid.drawGrid();*/

    const computerGrid = new Grid();
    computerGrid.drawGrid();

    //checkGame function
    function checkGame() {
        console.log(
            "checkGame() was just called ---------------------------------------------------------"
        );
        //check in player and computer gameboards to see if the sunk property on either one === 10
        //if it does it sets game.isWon = true, and game.whoWon = the winning player
        console.log(playerGameboard.sunk);
        if (playerGameboard.sunk === 10 || computerGameboard.sunk === 10) {
            console.log(
                `when checkGame runs, the number of sunk player's ships is ${playerGameboard.sunk} and the number of sunk computer ships is ${computerGameboard.sunk} `
            );
            game.isWon = true;
            if (playerGameboard.sunk === 10) {
                game.whoWon = "COMPUTER";
            } else if (computerGameboard.sunk === 10) {
                game.whoWon = "PLAYER";
            }

            console.log("GAME OVER");
            console.log(`${game.whoWon} WINS!`);
        } else if (
            playerGameboard.shipsLeft < 10 ||
            computerGameboard.shipsLeft < 10
        ) {
            console.log(
                `when checkGame runs, the number of ships left on playerGameboard is ${playerGameboard.sunk}`
            );
            game.isWon = false;
            //game.whoWon = "computerPlayer";
        } else if (playerGameboard.sunk > 10 || computerGameboard.sunk > 10) {
            //else do nothing
            throw console.error(
                "Whoa!!! The number of sunk ships should NEVER be more than 10!!!!"
            );
        }
    }

    //AT THIS POINT WE'D NEED TO GET THE PLAYER'S SELECTION OF COORDS FOR HIDING THEIR SHIPS
    //SO, START WORK ON DOM INTERACTION MODULE NOW...
    //FOR NOW WE CAN CALL THE GENERATERANDOMPOSITIONS METHOD INSTEAD

    const player = new Player();
    const playerGameboard = new Gameboard();
    console.log(playerGameboard.board);
    console.log("Next is the player's selected ship placement data");
    player.generateRandomPositions();
    console.log("Next is the player's gameboard with the ships placed on it");
    playerGameboard.placeShips(player.selectedPositions);
    console.log(playerGameboard.board);

    const computerPlayer = new ComputerPlayer();
    const computerGameboard = new Gameboard();
    console.log(computerGameboard.board);
    console.log("Next is the computerPlayer's selected ship placement data");
    computerPlayer.calcSelectedPositions();
    console.log(
        "next is the computerPlayer's gameboard with the ships placed on it"
    );
    computerGameboard.placeShips(computerPlayer.selectedPositions);
    console.log(computerGameboard.board);
    //let loops = 0;
    //enter the actual loop
    while (game.isWon === false) {
        // validMove = false;
        console.log("This is the start of a loop iteration");
        console.log(`The computerTurn variable says ${computerTurn.val}`);
        /*loops++;
        if (loops > 300) {
            game.isWon = true;
        }*/
        if (computerTurn.val === false) {
            //Take the PLAYER'S TURN -----------------------------------------------------------------------
            validMove = false;
            let playerMove;
            while (validMove === false) {
                player._attackSq = null;
                //repeat until valid coords are provided
                //get player coords for attack on computerGameboard

                // Wait for the user to select a square
                console.log("player to click a square...");
                const selectedSquare = await getPlayerAttackInput();
                console.log(selectedSquare);
                //now, must set the attackSq property of player
                player.attackSq = selectedSquare;
                //player.calcAttackSq();

                console.log("New attack square calculated by player object");
                //player.calcAttackSq() //will populate player.attackSq with move coords - redundant once user input can be gotten via ui
                if (player._attackSq === null) {
                    checkGame();
                    console.log(game.isWon);
                    console.log(computerGameboard.board);
                    throw error.console(
                        "calcAttackSq has not set the player move coords!"
                    );
                } else {
                    validMove = computerGameboard.checkMove(player.attackSq); // will set validMove to true if move is valid
                    console.log(
                        "next comes the true|false result of whether coordinates selected by player object are valid"
                    );

                    console.log(validMove);
                }
            }
            //once validMove is true, the follwing code will run...
            if (validMove === true) {
                if (computerGameboard.hitMiss(player.attackSq) === "hit") {
                    //if player's valid move against the computerGameboard is a hit...
                    console.log(
                        "next is the Player's attack square that has been deemed a hit - immediately before an X is placed in the board"
                    );
                    console.log(player.attackSq);
                    computerGameboard.updateBoard([
                        [player.attackSq[0], player.attackSq[1], "X"],
                    ]);
                    //update hit property of relevant ship object (find obj in computerGameboard.ships arr with coord same as player move)
                    const shipToHit = computerGameboard.ships.find((ship) => {
                        console.log(ship);
                        return ship.coords.some((coord) => {
                            return (
                                coord[0] === player.attackSq[0] &&
                                coord[1] === player.attackSq[1]
                            );
                        });
                    });
                    console.log(shipToHit);
                    if (shipToHit) {
                        shipToHit.hit();
                    }

                    //update hits array on computerGameboard by adding the successful hit coords to the hits array
                    computerGameboard.hits = player.attackSq;

                    //update sunk on computerGameboard
                    const sunkNum = computerGameboard.ships.filter(
                        (ship) => ship.sunk === true
                    ).length;
                    computerGameboard._sunk = sunkNum; //setting the number of sunk ships on a gameboard to be the number of ship objects with a sunk property that equals true...
                    console.log(sunkNum);
                    /* const sunkShip = computerGameboard.ships.filter(
                    (ship) => ship.sunk === true
                );

                if (sunkShip != []) {
                    console.log(sunkShip);
                    computerGameboard.issunk(sunkShip);
                }*/

                    checkGame();
                    if (game.isWon) {
                        console.log("game is won");
                        //if game is won, end game and declare winner
                        //end of game - announce the winner
                    }

                    //because move was a hit, computerTurn is left as false and player takes another turn...
                } else if (
                    computerGameboard.hitMiss(player.attackSq) === "miss"
                ) {
                    console.log(
                        "next is the player's attack square that has been deemed a miss on enemy board- immediately before an / is placed in the board"
                    );
                    console.log(player.attackSq);
                    //update computerGameboard.misses with coord of missed shot
                    computerGameboard.misses.push(player.attackSq);

                    //update computerGameboard.board with a '/'
                    computerGameboard.updateBoard([
                        [player.attackSq[0], player.attackSq[1], "/"],
                    ]);
                    console.log(computerGameboard.board);
                    //set computerTurn to true as the player's turn is now over because they did not get a hit
                    computerTurn.val = true;
                }
            } else if (!validMove) {
                /*alert of invalid move*/ console.log(
                    "Invalid player move - choose again!!!"
                );
                throw console.error("Whoa!!! checkMove evaluated to false");
            }
        } else if (computerTurn.val === true) {
            //Take the COMPUTER'S TURN turn --------------------------------------------------------------------
            computerPlayer.calcAttackSq();
            console.log(
                "next is a log of the result from running computerPlayer.calcAttackSq() to get the computer's move..."
            );
            console.log(computerPlayer.attackSq);
            if (playerGameboard.hitMiss(computerPlayer.attackSq) === "hit") {
                //If computerPlayer's move against the players board is a hit...
                console.log(
                    "Next is the computerPlayer's attack square that hit the player's board - immediately before an X is placed on the players board"
                );
                console.log(computerPlayer.attackSq);
                //update the player's gameboard board porperty with the coordinated of the computerPlayer's successful hit
                playerGameboard.updateBoard([
                    [
                        computerPlayer.attackSq[0],
                        computerPlayer.attackSq[1],
                        "X",
                    ],
                ]);

                //update hit property of relevant ship object (find obj in ships arr with coord same as player move)
                const shipToHit = playerGameboard.ships.find((ship) => {
                    return ship.coords.some((coord) => {
                        return (
                            coord[0] === computerPlayer.attackSq[0] &&
                            coord[1] === computerPlayer.attackSq[1]
                        );
                    });
                });
                console.log(shipToHit);
                if (shipToHit) {
                    shipToHit.hit();
                }

                //update hits on playerGameboard by adding the successful hit coords to the hits array
                playerGameboard.hits = computerPlayer.attackSq;

                //update sunk on playerGameboard
                const sunkNum = playerGameboard.ships.filter(
                    (ship) => ship.sunk === true
                ).length;
                console.log(sunkNum);
                playerGameboard._sunk = sunkNum; //not sure that this is right - should we not instead be updating the number of sunk ships on gameboard by calling isSunk on it?

                /* const sunkShip = playerGameboard.ships.filter(
                    (ship) => ship._sunk === true
                );

                if (sunkShip != []) {
                    console.log(sunkShip);
                    playerGameboard.issunk(sunkShip);
                }*/

                checkGame();
                if (game.isWon) {
                    //if game is won, end game and declare winner
                    console.log("Game is won");
                }
                //because move was a hit, computerTurn is left as true and computerPlayer takes another turn...
            } else if (
                playerGameboard.hitMiss(computerPlayer.attackSq) === "miss"
            ) {
                console.log(
                    "next is the computerPlayer's attack square that has been deemed a miss on enemy board - immediately before / is marked on their board"
                );
                console.log(computerPlayer.attackSq);
                //update playerGameboard.misses with coord of missed shot
                playerGameboard.misses.push(computerPlayer.attackSq);
                console.log(
                    "playerGameboard.misses array has just been updated with coord of missed shot"
                );

                //update board property of playerGameboard.board with a '/'
                playerGameboard.updateBoard([
                    [
                        computerPlayer.attackSq[0],
                        computerPlayer.attackSq[1],
                        "/",
                    ],
                ]);

                //set computerTurn to false as the computerPlayer's turn is now over because they did not get a hit
                computerTurn.val = false;
                console.log(
                    `this is the value of computerTurn, which should be false as the computer's turn should have ended: ${computerTurn.val}`
                );
                console.log(
                    `and this is the current value of isWon, which should always be false if the game is still looping: ${game.isWon}`
                );
                console.log(
                    "Next comes a breakdown of what is inside the playerGameboard..."
                );
                console.log(playerGameboard.board);
                console.log(playerGameboard.ships);
                console.log(playerGameboard.hits);
                console.log(playerGameboard.misses);
                console.log(playerGameboard.sunk);
            }
            console.log(computerTurn.val);
        }
    }
    console.log(
        `We just broke out of the main game while loop... isWon is testing ${game.isWon}`
    );
    console.log(
        "Next comes a breakdown of what is inside the playerGameboard..."
    );
    console.log(playerGameboard.board);
    console.log(playerGameboard.ships);
    console.log(playerGameboard.hits);
    console.log(playerGameboard.misses);
    console.log(playerGameboard.sunk);

    console.log(
        "Next comes a breakdown of what is inside the computerPlayerGameboard..."
    );
    console.log(computerGameboard.board);
    console.log(computerGameboard.ships);
    console.log(computerGameboard.hits);
    console.log(computerGameboard.misses);
    console.log(computerGameboard.sunk);
}

/*
import gameLoop from "../main";
import { describe, expect, test } from "vitest";
describe("#gameLoop", () => {
    test("the gameLoop function will be defined", () => {
        expect(gameLoop()).toBeDefined;
        //expect(playerGameboard.attackSq).toBe(null);
    });
});
*/
export default gameLoop;
