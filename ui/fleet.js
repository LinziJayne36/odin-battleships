import { drag, drop, allowDrop, dragEnd } from "./dNd";

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
        //battleship.addEventListener("mousedown", mousedownGridClick);
        //battleship.addEventListener("dragstart", drag);
        battleship.setAttribute("draggable", "true");
        battleship.addEventListener("mousedown", (ev) => {
            let cellsq = ev.target.id;
            console.log(cellsq);
            battleship.dataset.clicked = cellsq;
            // e.target.id.dataset.cellsquare = e.target.id;
        });

        battleship.addEventListener("dragstart", drag);
        battleship.addEventListener("dragend", dragEnd);

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
        const battleshipCell1 = createElem(
            "div",
            "shipCell battleshipCell",
            "battleshipCell1"
        );
        const battleshipCell2 = createElem(
            "div",
            "shipCell battleshipCell",
            "battleshipCell2"
        );
        const battleshipCell3 = createElem(
            "div",
            "shipCell battleshipCell",
            "battleshipCell3"
        );
        const battleshipCell4 = createElem(
            "div",
            "shipCell battleshipCell",
            "battleshipCell4"
        );

        battleship.appendChild(battleshipCell1);
        battleship.appendChild(battleshipCell2);
        battleship.appendChild(battleshipCell3);
        battleship.appendChild(battleshipCell4);

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
        cruiser.addEventListener("mousedown", (e) => {
            console.log(e.currentTarget);
            let cellsq = e.target.id;
            console.log(cellsq);
            cruiser.dataset.clicked = cellsq;
            // e.target.id.dataset.cellsquare = e.target.id;
        });
        cruiser.addEventListener("dragstart", drag);
        cruiser.addEventListener("dragend", dragEnd);

        //SETTING UP SUBS SECTION .. x1 ship icon added and then a count of how many left to place
        const subWrapper = createElem("div", "typeWrapper", "subWrapper");
        const subIconsDiv = createElem("div", "subIconsDiv");
        const subCountDiv = createElem("div", "subCountDiv");
        const subCountVal = createElem("p", "subCountVal");
        const sub = createElem("div", "sub", "sub1"); //use class .sub to style the ship
        sub.setAttribute("draggable", "true");
        sub.addEventListener("dragstart", drag);
        sub.addEventListener("dragend", dragEnd);
        sub.addEventListener("mousedown", (e) => {
            let cellsq = e.target.id;
            console.log(cellsq);
            sub.dataset.clicked = cellsq;
            // e.target.id.dataset.cellsquare = e.target.id;
        });

        //Adds the created elements
        fleetWrapper.appendChild(subWrapper);
        subWrapper.appendChild(subIconsDiv);
        subWrapper.appendChild(subCountDiv);
        subIconsDiv.appendChild(sub);
        subCountDiv.appendChild(subCountVal);
        subCountVal.innerText = this.subCount;

        const subCell1 = createElem("div", "shipCell subCell", "subCell1");
        const subCell2 = createElem("div", "shipCell subCell", "subCell2");

        sub.appendChild(subCell1);
        sub.appendChild(subCell2);

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

        //Adds the created elements
        fleetWrapper.appendChild(destroyerWrapper);
        destroyerWrapper.appendChild(destroyerIconsDiv);
        destroyerWrapper.appendChild(destroyerCountDiv);
        destroyerIconsDiv.appendChild(destroyer);
        const destroyerCell1 = createElem(
            "div",
            "shipCell destroyerCell",
            "destroyerCell1"
        );

        destroyer.appendChild(destroyerCell1);
        destroyerCountDiv.appendChild(destroyerCountVal);
        destroyerCountVal.innerText = this.destroyerCount;
        destroyer.addEventListener("mousedown", (e) => {
            console.log(e.target);
            let cellsq = e.target.id;
            console.log(cellsq);
            destroyer.dataset.clicked = cellsq;
            // e.target.id.dataset.cellsquare = e.target.id;
        });

        destroyer.addEventListener("dragstart", drag);
        destroyer.addEventListener("dragend", dragEnd);
    }
}
