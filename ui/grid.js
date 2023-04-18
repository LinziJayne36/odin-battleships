export default class Grid {
    //constructor(handleClick) {
    constructor() {
        this.size = 100;
        // this.handleClick = handleClick;
    }

    drawGrid() {
        let cellDiv;
        const computerGridContainer = document.querySelector(".computerGrid");

        for (let i = 1; i < 11; i++) {
            for (let j = 1; j < 11; j++) {
                cellDiv = document.createElement("div");
                cellDiv.dataset.row = i;
                cellDiv.dataset.col = j;
                /*cellDiv.addEventListener(
                    "click",
                    this.handleCellClick.bind(this)
                );*/
                cellDiv.setAttribute("class", "squares");
                computerGridContainer.setAttribute(
                    "style",
                    "border-right: solid; border-bottom: solid;border-width: 0.5px;"
                );
                computerGridContainer.appendChild(cellDiv);
            }
        }
    }

    /* handleCellClick(event) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        this.handleClick(row, col);
        //console.log(this.handleClick);
    }*/
}
