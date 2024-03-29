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
import { userMsg } from "./ui/userMsg";
import { gameOverMsg } from "./ui/gameOver";
import { sunkMsg } from "./ui/sunk";
import { restartBtnDisplay } from "./ui/restart";
import { playSound } from "./ui/playSound";

//import { handlingGridClicks } from "./dom-interactions/domInteraction";
import Ship from "./app-logic/ship";
let computerTurn = {
    val: false,
};

//smart state for computer player
let lastHit = [];
let possTargets = [];

let orientationBtnLabel = "vertical";
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
            //alert(`${game.whoWon} WINS!`);
            if (game.whoWon === "COMPUTER") {
                playSound("lose");
            } else if (game.whoWon === "PLAYER") {
                //play win sound
                playSound("win");
            }
            gameOverMsg(`GAME OVER! ${game.whoWon} WINS!`, "add");
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
    let randomPlacementSelected = false;
    const playerGrid = new Grid("playerGrid");
    const getUserInputPlacements = () => {
        return new Promise((resolve) => {
            const randomBtn = document.querySelector("#randomBtn");
            const gameboardElement = document.querySelector(
                ".playerPlacementGrid"
            );
            const orientationBtn = document.querySelector("#orientationBtn");

            const handleDragDrop = () => {
                randomPlacementSelected = false;
                resolve(randomPlacementSelected);
            };

            orientationBtn.addEventListener("click", (ev) => {
                const draggableShips = document.querySelectorAll(
                    'div[draggable="true"], .fleetWrapper, .typeWrapper, .shipCell, .cruiserCell, .battleshipCell, .subCell'
                );
                console.log(orientationBtnLabel);

                if (orientationBtnLabel === "horizontal") {
                    //switch to vertical label on button - this means the actual ship orientation is currently horizontal!
                    orientationBtnLabel = "vertical";
                    orientationBtn.innerText = "VERTICAL";
                    //remove the 'vertical' class from the ships in the fleet area
                    draggableShips.forEach((div) => {
                        if (div.classList.contains("vertical")) {
                            div.classList.remove("vertical");
                            console.log(
                                "Here is where we should reset the correct width for horizontal"
                            );
                        }
                    });

                    console.log(
                        `orientationBtnLabel variable now says: ${orientationBtnLabel}`
                    );
                } else if (orientationBtnLabel === "vertical") {
                    //switch to horizontal label on button - this means actual ship orientation is currently vertical!
                    orientationBtnLabel = "horizontal";
                    orientationBtn.innerText = "HORIZONTAL";
                    //add the 'vertical' class to the ships in the fleet area

                    //orientationBtn.classList.add("vertical");
                    //TODO: add class vertical to all divs with a draggable=true attribute
                    draggableShips.forEach((div) => {
                        div.classList.add("vertical");
                        console.log(
                            "here is where we should reset the height for vertical"
                        );
                    });
                    console.log(
                        `orientationBtnLabel variable now says: ${orientationBtnLabel} which is the value of the label on the button`
                    );
                }

                const cruisers = document.querySelectorAll(
                    ".typeWrapper .cruiser"
                );
                cruisers.forEach((ship) => {
                    console.log(ship);
                    if (!ship.classList.contains("vertical")) {
                        console.log(
                            "the ship element does not have vertical class"
                        );
                        ship.style.width = "149px";
                        ship.style.height = "47px";
                    } else if (ship.classList.contains("vertical")) {
                        console.log(
                            "the ship element does have the vertical class "
                        );
                        ship.style.height = "149px";
                        ship.style.width = "47px";
                    }
                });

                const subs = document.querySelectorAll(".typeWrapper .sub");
                subs.forEach((subShip) => {
                    if (!subShip.classList.contains("vertical")) {
                        subShip.style.width = "96px";
                        subShip.style.height = "47px";
                    } else if (subShip.classList.contains("vertical")) {
                        subShip.style.height = "96px";
                        subShip.style.width = "47px";
                    }
                });
            });
            let playerPositions;
            randomBtn.addEventListener("click", async (ev) => {
                playerPositions = await player.generateRandomPositions();
                //TODO: add and reference class method on grid.js to draw randomly positioned ships on the player grid... ...
                //player.selectedPositions should give us the randomly selected ships's positions...
                playerPlacementGrid.drawPositionedShips(playerPositions);
                console.log(
                    "Next is the player's gameboard with the ships placed on it"
                );
                playerGameboard.placeShips(playerPositions);
                console.log(playerGameboard.board);
                randomPlacementSelected = true;
                console.log(randomPlacementSelected);
                randomBtnDisplay("remove");
                //TODO: promise timeout for ship positions to be displayed a while... ...
                await new Promise((resolve) => setTimeout(resolve, 1700));

                orientationBtnDisplay("remove");
                const appWrapper = document.getElementById("app");
                const placementGrid = document.querySelector(
                    ".playerPlacementGrid"
                );
                const fleetWrapper = document.querySelector(".fleetWrapper");
                appWrapper.removeChild(fleetWrapper);
                appWrapper.removeChild(placementGrid);
                //("allalert ships placed - game begins");
                playerGrid.drawGrid();
                playerGrid.drawPositionedShips(playerPositions);
                resolve(randomPlacementSelected);
            });

            // Listen for drag/drop events on the gameboard
            gameboardElement.addEventListener("drag", handleDragDrop);
            gameboardElement.addEventListener("drop", handleDragDrop);
        });
    };

    // create the ui for player fleet placement
    console.log(
        "THIS IS WHERE WE CREATE PLAYERFLEETUI !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
    const playerFleetUI = new PlayerFleet();
    playerFleetUI.drawPlayerFleet();

    //TODO now we need to wait for the player to select their ship placements... ... ... !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const randomPlacementInput = await getUserInputPlacements();
    let droppedShipsArr;
    //if randomPlacementSelected is true then clear the selection screen and populate gametime screen!
    if (randomPlacementInput === false) {
        console.log(`randomPlacementInput says: ${randomPlacementInput}`);

        droppedShipsArr = await trackDroppedShipsArr();

        console.log(droppedShipsArr);

        //clear the selection screen and populate gametime screen!
        playerGameboard.placeShips(droppedShipsArr);
        randomBtnDisplay("remove");
        orientationBtnDisplay("remove");
        const appWrapper = document.getElementById("app");
        const placementGrid = document.querySelector(".playerPlacementGrid");
        appWrapper.removeChild(placementGrid);
    }

    if (droppedShipsArr !== undefined) {
        playerGrid.drawGrid();
        playerGrid.drawPositionedShips(droppedShipsArr);
    }

    const computerGrid = new Grid("computerGrid");
    computerGrid.drawGrid();

    if (randomPlacementInput === false) {
        playerGrid.drawPositionedShips(droppedShipsArr);
    }

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
    console.log(playerGameboard.ships);
    playSound("start");
    //enter the actual loop
    while (game.isWon === false) {
        // validMove = false;
        console.log("This is the start of a loop iteration");
        console.log(`The computerTurn variable says ${computerTurn.val}`);

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
                userMsg("It's your turn", "add");
                const selectedSquare = await getPlayerAttackInput(
                    "computerSquares"
                ); //waiting for player to make their move on cells with class of 'computerSquares'... ... ...
                console.log(selectedSquare);
                //now, must set the attackSq property of player on player obj
                player.attackSq = selectedSquare;
                //PLAY SHOT FIRED SOUND - will wait and play appropriate hit/miss/sunk sound depending on shot outcome
                //playFireShotSound("hit");
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
                    if (!validMove) {
                        userMsg(" ", "remove");
                    }
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
                    //PLAY HIT SOUND...
                    playSound("hit");
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

                    let shipType;
                    let sunkNeighbours = [];
                    if (shipToHit.sunk === true) {
                        shipType = shipToHit.stateType();
                        //alert(shipType);
                        computerGrid.drawSunkShip(shipToHit.coords);
                        //TODO: identify neighbouring squares...
                        let firstCoord = shipToHit.coords[0]; //this is the first coord of the sunk ship - use this to work out our neighbour squares
                        let secondCoord;
                        let orientation;
                        if (shipToHit.coords[1]) {
                            secondCoord = shipToHit.coords[1];
                            if (firstCoord[0] === secondCoord[0]) {
                                orientation = "horizontal";
                            } else {
                                orientation = "vertical";
                            }
                        }

                        let x = firstCoord[0];
                        let y = firstCoord[1];
                        if (shipToHit.length === 4) {
                            if (orientation === "horizontal") {
                                //ie if our ship lies horizontally...
                                sunkNeighbours.push([x - 1, y]);
                                sunkNeighbours.push([x - 1, y - 1]);
                                sunkNeighbours.push([x, y - 1]);
                                sunkNeighbours.push([x + 1, y - 1]);
                                sunkNeighbours.push([x + 1, y]);
                                sunkNeighbours.push([x - 1, y + 1]);
                                sunkNeighbours.push([x - 1, y + 2]);
                                sunkNeighbours.push([x - 1, y + 3]);
                                sunkNeighbours.push([x - 1, y + 4]);
                                sunkNeighbours.push([x, y + 4]);
                                sunkNeighbours.push([x + 1, y + 4]);
                                sunkNeighbours.push([x + 1, y + 3]);
                                sunkNeighbours.push([x + 1, y + 2]);
                                sunkNeighbours.push([x + 1, y + 1]);
                                console.log(sunkNeighbours);
                                sunkNeighbours.forEach((neighbour) => {
                                    let xSunk = neighbour[0];
                                    console.log(neighbour);
                                    computerGameboard.misses.push(neighbour);

                                    if (xSunk < 11) {
                                        computerGameboard.updateBoard([
                                            [neighbour[0], neighbour[1], "/"],
                                        ]);

                                        computerGrid.drawShot(neighbour, "/");
                                        console.log(computerGameboard.board);
                                    }
                                });
                            } else if (orientation === "vertical") {
                                //ie our ship lies vertically
                                sunkNeighbours.push([x - 1, y - 1]);
                                sunkNeighbours.push([x - 1, y]);
                                sunkNeighbours.push([x - 1, y + 1]);
                                sunkNeighbours.push([x, y + 1]);
                                sunkNeighbours.push([x + 1, y + 1]);
                                sunkNeighbours.push([x + 2, y + 1]);
                                sunkNeighbours.push([x + 3, y + 1]);
                                sunkNeighbours.push([x + 4, y + 1]);
                                sunkNeighbours.push([x + 4, y]);
                                sunkNeighbours.push([x + 4, y - 1]);
                                sunkNeighbours.push([x + 3, y - 1]);
                                sunkNeighbours.push([x + 2, y - 1]);
                                sunkNeighbours.push([x + 1, y - 1]);
                                sunkNeighbours.push([x, y - 1]);
                                console.log(sunkNeighbours);
                                sunkNeighbours.forEach((neighbour) => {
                                    let xSunk = neighbour[0];
                                    let ySunk = neighbour[1];
                                    console.log(neighbour);
                                    computerGameboard.misses.push(neighbour);

                                    if (xSunk < 11) {
                                        computerGameboard.updateBoard([
                                            [neighbour[0], neighbour[1], "/"],
                                        ]);

                                        computerGrid.drawShot(neighbour, "/");
                                        console.log(computerGameboard.board);
                                    }
                                });
                            }
                        } else if (shipToHit.length === 3) {
                            if (orientation === "horizontal") {
                                //ie if our ship lies horizontally...
                                sunkNeighbours.push([x - 1, y]);
                                sunkNeighbours.push([x - 1, y + 1]);
                                sunkNeighbours.push([x - 1, y + 2]);
                                sunkNeighbours.push([x - 1, y + 3]);
                                sunkNeighbours.push([x, y + 3]);
                                sunkNeighbours.push([x + 1, y + 3]);
                                sunkNeighbours.push([x + 1, y + 2]);
                                sunkNeighbours.push([x + 1, y + 1]);
                                sunkNeighbours.push([x + 1, y]);
                                sunkNeighbours.push([x + 1, y - 1]);
                                sunkNeighbours.push([x, y - 1]);
                                sunkNeighbours.push([x - 1, y - 1]);
                                console.log(sunkNeighbours);
                                sunkNeighbours.forEach((neighbour) => {
                                    let xSunk = neighbour[0];
                                    let ySunk = neighbour[1];
                                    console.log(neighbour);
                                    computerGameboard.misses.push(neighbour);

                                    if (xSunk < 11) {
                                        computerGameboard.updateBoard([
                                            [neighbour[0], neighbour[1], "/"],
                                        ]);

                                        computerGrid.drawShot(neighbour, "/");
                                        console.log(computerGameboard.board);
                                    }
                                });
                            } else if (orientation === "vertical") {
                                //ie our ship lies vertically
                                sunkNeighbours.push([x, y + 1]);
                                sunkNeighbours.push([x + 1, y + 1]);
                                sunkNeighbours.push([x + 2, y + 1]);
                                sunkNeighbours.push([x + 3, y + 1]);
                                sunkNeighbours.push([x + 3, y]);
                                sunkNeighbours.push([x + 3, y - 1]);
                                sunkNeighbours.push([x + 2, y - 1]);
                                sunkNeighbours.push([x + 1, y - 1]);
                                sunkNeighbours.push([x, y - 1]);
                                sunkNeighbours.push([x - 1, y - 1]);
                                sunkNeighbours.push([x - 1, y]);
                                sunkNeighbours.push([x - 1, y + 1]);
                                console.log(sunkNeighbours);
                                sunkNeighbours.forEach((neighbour) => {
                                    let xSunk = neighbour[0];
                                    let ySunk = neighbour[1];
                                    console.log(neighbour);
                                    computerGameboard.misses.push(neighbour);

                                    if (xSunk < 11) {
                                        computerGameboard.updateBoard([
                                            [neighbour[0], neighbour[1], "/"],
                                        ]);

                                        computerGrid.drawShot(neighbour, "/");
                                        console.log(computerGameboard.board);
                                    }
                                });
                            }
                        } else if (shipToHit.length === 2) {
                            if (orientation === "horizontal") {
                                //ie if our ship lies horizontally...
                                sunkNeighbours.push([x - 1, y]);
                                sunkNeighbours.push([x - 1, y + 1]);
                                sunkNeighbours.push([x - 1, y + 2]);
                                sunkNeighbours.push([x, y + 2]);
                                sunkNeighbours.push([x + 1, y + 2]);
                                sunkNeighbours.push([x + 1, y + 1]);
                                sunkNeighbours.push([x + 1, y]);
                                sunkNeighbours.push([x + 1, y - 1]);
                                sunkNeighbours.push([x, y - 1]);
                                sunkNeighbours.push([x - 1, y - 1]);
                                console.log(sunkNeighbours);
                                sunkNeighbours.forEach((neighbour) => {
                                    let xSunk = neighbour[0];
                                    let ySunk = neighbour[1];
                                    console.log(neighbour);
                                    computerGameboard.misses.push(neighbour);

                                    if (xSunk < 11) {
                                        computerGameboard.updateBoard([
                                            [neighbour[0], neighbour[1], "/"],
                                        ]);

                                        computerGrid.drawShot(neighbour, "/");
                                        console.log(computerGameboard.board);
                                    }
                                });
                            } else if (orientation === "vertical") {
                                //ie our ship lies vertically
                                sunkNeighbours.push([x - 1, y]);
                                sunkNeighbours.push([x - 1, y + 1]);
                                sunkNeighbours.push([x, y + 1]);
                                sunkNeighbours.push([x + 1, y + 1]);
                                sunkNeighbours.push([x + 2, y + 1]);
                                sunkNeighbours.push([x + 2, y]); //
                                sunkNeighbours.push([x + 2, y - 1]);
                                sunkNeighbours.push([x + 1, y - 1]);
                                sunkNeighbours.push([x, y - 1]);
                                sunkNeighbours.push([x - 1, y - 1]);
                                console.log(sunkNeighbours);
                                sunkNeighbours.forEach((neighbour) => {
                                    let xSunk = neighbour[0];
                                    let ySunk = neighbour[1];
                                    console.log(neighbour);
                                    computerGameboard.misses.push(neighbour);

                                    if (xSunk < 11) {
                                        computerGameboard.updateBoard([
                                            [neighbour[0], neighbour[1], "/"],
                                        ]);

                                        computerGrid.drawShot(neighbour, "/");
                                        console.log(computerGameboard.board);
                                    }
                                });
                            }
                        } else if (shipToHit.length === 1) {
                            sunkNeighbours.push([x - 1, y]);
                            sunkNeighbours.push([x - 1, y + 1]);
                            sunkNeighbours.push([x, y + 1]);
                            sunkNeighbours.push([x + 1, y + 1]);
                            sunkNeighbours.push([x + 1, y]);
                            sunkNeighbours.push([x + 1, y - 1]);
                            sunkNeighbours.push([x, y - 1]);
                            sunkNeighbours.push([x - 1, y - 1]);
                            console.log(sunkNeighbours);
                            sunkNeighbours.forEach((neighbour) => {
                                let xSunk = neighbour[0];
                                let ySunk = neighbour[1];
                                console.log(neighbour);
                                computerGameboard.misses.push(neighbour);

                                if (xSunk < 11) {
                                    computerGameboard.updateBoard([
                                        [neighbour[0], neighbour[1], "/"],
                                    ]);

                                    computerGrid.drawShot(neighbour, "/");
                                    console.log(computerGameboard.board);
                                }
                            });
                            /* sunkNeighbours.forEach((neighbour) => {
                                console.log(neighbour);
                                computerGameboard.misses.push(neighbour);
                                computerGameboard.updateBoard([
                                    [neighbour[0], neighbour[1], "/"],
                                ]);
                                computerGrid.drawShot(neighbour, "/");
                                console.log(computerGameboard.board);
                            });*/
                        }

                        //you sunk their ship
                        playSound("sunk");
                        sunkMsg(`You sunk their ${shipType}!`, "add");
                        await new Promise((resolve) =>
                            setTimeout(resolve, 1700)
                        );
                        sunkMsg("", "remove");
                        console.log(shipType);
                    }

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
                    //PLAY MISS SOUND
                    playSound("miss");
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
            userMsg("", "remove");
        } else if (computerTurn.val === true) {
            userMsg("It's the computer's turn...", "add");
            // Wait for 3 seconds before calculating computer's move... ... ...
            await new Promise((resolve) => setTimeout(resolve, 1800));
            //Take the COMPUTER'S TURN ----------------------------------------------------------------------------------------------------------
            if (possTargets.length > 0) {
                computerPlayer.calcAttackSq(possTargets);
            } else {
                computerPlayer.calcAttackSq();
            }

            console.log(
                "next is a log of the result from running computerPlayer.calcAttackSq() to get the computer's move..."
            );
            console.log(computerPlayer.attackSq);
            //TODO: check if the attack sq inner text has X or /
            let attackedElem = document.getElementById(
                `${computerPlayer.attackSq[0]},${computerPlayer.attackSq[1]}`
            );
            attackedElem.classList.add("computerTargeting");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            attackedElem.classList.remove("computerTargeting");

            if (
                attackedElem.innerText === "/" ||
                attackedElem.innerText === "X"
            ) {
                userMsg(" ", "remove");
                //computerPlayer.calcAttackSq();
            }
            if (playerGameboard.hitMiss(computerPlayer.attackSq) === "hit") {
                //If computerPlayer's move against the players board is a hit...
                console.log(
                    "Next is the computerPlayer's attack square that hit the player's board - immediately before an X is placed on the players board"
                );
                console.log(computerPlayer.attackSq);
                console.log(attackedElem);
                lastHit.push(computerPlayer.attackSq);
                console.log(lastHit);
                const sortedHits = (hitsArr) => {
                    const comparator = (a, b) => {
                        // If the y-coordinates are different, sort by y-coordinate
                        if (a[1] !== b[1]) {
                            return a[1] - b[1];
                        }

                        // If the y-coordinates are the same, sort by x-coordinate
                        return a[0] - b[0];
                    };

                    // Create a copy of the hitsArr and sort the new array using the comparator function
                    const sortedArr = [...hitsArr].sort(comparator);

                    return sortedArr;
                };
                let lastHits = sortedHits(lastHit);
                console.log(lastHit);
                console.log(lastHits);

                //figure out the possible active neighbour squares based on contents of lastHit array and push to possTargets array
                if (lastHits.length === 1) {
                    // When a single hit is recorded in lastHit array
                    let x = lastHits[0][0];
                    let y = lastHits[0][1];
                    console.log(x);
                    console.log(y);
                    possTargets = [];
                    //working out the potential target squares neighbouring the hit cell -
                    //only pushing them to possTargets if they are within bounds of board
                    if (x - 1 < 11 && y < 11 && x - 1 > 0 && y > 0) {
                        possTargets.push([x - 1, y]);
                    }

                    if (x < 11 && y + 1 < 11 && x > 0 && y + 1 > 0) {
                        possTargets.push([x, y + 1]);
                    }

                    if (x + 1 < 11 && y < 11 && x + 1 > 0 && y > 0) {
                        possTargets.push([x + 1, y]);
                    }

                    if (x < 11 && y - 1 < 11 && x > 0 && y - 1 > 0) {
                        possTargets.push([x, y - 1]);
                    }

                    console.log(possTargets);
                } else if (lastHits.length === 2) {
                    // When 2 hits are recorded in lastHit array

                    // setting x and y variables for the first cell in lastHit array...
                    let xCell1 = lastHits[0][0];
                    let yCell1 = lastHits[0][1];

                    // setting x and y variables for the second cell in lastHit array...
                    let xCell2 = lastHits[1][0];
                    let yCell2 = lastHits[1][1];

                    console.log(xCell1);
                    console.log(yCell1);
                    console.log(xCell2);
                    console.log(yCell2);
                    console.log(lastHits);

                    // determine orientation of the ship taking repeated hits and record in orientation variable
                    let orientation;
                    if (xCell1 === xCell2) {
                        orientation = "horizontal";
                    } else if (yCell1 === yCell2) {
                        orientation = "vertical";
                    }

                    if (orientation === "horizontal") {
                        //TODO: Write code for working out try squares when multiple hits are recorded in lastHit array and we know the ship
                        // to which they belong lies horizontally
                        // then push to possTargets array
                        possTargets = [];
                        if (
                            xCell1 < 11 &&
                            yCell1 < 11 &&
                            xCell1 > 0 &&
                            yCell1 > 1 &&
                            xCell2 < 11 &&
                            yCell2 < 11 &&
                            xCell2 > 0 &&
                            yCell2 > 0
                        ) {
                            possTargets.push([xCell1, yCell1 - 1]);
                            //possTargets.push([xCell2, yCell2 + 1]);
                        }
                        if (
                            xCell1 < 11 &&
                            yCell1 < 11 &&
                            xCell1 > 0 &&
                            yCell1 > 0 &&
                            xCell2 < 11 &&
                            yCell2 < 10 &&
                            xCell2 > 0 &&
                            yCell2 > 0
                        ) {
                            //possTargets.push([xCell1, yCell1 - 1]);
                            possTargets.push([xCell2, yCell2 + 1]);
                        }
                    } else if (orientation === "vertical") {
                        //TODO: Write code for working out try squares when multiple hits are recorded in lastHit array and we know the ship
                        // to which they belong vertically
                        // then push to possTargets array
                        possTargets = [];
                        if (
                            xCell1 < 11 &&
                            yCell1 < 11 &&
                            xCell1 > 1 &&
                            yCell1 > 0 &&
                            xCell2 < 11 &&
                            yCell2 < 11 &&
                            xCell2 > 0 &&
                            yCell2 > 0
                        ) {
                            possTargets.push([xCell1 - 1, yCell1]);
                            //possTargets.push([xCell2 + 1, yCell2]);
                        }
                        if (
                            xCell1 < 11 &&
                            yCell1 < 11 &&
                            xCell1 > 0 &&
                            yCell1 > 0 &&
                            xCell2 < 10 &&
                            yCell2 < 11 &&
                            xCell2 > 0 &&
                            yCell2 > 0
                        ) {
                            //possTargets.push([xCell1 - 1, yCell1]);
                            possTargets.push([xCell2 + 1, yCell2]);
                        }
                    }
                } else if (lastHits.length === 3) {
                    // When 3 hits are recorded in lastHit array
                    let xCell1 = lastHits[0][0];
                    let yCell1 = lastHits[0][1];
                    let xCell2 = lastHits[1][0];
                    let yCell2 = lastHits[1][1];
                    let xCell3 = lastHits[2][0];
                    let yCell3 = lastHits[2][1];
                    console.log(xCell1);
                    console.log(yCell1);
                    console.log(xCell2);
                    console.log(yCell2);
                    console.log(xCell3);
                    console.log(yCell3);
                    let orientation;
                    //We will still only need to compare two consecutive cells from lastHit array to determine orientation
                    if (xCell1 === xCell2) {
                        orientation = "horizontal";
                    } else if (yCell1 === yCell2) {
                        orientation = "vertical";
                    }
                    if (orientation === "horizontal") {
                        if (
                            xCell1 < 11 &&
                            yCell1 < 11 &&
                            xCell1 > 0 &&
                            yCell1 > 1 &&
                            xCell2 < 11 &&
                            yCell2 < 11 &&
                            xCell2 > 0 &&
                            yCell2 > 0 &&
                            xCell3 < 11 &&
                            yCell3 < 10 && //fails test here ycell3 is 10
                            xCell3 > 0 &&
                            yCell3 > 0
                        ) {
                            possTargets = [];
                            possTargets.push([xCell1, yCell1 - 1]);
                            possTargets.push([xCell3, yCell3 + 1]);
                        } else if (
                            xCell1 === 10 &&
                            yCell1 < 11 &&
                            xCell1 > 0 &&
                            yCell1 >= 1 &&
                            xCell2 === 10 &&
                            yCell2 < 11 &&
                            xCell2 > 0 &&
                            yCell2 > 0 &&
                            xCell3 === 10 &&
                            yCell3 < 10 &&
                            xCell3 > 0 &&
                            yCell3 > 0
                        ) {
                            possTargets = [];
                            possTargets.push([xCell3, yCell3 + 1]);
                        } else if (
                            xCell1 < 11 &&
                            yCell1 < 11 &&
                            xCell1 > 0 &&
                            yCell1 === 1 &&
                            xCell2 < 11 &&
                            yCell2 < 11 &&
                            xCell2 > 0 &&
                            yCell2 > 0 &&
                            xCell3 < 11 &&
                            yCell3 < 10 && //fails test here ycell3 is 10
                            xCell3 > 0 &&
                            yCell3 > 0
                        ) {
                            possTargets.push([xCell3, yCell3 + 1]);
                        } else if (
                            xCell1 === 10 &&
                            yCell1 < 11 &&
                            xCell1 > 0 &&
                            yCell1 >= 1 &&
                            xCell2 === 10 &&
                            yCell2 < 11 &&
                            xCell2 > 0 &&
                            yCell2 > 0 &&
                            xCell3 === 10 &&
                            yCell3 === 10 &&
                            xCell3 > 0 &&
                            yCell3 > 0
                        ) {
                            possTargets = [];
                            // possTargets.push([xCell3, yCell3 + 1]);
                            possTargets.push([xCell1, yCell1 - 1]);
                        } else if (
                            xCell1 < 11 &&
                            yCell1 < 11 &&
                            xCell1 > 0 &&
                            yCell1 === 1 &&
                            xCell2 < 11 &&
                            yCell2 < 11 &&
                            xCell2 > 0 &&
                            yCell2 > 0 &&
                            xCell3 < 11 &&
                            yCell3 < 10 &&
                            xCell3 > 0 &&
                            yCell3 > 0
                        ) {
                            possTargets = [];
                            possTargets.push([xCell1, yCell1]);
                        } else if (
                            xCell1 < 11 &&
                            yCell1 < 11 &&
                            xCell1 > 0 &&
                            yCell1 > 1 &&
                            xCell2 < 11 &&
                            yCell2 < 11 &&
                            xCell2 > 0 &&
                            yCell2 > 0 &&
                            xCell3 < 11 &&
                            yCell3 === 10 &&
                            xCell3 > 0 &&
                            yCell3 > 0
                        ) {
                            possTargets = [];
                            possTargets.push([xCell1, yCell1 - 1]);
                        }
                    } else if (orientation === "vertical") {
                        if (
                            xCell1 < 11 &&
                            yCell1 < 11 &&
                            xCell1 > 1 &&
                            yCell1 > 0 &&
                            xCell2 < 11 &&
                            yCell2 < 11 &&
                            xCell2 > 0 &&
                            yCell2 > 0 &&
                            xCell3 < 10 &&
                            yCell3 < 11 &&
                            xCell3 > 0 &&
                            yCell3 > 0
                        ) {
                            possTargets = [];
                            possTargets.push([xCell1 - 1, yCell1]);
                            possTargets.push([xCell3 + 1, yCell3]);
                        } else if (
                            xCell1 < 11 &&
                            yCell1 < 11 &&
                            xCell1 > 1 &&
                            yCell1 > 0 &&
                            xCell2 < 11 &&
                            yCell2 < 11 &&
                            xCell2 > 0 &&
                            yCell2 > 0 &&
                            xCell3 === 10 &&
                            yCell3 < 11 &&
                            xCell3 > 0 &&
                            yCell3 > 0
                        ) {
                            possTargets = [];
                            possTargets.push([xCell1 - 1, yCell1]);
                        } else if (
                            xCell1 < 11 &&
                            yCell1 < 11 &&
                            xCell1 === 1 &&
                            yCell1 > 0 &&
                            xCell2 < 11 &&
                            yCell2 < 11 &&
                            xCell2 > 0 &&
                            yCell2 > 0 &&
                            xCell3 < 10 &&
                            yCell3 < 11 &&
                            xCell3 > 0 &&
                            yCell3 > 0
                        ) {
                            possTargets = [];
                            possTargets.push([xCell1, yCell1]);
                        }
                    }
                }
                console.log(possTargets);
                playSound("hit");
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
                playerGameboard._sunk = sunkNum;

                let shipType;
                let sunkNeighbours = [];
                if (shipToHit.sunk === true) {
                    shipType = shipToHit.stateType();
                    //alert(shipType);
                    playerGrid.drawSunkShip(shipToHit.coords);
                    //Empty lastHit array...
                    lastHit = [];
                    lastHits = [];
                    possTargets = [];
                    computerPlayer.targetPositions = null;
                    //identify neighbouring squares...

                    //let orderedShipCoords = shipToHit.coords.reverse();
                    function sortCoordinatesByGrid(arr) {
                        // Create a copy of the array to avoid modifying the original one
                        const sortedArray = [...arr];

                        // Custom sorting function for coordinate pairs
                        sortedArray.sort((a, b) => {
                            // Compare the first element (X coordinate)
                            if (a[0] !== b[0]) {
                                return a[0] - b[0];
                            }
                            // If the X coordinates are the same, compare the second element (Y coordinate)
                            return a[1] - b[1];
                        });

                        return sortedArray;
                    }

                    const sortedCoords = sortCoordinatesByGrid(
                        shipToHit.coords
                    );
                    console.log(sortedCoords); // Output: [[10, 1], [10, 2], [10, 3]]

                    // let firstCoord = reversedShipCoords[0]; //this fix did not work because although it fixes issue with horizontal 2 cell, it creates issues in others.
                    let firstCoord = sortedCoords[0];
                    //let firstCoord = shipToHit.coords[0]; //this is the first coord of the sunk ship - use this to work out our neighbour squares
                    console.log(shipToHit.coords);
                    let secondCoord;
                    let orientation;
                    if (sortedCoords[1]) {
                        secondCoord = sortedCoords[1];
                        if (firstCoord[0] === secondCoord[0]) {
                            orientation = "horizontal";
                        } else {
                            orientation = "vertical";
                        }
                    }
                    /*if (shipToHit.coords[1]) {
                        secondCoord = shipToHit.coords[1];
                        if (firstCoord[0] === secondCoord[0]) {
                            orientation = "horizontal";
                        } else {
                            orientation = "vertical";
                        }
                    }*/

                    let x = firstCoord[0];
                    let y = firstCoord[1];
                    //
                    if (shipToHit.length === 4) {
                        if (orientation === "horizontal") {
                            //ie if our ship lies horizontally...
                            sunkNeighbours.push([x - 1, y]);
                            sunkNeighbours.push([x - 1, y - 1]);
                            sunkNeighbours.push([x, y - 1]);
                            sunkNeighbours.push([x + 1, y - 1]);
                            sunkNeighbours.push([x + 1, y]);
                            sunkNeighbours.push([x - 1, y + 1]);
                            sunkNeighbours.push([x - 1, y + 2]);
                            sunkNeighbours.push([x - 1, y + 3]);
                            sunkNeighbours.push([x - 1, y + 4]);
                            sunkNeighbours.push([x, y + 4]);
                            sunkNeighbours.push([x + 1, y + 4]);
                            sunkNeighbours.push([x + 1, y + 3]);
                            sunkNeighbours.push([x + 1, y + 2]);
                            sunkNeighbours.push([x + 1, y + 1]);
                            console.log(sunkNeighbours);
                            sunkNeighbours.forEach((neighbour) => {
                                let xSunk = neighbour[0];
                                console.log(neighbour);
                                playerGameboard.misses.push(neighbour);

                                if (xSunk < 11) {
                                    playerGameboard.updateBoard([
                                        [neighbour[0], neighbour[1], "/"],
                                    ]);

                                    playerGrid.drawShot(neighbour, "/");
                                    console.log(playerGameboard.board);
                                }
                            });
                        } else if (orientation === "vertical") {
                            //ie our ship lies vertically
                            sunkNeighbours.push([x - 1, y - 1]);
                            sunkNeighbours.push([x - 1, y]);
                            sunkNeighbours.push([x - 1, y + 1]);
                            sunkNeighbours.push([x, y + 1]);
                            sunkNeighbours.push([x + 1, y + 1]);
                            sunkNeighbours.push([x + 2, y + 1]);
                            sunkNeighbours.push([x + 3, y + 1]);
                            sunkNeighbours.push([x + 4, y + 1]);
                            sunkNeighbours.push([x + 4, y]);
                            sunkNeighbours.push([x + 4, y - 1]);
                            sunkNeighbours.push([x + 3, y - 1]);
                            sunkNeighbours.push([x + 2, y - 1]);
                            sunkNeighbours.push([x + 1, y - 1]);
                            sunkNeighbours.push([x, y - 1]);
                            console.log(sunkNeighbours);
                            sunkNeighbours.forEach((neighbour) => {
                                let xSunk = neighbour[0];
                                let ySunk = neighbour[1];
                                console.log(neighbour);
                                playerGameboard.misses.push(neighbour);

                                if (xSunk < 11) {
                                    playerGameboard.updateBoard([
                                        [neighbour[0], neighbour[1], "/"],
                                    ]);

                                    playerGrid.drawShot(neighbour, "/");
                                    console.log(playerGameboard.board);
                                }
                            });
                        }
                    } else if (shipToHit.length === 3) {
                        if (orientation === "horizontal") {
                            //ie if our ship lies horizontally...
                            sunkNeighbours.push([x - 1, y]);
                            sunkNeighbours.push([x - 1, y + 1]);
                            sunkNeighbours.push([x - 1, y + 2]);
                            sunkNeighbours.push([x - 1, y + 3]);
                            sunkNeighbours.push([x, y + 3]);
                            sunkNeighbours.push([x + 1, y + 3]);
                            sunkNeighbours.push([x + 1, y + 2]);
                            sunkNeighbours.push([x + 1, y + 1]);
                            sunkNeighbours.push([x + 1, y]);
                            sunkNeighbours.push([x + 1, y - 1]);
                            sunkNeighbours.push([x, y - 1]);
                            sunkNeighbours.push([x - 1, y - 1]);
                            console.log(sunkNeighbours);
                            sunkNeighbours.forEach((neighbour) => {
                                let xSunk = neighbour[0];
                                let ySunk = neighbour[1];
                                console.log(neighbour);
                                playerGameboard.misses.push(neighbour);

                                if (xSunk < 11) {
                                    playerGameboard.updateBoard([
                                        [neighbour[0], neighbour[1], "/"],
                                    ]);

                                    playerGrid.drawShot(neighbour, "/");
                                    console.log(playerGameboard.board);
                                }
                            });
                        } else if (orientation === "vertical") {
                            //ie our ship lies vertically
                            sunkNeighbours.push([x, y + 1]);
                            sunkNeighbours.push([x + 1, y + 1]);
                            sunkNeighbours.push([x + 2, y + 1]);
                            sunkNeighbours.push([x + 3, y + 1]);
                            sunkNeighbours.push([x + 3, y]);
                            sunkNeighbours.push([x + 3, y - 1]);
                            sunkNeighbours.push([x + 2, y - 1]);
                            sunkNeighbours.push([x + 1, y - 1]);
                            sunkNeighbours.push([x, y - 1]);
                            sunkNeighbours.push([x - 1, y - 1]);
                            sunkNeighbours.push([x - 1, y]);
                            sunkNeighbours.push([x - 1, y + 1]);
                            console.log(sunkNeighbours);
                            sunkNeighbours.forEach((neighbour) => {
                                let xSunk = neighbour[0];
                                let ySunk = neighbour[1];
                                console.log(neighbour);
                                playerGameboard.misses.push(neighbour);

                                if (xSunk < 11) {
                                    playerGameboard.updateBoard([
                                        [neighbour[0], neighbour[1], "/"],
                                    ]);

                                    playerGrid.drawShot(neighbour, "/");
                                    console.log(playerGameboard.board);
                                }
                            });
                        }
                    } else if (shipToHit.length === 2) {
                        if (orientation === "horizontal") {
                            //ie if our ship lies horizontally...
                            sunkNeighbours.push([x - 1, y]);
                            sunkNeighbours.push([x - 1, y + 1]);
                            sunkNeighbours.push([x - 1, y + 2]);
                            sunkNeighbours.push([x, y + 2]);
                            sunkNeighbours.push([x + 1, y + 2]);
                            sunkNeighbours.push([x + 1, y + 1]);
                            sunkNeighbours.push([x + 1, y]);
                            sunkNeighbours.push([x + 1, y - 1]);
                            sunkNeighbours.push([x, y - 1]);
                            sunkNeighbours.push([x - 1, y - 1]);
                            console.log(sunkNeighbours);
                            sunkNeighbours.forEach((neighbour) => {
                                let xSunk = neighbour[0];
                                let ySunk = neighbour[1];
                                console.log(neighbour);
                                const allGridCells = document.querySelectorAll(
                                    `.${this.sqClass}`
                                );

                                playerGameboard.misses.push(neighbour);
                                if (xSunk < 11) {
                                    playerGameboard.updateBoard([
                                        [neighbour[0], neighbour[1], "/"],
                                    ]);

                                    playerGrid.drawShot(neighbour, "/");
                                    console.log(playerGameboard.board);
                                }
                            });
                        } else if (orientation === "vertical") {
                            //ie our ship lies vertically
                            sunkNeighbours.push([x - 1, y]);
                            sunkNeighbours.push([x - 1, y + 1]);
                            sunkNeighbours.push([x, y + 1]);
                            sunkNeighbours.push([x + 1, y + 1]);
                            sunkNeighbours.push([x + 2, y + 1]);
                            sunkNeighbours.push([x + 2, y]); //
                            sunkNeighbours.push([x + 2, y - 1]);
                            sunkNeighbours.push([x + 1, y - 1]);
                            sunkNeighbours.push([x, y - 1]);
                            sunkNeighbours.push([x - 1, y - 1]);
                            console.log(sunkNeighbours);
                            sunkNeighbours.forEach((neighbour) => {
                                let xSunk = neighbour[0];
                                let ySunk = neighbour[1];
                                console.log(neighbour);
                                playerGameboard.misses.push(neighbour);

                                if (xSunk < 11) {
                                    playerGameboard.updateBoard([
                                        [neighbour[0], neighbour[1], "/"],
                                    ]);

                                    playerGrid.drawShot(neighbour, "/");
                                    console.log(playerGameboard.board);
                                }
                            });
                        }
                    } else if (shipToHit.length === 1) {
                        sunkNeighbours.push([x - 1, y]);
                        sunkNeighbours.push([x - 1, y + 1]);
                        sunkNeighbours.push([x, y + 1]);
                        sunkNeighbours.push([x + 1, y + 1]);
                        sunkNeighbours.push([x + 1, y]);
                        sunkNeighbours.push([x + 1, y - 1]);
                        sunkNeighbours.push([x, y - 1]);
                        sunkNeighbours.push([x - 1, y - 1]);
                        console.log(sunkNeighbours);
                        sunkNeighbours.forEach((neighbour) => {
                            let xSunk = neighbour[0];
                            let ySunk = neighbour[1];
                            console.log(neighbour);
                            playerGameboard.misses.push(neighbour);

                            if (xSunk < 11) {
                                playerGameboard.updateBoard([
                                    [neighbour[0], neighbour[1], "/"],
                                ]);

                                playerGrid.drawShot(neighbour, "/");
                                console.log(playerGameboard.board);
                            }
                        });
                        /* sunkNeighbours.forEach((neighbour) => {
                                console.log(neighbour);
                                computerGameboard.misses.push(neighbour);
                                computerGameboard.updateBoard([
                                    [neighbour[0], neighbour[1], "/"],
                                ]);
                                computerGrid.drawShot(neighbour, "/");
                                console.log(computerGameboard.board);
                            });*/
                        //
                    }
                    if (shipToHit.length === 1) {
                        sunkNeighbours.push([x - 1, y]);
                        sunkNeighbours.push([x - 1, y + 1]);
                        sunkNeighbours.push([x, y + 1]);
                        sunkNeighbours.push([x + 1, y + 1]);
                        sunkNeighbours.push([x + 1, y]);
                        sunkNeighbours.push([x + 1, y - 1]);
                        sunkNeighbours.push([x, y - 1]);
                        sunkNeighbours.push([x - 1, y - 1]);
                        console.log(sunkNeighbours);
                        sunkNeighbours.forEach((neighbour) => {
                            let xSunk = neighbour[0];
                            let ySunk = neighbour[1];
                            console.log(neighbour);
                            playerGameboard.misses.push(neighbour);

                            if (xSunk < 11) {
                                playerGameboard.updateBoard([
                                    [neighbour[0], neighbour[1], "/"],
                                ]);

                                playerGrid.drawShot(neighbour, "/");
                                console.log(playerGameboard.board);
                            }
                        });
                    }

                    console.log(shipType);
                    playSound("sunk");
                    sunkMsg(`They sunk your ${shipType}!`, "add");
                    await new Promise((resolve) => setTimeout(resolve, 1700));
                    sunkMsg("", "remove");
                }
                checkGame();
                if (game.isWon) {
                    //if game is won, end game and declare winner
                    console.log("Game is won");
                    console.log(game.whoWon);
                    //userMsg("", "remove");
                    //userMsg(`GAME OVER! ${game.whoWon} WINS!`, "add");
                    gameOverMsg("", "remove");
                    gameOverMsg(`GAME OVER! ${game.whoWon} WINS!`, "add");
                }
                //await new Promise((resolve) => setTimeout(resolve, 2000))
                userMsg("", "remove");
                //because move was a hit, computerTurn is left as true and computerPlayer takes another turn...
            } else if (
                playerGameboard.hitMiss(computerPlayer.attackSq) === "miss"
            ) {
                console.log(
                    "next is the computerPlayer's attack square that has been deemed a miss on enemy board - immediately before / is marked on their board"
                );
                console.log(computerPlayer.attackSq);
                playSound("miss");
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
                userMsg("", "remove");
            }
            console.log(computerTurn.val);
        }
    }
    restartBtnDisplay("add");
    /*let restartBtn = document.getElementById("restartBtn");
    console.log(restartBtn)
    restartBtn.addEventListener("click", (ev) => {
        console.log("restartBtn event listener was just triggered");
        //TODO: write code to reset whole game
        location.reload();
    });*/
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

export { gameLoop, playerFleetUI, orientationBtnLabel };
