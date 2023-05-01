import { drag, drop, allowDrop } from "./dNd";

export default class PlayerFleet {
    constructor() {
        this.battleshipCount = 1;
        this.cruiserCount = 2;
        this.subCount = 3;
        this.destroyerCount = 4;
    }

    drawPlayerFleet() {
        //code to display the ships players will drag n drop...

        //Helper function for creating DOM elements: className is optional
        const createElem = (tagName, className, id) => {
            const newElem = document.createElement(tagName);
            if (className) {
                newElem.setAttribute("class", className);
            }
            if (id) {
                newElem.setAttribute("id", id);
            }

            return newElem;
        };

        const appWrapper = document.getElementById("app");
        const fleetWrapper = createElem("div", "fleetWrapper");
        appWrapper.appendChild(fleetWrapper);

        //SETTING UP BATTLESHIP SECTION.. x1 ship icon added and then a count of how many left to place
        const battleshipWrapper = createElem(
            "div",
            "typeWrapper",
            "battleshipWrapper"
        );
        const battleshipIconsDiv = createElem("div", "battleshipIconsDiv");
        const battleshipCountDiv = createElem("div", "battleshipCountDiv");
        const battleshipCountVal = createElem("div", "battleshipCountVal");
        const battleship = createElem("div", "battleship", "battleship1"); //use class .battleship to style the ship
        battleship.setAttribute("draggable", "true");
        battleship.addEventListener("mousedown", (e) => {
            const cellsq = e.target.id;
            console.log(cellsq);
            cruiser.dataset.clicked = cellsq;
            // e.target.id.dataset.cellsquare = e.target.id;
        });
        battleship.addEventListener("dragstart", drag);
        //Adds the battleship wrapper to the main fleet wrapper
        fleetWrapper.appendChild(battleshipWrapper);
        //Adds the battleshipIconsDiv to the battleshipWrapper
        battleshipWrapper.appendChild(battleshipIconsDiv);
        //Adds the battleshipCountDiv to the battleshipWrapper
        battleshipWrapper.appendChild(battleshipCountDiv);
        //Adds the battleship to the battleshipIconsDiv
        battleshipIconsDiv.appendChild(battleship);
        //Adds the battleshipCountVal p elem to the battleshipCountDiv
        battleshipCountDiv.appendChild(battleshipCountVal);
        //Writes the variable value of battleshipCount to the battleshipCountVal p elem
        battleshipCountVal.innerText = this.battleshipCount;

        //SETTING UP CRUISERS SECTION .. x1 ship icon added and then a count of how many left to place
        const cruiserWrapper = createElem(
            "div",
            "typeWrapper",
            "cruiserWrapper"
        );
        const cruiserIconsDiv = createElem("div", "cruiserIconsDiv");
        const cruiserCountDiv = createElem("div", "cruiserCountDiv");
        const cruiserCountVal = createElem("p", "cruiserCountVal");
        const cruiser = createElem("div", "cruiser", "cruiser1"); //use class .cruiser to style the ship
        cruiser.setAttribute("draggable", "true");
        cruiser.addEventListener("mousedown", (e) => {
            const cellsq = e.target.id;
            console.log(cellsq);
            cruiser.dataset.clicked = cellsq;
            // e.target.id.dataset.cellsquare = e.target.id;
        });
        cruiser.addEventListener("dragstart", drag);

        /*const cruiserHandleElem = createElem(
            "div",
            "handle",
            "cruiserHandleElem"
        );*/

        //Create handle div element to put in rhs of ships to allow drag only in specific area
        //cruiserHandleElem.setAttribute("draggable", "true");
        //cruiser.appendChild(cruiserHandleElem);

        /*window.onload = function () {
            const cruiserHandle = document.getElementById("cruiserHandleElem");
            console.log(cruiserHandle);
            //cruiserHandleElem.addEventListener("dragstart", drag);
            console.log(document.querySelectorAll(".cruiser .handle"));
        };*/

        //Adds the created elements
        fleetWrapper.appendChild(cruiserWrapper);
        cruiserWrapper.appendChild(cruiserIconsDiv);
        cruiserWrapper.appendChild(cruiserCountDiv);
        cruiserIconsDiv.appendChild(cruiser);
        const cruiseCell1 = createElem(
            "div",
            "shipCell cruiserCell",
            "cruiseCell1"
        );
        const cruiseCell2 = createElem(
            "div",
            "shipCell cruiserCell",
            "cruiseCell2"
        );
        const cruiseCell3 = createElem(
            "div",
            "shipCell cruiserCell",
            "cruiseCell3"
        );

        cruiser.appendChild(cruiseCell1);
        cruiser.appendChild(cruiseCell2);
        cruiser.appendChild(cruiseCell3);

        cruiserCountDiv.appendChild(cruiserCountVal);
        cruiserCountVal.innerText = this.cruiserCount;

        //SETTING UP SUBS SECTION .. x1 ship icon added and then a count of how many left to place
        const subWrapper = createElem("div", "typeWrapper", "subWrapper");
        const subIconsDiv = createElem("div", "subIconsDiv");
        const subCountDiv = createElem("div", "subCountDiv");
        const subCountVal = createElem("p", "subCountVal");
        const sub = createElem("div", "sub", "sub1"); //use class .sub to style the ship
        sub.setAttribute("draggable", "true");
        sub.addEventListener("dragstart", drag);
        sub.addEventListener("mousedown", (e) => {
            const cellsq = e.target.id;
            console.log(cellsq);
            cruiser.dataset.clicked = cellsq;
            // e.target.id.dataset.cellsquare = e.target.id;
        });
        //Adds the created elements
        fleetWrapper.appendChild(subWrapper);
        subWrapper.appendChild(subIconsDiv);
        subWrapper.appendChild(subCountDiv);
        subIconsDiv.appendChild(sub);
        subCountDiv.appendChild(subCountVal);
        subCountVal.innerText = this.subCount;

        //SETTING UP DESTROYERS SECTION .. x1 ship icon added and then a count of how many left to place
        const destroyerWrapper = createElem(
            "div",
            "typeWrapper",
            "destroyerWrapper"
        );
        const destroyerIconsDiv = createElem("div", "destroyerIconsDiv");
        const destroyerCountDiv = createElem("div", "destroyerCountDiv");
        const destroyerCountVal = createElem("p", "destroyerCountVal");
        const destroyer = createElem("div", "destroyer", "destroyer1"); //use class .destroyer to style the ship
        destroyer.setAttribute("draggable", "true");
        destroyer.addEventListener("dragstart", drag);
        destroyer.addEventListener("mousedown", (e) => {
            const cellsq = e.target.id;
            console.log(cellsq);
            cruiser.dataset.clicked = cellsq;
            // e.target.id.dataset.cellsquare = e.target.id;
        });
        //Adds the created elements
        fleetWrapper.appendChild(destroyerWrapper);
        destroyerWrapper.appendChild(destroyerIconsDiv);
        destroyerWrapper.appendChild(destroyerCountDiv);
        destroyerIconsDiv.appendChild(destroyer);
        destroyerCountDiv.appendChild(destroyerCountVal);
        destroyerCountVal.innerText = this.destroyerCount;
    }
}
