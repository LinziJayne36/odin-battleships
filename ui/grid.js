export default class Grid {
    //constructor(handleClick) {
    constructor(owner) {
        //where owner is the player whose board this will be and must match the html class of the containing element ie: playerGrid | computerGrid
        this.size = 100;
        this.whoseGrid = owner;
        this.sqClass = this.whichClass();
        // this.handleClick = handleClick;
    }

    whichClass() {
        if (this.whoseGrid === "playerGrid") {
            return "playerSquares";
        } else if (this.whoseGrid === "computerGrid") {
            return "computerSquares";
        }
    }

    drawGrid() {
        let cellDiv;
        let sqClass;
        const appContainer = document.getElementById("app");
        //const gridContainer = document.querySelector(`.${this.whoseGrid}`);
        const gridContainer = document.createElement(
            "div",
            `.${this.whoseGrid}`
        );
        gridContainer.setAttribute("class", `${this.whoseGrid}`);
        appContainer.appendChild(gridContainer);
        if (this.whoseGrid === "playerGrid") {
            sqClass = "playerSquares";
        } else if (this.whoseGrid === "computerGrid") {
            sqClass = "computerSquares";
        }

        for (let i = 1; i < 11; i++) {
            for (let j = 1; j < 11; j++) {
                cellDiv = document.createElement("div");
                cellDiv.dataset.row = i;
                cellDiv.dataset.col = j;
                /*cellDiv.addEventListener(
                    "click",
                    this.handleCellClick.bind(this)
                );*/
                cellDiv.setAttribute("class", `${sqClass}`);
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
                cell.innerText = "X";
            }

            /* if (
                cell.dataset.row === enemyShot[0] &&
                cell.dataset.col === enemyShot[1]
            ) {
                cell.innerText = `${shotOutcome}`;
            }*/
        });
        //...and then save in variable targetCell and do targetCell.innerText = shotOutcome
    }

    /* handleCellClick(event) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        this.handleClick(row, col);
        //console.log(this.handleClick);
    }*/
}
