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
            console.log(cell);
            console.log(cell.dataset);
            console.log(cell.dataset.row, cell.dataset.col);
            let dataVals = [
                parseInt(cell.dataset.row),
                parseInt(cell.dataset.col),
            ];
            console.log(dataVals);
            console.log(typeof dataVals);
            console.log(enemyShot);
            console.log(typeof enemyShot);
            if (dataVals[0] === enemyShot[0] && dataVals[1] === enemyShot[1]) {
                console.log(
                    "YAY!The two are equal!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
                );
                cell.innerText = shotOutcome;
            }
        });
    }
}
