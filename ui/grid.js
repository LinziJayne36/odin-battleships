export default class Grid {
    //constructor(handleClick) {
    constructor(owner) {
        //where owner is the player whose board this will be and must match the html class of the containing element ie: playerGrid | computerGrid
        this.size = 100;
        this.whoseGrid = owner;
        // this.handleClick = handleClick;
    }

    drawGrid() {
        let cellDiv;
        let sqClass;
        const gridContainer = document.querySelector(`.${this.whoseGrid}`);
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

    drawMiss() {
        //mark missed enemy shot on this grid
    }

    /* handleCellClick(event) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        this.handleClick(row, col);
        //console.log(this.handleClick);
    }*/
}
