import { drop, drag, allowDrop } from "./dNd";

export default class Grid {
    //constructor(handleClick) {
    constructor(owner) {
        //where owner is the player whose board this will be and must match the html class of the containing element ie: playerGrid | computerGrid
        //OR in the case of the player's selection grid: where owner is the player+purpose and must match the class of the containing element:
        //... playerPlacementGrid
        this.size = 100;
        this.whoseGrid = owner;
        this.sqClass = this.whichClass();
        this.playerPositions = [];
        // this.handleClick = handleClick;
    }

    whichClass() {
        if (
            this.whoseGrid === "playerGrid" ||
            this.whoseGrid === "playerPlacementGrid"
        ) {
            return "playerSquares";
        } else if (this.whoseGrid === "computerGrid") {
            return "computerSquares";
        }
    }

    drawGrid() {
        let cellDiv;
        let sqClass;

        const appContainer = document.getElementById("app");
        const gridContainer = document.createElement(
            "div",
            `.${this.whoseGrid}`
        );
        gridContainer.setAttribute("class", `${this.whoseGrid}`);
        appContainer.appendChild(gridContainer);

        //gridContainer.addEventListener("dragstart", drag);
        gridContainer.addEventListener("dragover", allowDrop);
        gridContainer.addEventListener("drop", drop);

        if (
            this.whoseGrid === "playerGrid" ||
            this.whoseGrid === "playerPlacementGrid"
        ) {
            sqClass = "playerSquares";
        } else if (this.whoseGrid === "computerGrid") {
            sqClass = "computerSquares";
        }

        for (let i = 1; i < 11; i++) {
            for (let j = 1; j < 11; j++) {
                cellDiv = document.createElement("div");
                cellDiv.dataset.row = i;
                cellDiv.dataset.col = j;
                cellDiv.setAttribute("class", `${sqClass}`);
                cellDiv.setAttribute(
                    "id",
                    `${cellDiv.dataset.row},${cellDiv.dataset.col}`
                );
                /* cellDiv.setAttribute("ondrop", drop);
                cellDiv.setAttribute("ondragover", allowDrop); */
                gridContainer.setAttribute(
                    "style",
                    "border-right: solid; border-bottom: solid;border-width: 0.5px;"
                );
                gridContainer.appendChild(cellDiv);
            }
        }
    }

    drawShot(enemyShot, shotOutcome) {
        console.log(
            `drawShot() was called with enemyShot: ${enemyShot}, shotOutcome: ${shotOutcome}`
        );
        //where enemyShot is the attacked coord and shotOutcome is '/' or 'X'
        //draw the hit or missed enemy shot on this grid
        console.log(this.whoseGrid);
        const allGridCells = document.querySelectorAll(`.${this.sqClass}`);
        //then loop over allGridCells to find the cell whose data-row === enemyShot[0] && whose data-col === enemyShot[1]...
        console.log(enemyShot[0]);
        console.log(enemyShot[1]);

        console.log(allGridCells);
        allGridCells.forEach((cell) => {
            //console.log(cell);
            //console.log(cell.dataset);
            //console.log(cell.dataset.row, cell.dataset.col);
            let dataVals = [
                parseInt(cell.dataset.row),
                parseInt(cell.dataset.col),
            ];
            //console.log(dataVals);
            //console.log(typeof dataVals);
            //console.log(enemyShot);
            //console.log(typeof enemyShot);
            if (dataVals[0] === enemyShot[0] && dataVals[1] === enemyShot[1]) {
                console.log(
                    "YAY!The two are equal!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
                );
                cell.innerText = shotOutcome;
            }
        });
    }

    drawPositionedShips(positionsToDraw) {
        alert("drawPositions just called on grid class");
        console.log(positionsToDraw); //the positions successfully being passed into this method

        //Show position of the battleship
        let battleShipPlacesArr = positionsToDraw[0].coords;
        let eachBattleshipCoord = [];
        const allGridCells = document.querySelectorAll(`.${this.sqClass}`);
        battleShipPlacesArr.forEach((place) => {
            eachBattleshipCoord.push(`${place[0]},${place[1]}`);
            //eachBattleshipCoord.push(place[1]);
            console.log(eachBattleshipCoord);
            allGridCells.forEach((cell) => {
                eachBattleshipCoord.forEach((coord) => {
                    if (cell.id === coord) {
                        cell.style =
                            "background-color: rgba(217, 216, 226, 0.9);";
                        console.log(
                            `just colored the grid cell with coord of ${cell.id} `
                        );
                    }
                });
            });
        });

        //Show position of the 2 cruisers
        let cruiserPlacesArr = [];
        let eachCruiserCoord = [];
        cruiserPlacesArr.push(positionsToDraw[1].coords);
        cruiserPlacesArr.push(positionsToDraw[2].coords);
        console.log(battleShipPlacesArr);
        console.log(cruiserPlacesArr);

        cruiserPlacesArr.forEach((arr) => {
            arr.forEach((pair) => {
                eachCruiserCoord.push(`${pair[0]},${pair[1]}`);
                console.log(eachCruiserCoord);
                allGridCells.forEach((cell) => {
                    eachCruiserCoord.forEach((coord) => {
                        if (cell.id === coord) {
                            cell.style =
                                "background-color: rgba(217, 216, 226, 0.9);";
                            console.log(
                                `just colored the grid cell with coord of ${cell.id} `
                            );
                        }
                    });
                });
            });
        });

        //Show position of the 3 subs
        let subPlacesArr = [];
        let eachSubCoord = [];

        subPlacesArr.push(positionsToDraw[3].coords);
        subPlacesArr.push(positionsToDraw[4].coords);
        subPlacesArr.push(positionsToDraw[5].coords);
        console.log(subPlacesArr);
        subPlacesArr.forEach((arr) => {
            arr.forEach((pair) => {
                eachSubCoord.push(`${pair[0]},${pair[1]}`);
                console.log(eachSubCoord);
                allGridCells.forEach((cell) => {
                    eachSubCoord.forEach((coord) => {
                        if (cell.id === coord) {
                            cell.style =
                                "background-color: rgba(217, 216, 226, 0.9);";
                            console.log(
                                `just colored the grid cell with coord of ${cell.id} `
                            );
                        }
                    });
                });
            });
        });
        //Show positions of the 4 destroyers
        let destroyerPlacesArr = [];
        let eachDestroyerCoord = [];

        destroyerPlacesArr.push(positionsToDraw[6].coords);
        destroyerPlacesArr.push(positionsToDraw[7].coords);
        destroyerPlacesArr.push(positionsToDraw[8].coords);
        destroyerPlacesArr.push(positionsToDraw[9].coords);

        console.log(destroyerPlacesArr);
        destroyerPlacesArr.forEach((arr) => {
            arr.forEach((pair) => {
                eachDestroyerCoord.push(`${pair[0]},${pair[1]}`);
                console.log(eachDestroyerCoord);
                allGridCells.forEach((cell) => {
                    eachDestroyerCoord.forEach((coord) => {
                        if (cell.id === coord) {
                            cell.style =
                                "background-color: rgba(217, 216, 226, 0.9);";
                            console.log(
                                `just colored the grid cell with coord of ${cell.id} `
                            );
                        }
                    });
                });
            });
        });
    }

    drawSunkShip(coords) {
        const allGridCells = document.querySelectorAll(`.${this.sqClass}`);
        console.log(coords);
        let sunkShipCoords = [];
        coords.forEach((coord) => {
            sunkShipCoords.push(`${coord[0]},${coord[1]}`);
        });
        allGridCells.forEach((cell) => {
            sunkShipCoords.forEach((coord) => {
                if (cell.id === coord) {
                    cell.style = "background-color: rgb(255, 71, 26);";
                    console.log(
                        `just colored the grid cell with coord of ${cell.id} `
                    );
                }
            });
        });
    }
}
