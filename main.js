import "normalize.css";
import "./style.css";
import Player from "./app-logic/player";
import ComputerPlayer from "./app-logic/computerPlayer";
import Gameboard from "./app-logic/gameboard";
import Game from "./app-logic/game";
import Ship from "./app-logic/ship";

const gameLoop = () => {
    //setup the game
    let computerTurn = false;
    const player = new Player();
    const playerGameboard = new Gameboard();

    //AT THIS POINT WE'D NEED TO GET THE PLAYER'S SELECTION OF COORDS FOR HIDING THEIR SHIPS
    //SO, START WORK ON DOM INTERACTION MODULE NOW...
    //FOR NOW WE CAN CALL THE GENERATERANDOMPOSITIONS METHOD INSTEAD
    player.generateRandomPositions();

    const computerPlayer = new ComputerPlayer();
    const computerGameboard = new Gameboard();
    computerPlayer.calcSelectedPositions();
    console.log(computerPlayer.selectedPositions);
    computerGameboard.placeShips(computerPlayer.selectedPositions);
    console.log(computerGameboard.board);
    playerGameboard.placeShips(player.selectedPositions);
    console.log("next is the players gameboard with the ships placed on it...");
    console.log(playerGameboard.board);

    const game = new Game();

    //enter the actual loop
};
export default gameLoop;
