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
//import { handlingGridClicks } from "./dom-interactions/domInteraction";
import Ship from "./app-logic/ship";
let computerTurn = {
    val: false,
};

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
            alert(`${game.whoWon} WINS!`);
            gameOverMsg(`GAME OVER! ${game.whoWon} WINS!`, "add");
            // userMsg("", "remove");
            // userMsg(`GAME OVER! ${game.whoWon} WINS!`, "add");
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
                //TODO: promise timeout for ship positions to be displayed a while... ...
                await new Promise((resolve) => setTimeout(resolve, 1700));
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
                        alert(shipType);
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
            await new Promise((resolve) => setTimeout(resolve, 3000));
            //Take the COMPUTER'S TURN turn --------------------------------------------------------------------

            computerPlayer.calcAttackSq();

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
                    alert(shipType);
                    playerGrid.drawSunkShip(shipToHit.coords);
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
                    }
                    console.log(shipType);
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
