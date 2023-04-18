export default class Grid {
    constructor(handleClick) {
        this.size = 100;
        this.handleClick = handleClick;
    }

    drawGrid() {
        let cellDiv;
        const computerGridContainer = document.querySelector(".computerGrid");
        /* function generateCellDivs() {
            cellDiv = document.createElement("div");
            computerGridContainer.appendChild(cellDiv);
            computerGridContainer.setAttribute(
                "style",
                "border-right: solid; border-bottom: solid;border-width: 0.5px;"
            );
            cellDiv.setAttribute("class", "squares");
        } */
        for (let i = 1; i < 11; i++) {
            for (let j = 1; j < 11; j++) {
                cellDiv = document.createElement("div");
                cellDiv.dataset.row = i;
                cellDiv.dataset.col = j;
                cellDiv.addEventListener("click", this.handleClick);
                computerGridContainer.appendChild(cellDiv);
            }
            //generateCellDivs();
            //cellDiv.setAttribute('id', `${}`) //somehow want to assign id's like: 5-5, or 10,2 (representing cell coordy)
        }
    }
}
