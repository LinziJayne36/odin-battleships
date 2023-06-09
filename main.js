import "normalize.css";
import "./style.css";
import Player from "./app-logic/player";
import ComputerPlayer from "./app-logic/computerPlayer";
import Gameboard from "./app-logic/gameboard";
import Game from "./app-logic/game";
import Grid from "./ui/grid";
import {
    getPlayerAttackInput,
    getRandomShipPlacements,
} from "./dom-interactions/domInteraction";
import { startBtnDisplay } from "./ui/start";
import { gameTitleDisplay } from "./ui/gameTitle";
import { orientationBtnDisplay } from "./ui/orientation";
import PlayerFleet from "./ui/fleet";
import { randomBtnDisplay } from "./ui/random";
import { droppedShips } from "./ui/dNd";
import { trackDroppedShipsArr } from "./ui/dNd";
//import { handlingGridClicks } from "./dom-interactions/domInteraction";
import Ship from "./app-logic/ship";
let computerTurn = {
    val: false,
};
gameTitleDisplay("add");
startBtnDisplay("add");
const playerFleetUI = new PlayerFleet();
async function gameLoop() {
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
            alert(`${game.whoWon} WINS!`);
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
    //setup the game
    console.log("gameLoop was called");
    startBtnDisplay("remove");
    gameTitleDisplay("remove");

    let validMove = false;
    const game = new Game();

    //AT THIS POINT WE'D NEED TO GET THE PLAYER'S SELECTION OF COORDS FOR HIDING THEIR SHIPS
    //SO, START WORK ON DOM INTERACTION MODULE NOW...
    //FOR NOW WE CAN CALL THE GENERATERANDOMPOSITIONS METHOD INSTEAD

    const player = new Player();
    const playerGameboard = new Gameboard();
    console.log(playerGameboard.board);
    console.log("Next is the player's selected ship placement data");
    //player ship placement options to be created and choices integrated...
    //generate placement grid
    const playerPlacementGrid = new Grid("playerPlacementGrid");
    playerPlacementGrid.drawGrid();
    randomBtnDisplay("add");
    orientationBtnDisplay("add");
    /*let randomPlacementSelected = false;
    const getUserInputPlacements = () => {
        return new Promise((resolve) => {
            const randomBtn = document.getElementById("randomBtn");

            randomBtn.addEventListener("click", async (ev) => {
                const playerPositions = await player.generateRandomPositions();
                console.log(
                    "Next is the player's gameboard with the ships placed on it"
                );
                playerGameboard.placeShips(playerPositions);
                console.log(playerGameboard.board);
                randomPlacementSelected = true;
                console.log(randomPlacementSelected);
                randomBtnDisplay("remove");
                const appWrapper = document.getElementById("app");
                const placementGrid = document.querySelector(
                    ".playerPlacementGrid"
                );
                const fleetWrapper = document.querySelector(".fleetWrapper");
                appWrapper.removeChild(fleetWrapper);
                appWrapper.removeChild(placementGrid);
                alert("all ships placed - game begins");

                resolve(randomPlacementSelected);
            });
        });
    };*/

    let randomPlacementSelected = false;

    const getUserInputPlacements = () => {
        return new Promise((resolve) => {
            const randomBtn = document.querySelector("#randomBtn");
            const gameboardElement = document.querySelector(
                ".playerPlacementGrid"
            );

            const handleDragDrop = () => {
                randomPlacementSelected = false;
                resolve(randomPlacementSelected);
            };

            randomBtn.addEventListener("click", async (ev) => {
                const playerPositions = await player.generateRandomPositions();
                console.log(
                    "Next is the player's gameboard with the ships placed on it"
                );
                playerGameboard.placeShips(playerPositions);
                console.log(playerGameboard.board);
                randomPlacementSelected = true;
                console.log(randomPlacementSelected);
                randomBtnDisplay("remove");
                orientationBtnDisplay("remove");
                const appWrapper = document.getElementById("app");
                const placementGrid = document.querySelector(
                    ".playerPlacementGrid"
                );
                const fleetWrapper = document.querySelector(".fleetWrapper");
                appWrapper.removeChild(fleetWrapper);
                appWrapper.removeChild(placementGrid);
                alert("all ships placed - game begins");

                resolve(randomPlacementSelected);
            });

            // Listen for drag/drop events on the gameboard
            gameboardElement.addEventListener("drag", handleDragDrop);
            gameboardElement.addEventListener("drop", handleDragDrop);
        });
    };

    // create the ui for player fleet placement
    console.log(
        "THIS IS WHERE WE CREATE PLAYERFLEETUI !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1"
    );
    const playerFleetUI = new PlayerFleet();
    playerFleetUI.drawPlayerFleet();

    //TODO now we need to wait for the player to select their ship placements... ... ... !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const randomPlacementInput = await getUserInputPlacements();
    console.log("are we getting past our random function promise?");
    //if randomPlacementSelected is true then clear the selection screen and populate gametime screen!
    if (randomPlacementInput === true) {
        //clear the selection screen and populate gametime screen!
        console.log(`randomPlacementInput says: ${randomPlacementInput}`);
    } else {
        console.log(`randomPlacementInput says: ${randomPlacementInput}`);
        //so then we must wait for player to select all their ships manually
        //console.log(droppedShips);
        //playerGameboard.placeShips(droppedShips);
        //console.log(droppedShips);
        const droppedShipsArr = await trackDroppedShipsArr(); //atm, this resolves each and every time the array receives a single

        console.log(
            "Are we getting past our trackDroppedShipsArr promise, because if it is not resolving then we really shouldn't be seeing this log"
        );
        console.log(droppedShipsArr);

        //gameTitleDisplay("remove");

        //clear the selection screen and populate gametime screen!
        playerGameboard.placeShips(droppedShipsArr);
        randomBtnDisplay("remove");
        orientationBtnDisplay("remove");
        const appWrapper = document.getElementById("app");
        const placementGrid = document.querySelector(".playerPlacementGrid");
        appWrapper.removeChild(placementGrid);
    }

    //player and computer grids are created...
    const computerGrid = new Grid("computerGrid");
    computerGrid.drawGrid();

    const playerGrid = new Grid("playerGrid");
    playerGrid.drawGrid();

    /*const playerPositions = await player.generateRandomPositions(); //will only need to run if player presses random button...
    console.log("Next is the player's gameboard with the ships placed on it");
    playerGameboard.placeShips(playerPositions);
    console.log(playerGameboard.board);*/

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
                player.attackSq = null;
                //repeat until valid coords are provided
                //get player coords for attack on computerGameboard

                // Wait for the user to select a square
                console.log("player to click a square...");
                const selectedSquare = await getPlayerAttackInput(
                    "computerSquares"
                ); //waiting for player to make their move on cells with class of 'computerSquares'... ... ...
                console.log(selectedSquare);
                //now, must set the attackSq property of player on player obj
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
                    computerGrid.drawShot(player.attackSq, "X");
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
                    computerGrid.drawShot(player.attackSq, "/");
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
            // Wait for 3 seconds before calculating computer's move... ... ...
            await new Promise((resolve) => setTimeout(resolve, 3000));
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
                playerGrid.drawShot(computerPlayer.attackSq, "X");
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
                playerGrid.drawShot(computerPlayer.attackSq, "/");

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

export { gameLoop, playerFleetUI };
