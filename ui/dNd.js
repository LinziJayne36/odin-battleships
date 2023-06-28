/*
export function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

export function allowDrop(ev) {
    ev.preventDefault();
}

export function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
*/
//import { gameLoop } from "../main";
import { playerFleetUI } from "../main";
import { orientationBtnLabel } from "../main";

export function drag(event) {
    console.log("drag event fired");
    console.log(event.target.id);

    event.dataTransfer.setData("text", event.target.id);

    console.log(event.dataTransfer.getData("text"));
}

export function allowDrop(event) {
    console.log("allowDrop event has fired");
    event.preventDefault();
}
export const droppedShips = [];
/*export const trackDroppedShipsArr = () => {
    console.log("trackDroppedShipsArr is now running");
    return new Promise((resolve) => {
        if (droppedShips.length === 10) {
            console.log(
                "the promise inside trackDroppedShipsArr function just resolved"
            );
            resolve(droppedShips);
        } else {
            //how to make it keep checking droppedShips.length until it does reach 10 and then resolve?
        }
    });
};*/

export const trackDroppedShipsArr = () => {
    console.log("trackDroppedShipsArr is now running");

    const checkLength = (resolve) => {
        if (droppedShips.length === 10) {
            console.log(
                "the promise inside trackDroppedShipsArr function just resolved"
            );
            resolve(droppedShips);
        } else {
            setTimeout(() => checkLength(resolve), 1000); // Check again after 1 second (adjust as needed)
        }
    };

    return new Promise((resolve) => {
        checkLength(resolve);
    });
};

export function drop(event) {
    //let droppedShips = []; //this is an array that will hold an array for each ship that itself holds an array for each of the ship's coords
    //works for a single-cell ship
    console.log("drop event has fired");
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    console.log(data);
    const draggableElement = document.getElementById(data);
    console.log(draggableElement);

    if (!draggableElement) {
        return; // exit the function if the element is null
    }

    let clickedShipCell = draggableElement.dataset.clicked;
    console.log(clickedShipCell);
    let refClickedShipCell = document.querySelector(`#${clickedShipCell}`); //dom reference to the clicked shipCell within ship
    console.log(refClickedShipCell);
    const dropzone = event.target; //also going to be the grid cell where we place the first ship
    console.log(dropzone); //returns dropzone element correctly
    console.log(dropzone.classList);
    if (dropzone.classList.contains("shipCell")) {
        event.preventDefault(); // Prevent the default behavior of the drop event
        console.log(draggableElement);
        draggableElement.classList.add("failedDrop");
        return;
    }
    let len;
    //splitting the width ready to drop...and calculating which coords to put the ship on
    let startCell = refClickedShipCell.id; //id of shipCell mouse picked up on eg 'cruiseCell1'
    console.log(`startCell says: ${startCell}`);
    let secondCell;
    let thirdCell;
    let fourthCell;
    let firstCoord = dropzone.id; //coord of first drop location
    console.log(`firstCoord says: ${firstCoord}`);

    console.log(firstCoord);
    let [x, y] = firstCoord.split(",");
    x = parseInt(x);
    y = parseInt(y);

    console.log(`x says: ${x}`);

    console.log(`y says: ${y}`);
    if (x < 1 || x > 10 || y > 10 || y < 1) {
        event.preventDefault();
        console.log("Attempted drop coord is off the grid");
        return;
    }

    let y2;
    let y3;
    let y4;
    let x2;
    let x3;
    let x4;

    let secondCoord;
    let thirdCoord;
    let fourthCoord;
    if (draggableElement.id.includes("battleship")) {
        len = 4;
        //draggableElement.style.width = "47px";
        //should start off empty and have x,y pushed if ALL coords are free
        //let battleshipArr = [[x, y]];
        let battleshipArr = [];

        let battleshipCoord2 = [];
        let battleshipCoord3 = [];
        let battleshipCoord4 = [];
        if (startCell.includes("1")) {
            //then there are 3 more ship placements to the RHS
            if (orientationBtnLabel === "vertical") {
                y2 = y + 1;
                battleshipCoord2.push(x, y2); //do at end of this block if all are free
                secondCoord = `${x.toString()},${y2.toString()}`;
                console.log(`secondCoord says: ${secondCoord}`);
                y3 = y + 2;
                battleshipCoord3.push(x, y3); //do at end of this block if all are free
                thirdCoord = `${x.toString()},${y3.toString()}`;
                console.log(`thirdCoord says: ${thirdCoord}`);
                y4 = y + 3;
                fourthCoord = `${x.toString()},${y4.toString()}`;
                battleshipCoord4.push(x, y4); //do at end of this block if all are free
                console.log(`fourthCoord says: ${fourthCoord}`);
                secondCell = document.getElementById(`${secondCoord}`);
                console.log(secondCell);
                thirdCell = document.getElementById(`${thirdCoord}`);
                console.log(thirdCell);
                fourthCell = document.getElementById(`${fourthCoord}`);
                //only do the appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //TODO: WRITE CODE TO CHECK IF ALL COORDS ARE FREE AND WITHIN THE COSTRAINTS OF THE GRID
                //this checks if within the grid
                if (
                    y2 < 1 ||
                    y2 > 10 ||
                    y3 < 1 ||
                    y3 > 10 ||
                    y4 < 1 ||
                    y4 > 10
                ) {
                    event.preventDefault();
                    return;
                }
                draggableElement.style.width = "47px";
            } else if (orientationBtnLabel === "horizontal") {
                x2 = x + 1;
                battleshipCoord2.push(x2, y); //do at end of this block if all are free
                secondCoord = `${x2.toString()},${y.toString()}`;
                console.log(`secondCoord says: ${secondCoord}`);
                x3 = x + 2;
                battleshipCoord3.push(y, x3); //do at end of this block if all are free
                thirdCoord = `${x3.toString()},${y.toString()}`;
                console.log(`thirdCoord says: ${thirdCoord}`);
                x4 = x + 3;
                fourthCoord = `${x4.toString()},${y.toString()}`;
                battleshipCoord4.push(x4, y); //do at end of this block if all are free
                console.log(`fourthCoord says: ${fourthCoord}`);
                secondCell = document.getElementById(`${secondCoord}`);
                console.log(secondCell);
                thirdCell = document.getElementById(`${thirdCoord}`);
                console.log(thirdCell);
                fourthCell = document.getElementById(`${fourthCoord}`);
                //only do the appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //TODO: WRITE CODE TO CHECK IF ALL COORDS ARE FREE AND WITHIN THE COSTRAINTS OF THE GRID
                //this checks if within the grid
                if (
                    x2 < 1 ||
                    x2 > 10 ||
                    x3 < 1 ||
                    x3 > 10 ||
                    x4 < 1 ||
                    x4 > 10
                ) {
                    event.preventDefault();
                    return;
                }
                draggableElement.style.height = "47px";
            }

            if (
                secondCell.hasChildNodes() ||
                thirdCell.hasChildNodes() ||
                fourthCell.hasChildNodes()
            ) {
                console.log("At least one of those coords already has a ship");
                draggableElement.classList.add("cancelled");
                event.preventDefault();
                return;
            }

            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("dropped");
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("dropped");
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            let clone2 = draggableElement.cloneNode(true);
            thirdCell.appendChild(clone2);
            clone2.classList.add("dropped");
            clone2.classList.add("cloned");
            clone2.removeAttribute("id");
            let clone3 = draggableElement.cloneNode(true);
            fourthCell.appendChild(clone3);
            clone3.classList.add("dropped");
            clone3.classList.add("cloned");
            clone3.removeAttribute("id");
            //make the occupied coords off-limits...
            dropzone.removeEventListener("dragover", allowDrop);
            dropzone.removeEventListener("drop", drop);
            secondCell.removeEventListener("dragover", allowDrop);
            secondCell.removeEventListener("drop", drop);
            thirdCell.removeEventListener("dragover", allowDrop);
            thirdCell.removeEventListener("drop", drop);
            fourthCell.removeEventListener("dragover", allowDrop);
            fourthCell.removeEventListener("drop", drop);
            //decrement battleshipCount by 1
            const battleshipUIcount = document.querySelector(
                ".battleshipCountVal"
            );
            playerFleetUI.battleshipCount -= 1;
            battleshipUIcount.innerText = playerFleetUI.battleshipCount;
            console.log(playerFleetUI.battleshipCount);
            if (playerFleetUI.battleshipCount === 0) {
                const battleshipFleet = document.querySelector(
                    ".battleshipIconsDiv"
                );
                console.log(battleshipFleet);
                battleshipFleet.innerHTML = "";
                battleshipUIcount.innerHTML = "";
            }
        } else if (startCell.includes("2")) {
            if (orientationBtnLabel === "vertical") {
                //then there is 1 ship placement to LHS and 2 to RHS
                y2 = y - 1;
                battleshipCoord2.push(x, y2); //do at end of this block if all are free
                secondCoord = `${x.toString()},${y2.toString()}`;
                console.log(`secondCoord says: ${secondCoord}`);
                y3 = y + 1;
                battleshipCoord3.push(x, y3); //do at end of this block if all are free
                thirdCoord = `${x.toString()},${y3.toString()}`;
                console.log(`thirdCoord says: ${thirdCoord}`);
                y4 = y + 2;
                battleshipCoord4.push(x, y4); //do at end of this block if all are free
                fourthCoord = `${x.toString()},${y4.toString()}`;
                console.log(`fourthCoord says: ${fourthCoord}`);
                secondCell = document.getElementById(`${secondCoord}`);
                console.log(secondCell);
                thirdCell = document.getElementById(`${thirdCoord}`);
                console.log(thirdCell);
                fourthCell = document.getElementById(`${fourthCoord}`);
                //only do the cloning, appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (
                    y2 < 1 ||
                    y2 > 10 ||
                    y3 < 1 ||
                    y3 > 10 ||
                    y4 < 1 ||
                    y4 > 10
                ) {
                    event.preventDefault();
                    return;
                }

                if (
                    secondCell.hasChildNodes() ||
                    thirdCell.hasChildNodes() ||
                    fourthCell.hasChildNodes()
                ) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.width = "47px";
            } else if (orientationBtnLabel === "horizontal") {
                //then there is 1 ship placement above and 2 below
                x2 = x - 1;
                battleshipCoord2.push(x2, y); //do at end of this block if all are free
                secondCoord = `${x2.toString()},${y.toString()}`;
                console.log(`secondCoord says: ${secondCoord}`);
                x3 = x + 1;
                battleshipCoord3.push(x3, y); //do at end of this block if all are free
                thirdCoord = `${x3.toString()},${y.toString()}`;
                console.log(`thirdCoord says: ${thirdCoord}`);
                x4 = x + 2;
                battleshipCoord4.push(x4, y); //do at end of this block if all are free
                fourthCoord = `${x4.toString()},${y.toString()}`;
                console.log(`fourthCoord says: ${fourthCoord}`);
                secondCell = document.getElementById(`${secondCoord}`);
                console.log(secondCell);
                thirdCell = document.getElementById(`${thirdCoord}`);
                console.log(thirdCell);
                fourthCell = document.getElementById(`${fourthCoord}`);
                //only do the cloning, appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (
                    x2 < 1 ||
                    x2 > 10 ||
                    x3 < 1 ||
                    x3 > 10 ||
                    x4 < 1 ||
                    x4 > 10
                ) {
                    event.preventDefault();
                    return;
                }

                if (
                    secondCell.hasChildNodes() ||
                    thirdCell.hasChildNodes() ||
                    fourthCell.hasChildNodes()
                ) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.height = "47px";
            }

            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("dropped");
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("dropped");
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            let clone2 = draggableElement.cloneNode(true);
            thirdCell.appendChild(clone2);
            clone2.classList.add("dropped");
            clone2.classList.add("cloned");
            clone2.removeAttribute("id");
            let clone3 = draggableElement.cloneNode(true);
            fourthCell.appendChild(clone3);
            clone3.classList.add("dropped");
            clone3.classList.add("cloned");
            clone3.removeAttribute("id");
            //make the occupied coords off-limits...
            dropzone.removeEventListener("dragover", allowDrop);
            dropzone.removeEventListener("drop", drop);
            secondCell.removeEventListener("dragover", allowDrop);
            secondCell.removeEventListener("drop", drop);
            thirdCell.removeEventListener("dragover", allowDrop);
            thirdCell.removeEventListener("drop", drop);
            fourthCell.removeEventListener("dragover", allowDrop);
            fourthCell.removeEventListener("drop", drop);
            const battleshipUIcount = document.querySelector(
                ".battleshipCountVal"
            );
            playerFleetUI.battleshipCount -= 1;
            battleshipUIcount.innerText = playerFleetUI.battleshipCount;
            console.log(playerFleetUI.battleshipCount);
            if (playerFleetUI.battleshipCount === 0) {
                const battleshipFleet = document.querySelector(
                    ".battleshipIconsDiv"
                );
                console.log(battleshipFleet);
                battleshipFleet.innerHTML = "";
                battleshipUIcount.innerHTML = "";
            }
        } else if (startCell.includes("3")) {
            if (orientationBtnLabel === "vertical") {
                //then there is 2 ship placements to LHS and 1 to RHS
                y2 = y - 1;
                battleshipCoord2.push(x, y2); //do at end of this block if all are free
                secondCoord = `${x.toString()},${y2.toString()}`;
                console.log(`secondCoord says: ${secondCoord}`);
                y3 = y - 2;
                battleshipCoord3.push(x, y3); //do at end of this block if all are free
                thirdCoord = `${x.toString()},${y3.toString()}`;
                console.log(`thirdCoord says: ${thirdCoord}`);
                y4 = y + 1;
                battleshipCoord4.push(x, y4); //do at end of this block if all are free
                fourthCoord = `${x.toString()},${y4.toString()}`;
                console.log(`fourthCoord says: ${fourthCoord}`);
                secondCell = document.getElementById(`${secondCoord}`);
                console.log(secondCell);
                thirdCell = document.getElementById(`${thirdCoord}`);
                console.log(thirdCell);
                fourthCell = document.getElementById(`${fourthCoord}`);
                //only do the cloning, appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (
                    y2 < 1 ||
                    y2 > 10 ||
                    y3 < 1 ||
                    y3 > 10 ||
                    y4 < 1 ||
                    y4 > 10
                ) {
                    event.preventDefault();
                    return;
                }

                if (
                    secondCell.hasChildNodes() ||
                    thirdCell.hasChildNodes() ||
                    fourthCell.hasChildNodes()
                ) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.width = "47px";
            } else if (orientationBtnLabel === "horizontal") {
                //then there is 2 ship placements to LHS and 1 to RHS
                x2 = x - 1;
                battleshipCoord2.push(x2, y); //do at end of this block if all are free
                secondCoord = `${x2.toString()},${y.toString()}`;
                console.log(`secondCoord says: ${secondCoord}`);
                x3 = x - 2;
                battleshipCoord3.push(x3, y); //do at end of this block if all are free
                thirdCoord = `${x3.toString()},${y.toString()}`;
                console.log(`thirdCoord says: ${thirdCoord}`);
                x4 = x + 1;
                battleshipCoord4.push(x4, y); //do at end of this block if all are free
                fourthCoord = `${x4.toString()},${y.toString()}`;
                console.log(`fourthCoord says: ${fourthCoord}`);
                secondCell = document.getElementById(`${secondCoord}`);
                console.log(secondCell);
                thirdCell = document.getElementById(`${thirdCoord}`);
                console.log(thirdCell);
                fourthCell = document.getElementById(`${fourthCoord}`);
                //only do the cloning, appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (
                    x2 < 1 ||
                    x2 > 10 ||
                    x3 < 1 ||
                    x3 > 10 ||
                    x4 < 1 ||
                    x4 > 10
                ) {
                    event.preventDefault();
                    return;
                }

                if (
                    secondCell.hasChildNodes() ||
                    thirdCell.hasChildNodes() ||
                    fourthCell.hasChildNodes()
                ) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.height = "47px";
            }

            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("dropped");
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("dropped");
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            let clone2 = draggableElement.cloneNode(true);
            thirdCell.appendChild(clone2);
            clone2.classList.add("dropped");
            clone2.classList.add("cloned");
            clone2.removeAttribute("id");
            let clone3 = draggableElement.cloneNode(true);
            fourthCell.appendChild(clone3);
            clone3.classList.add("dropped");
            clone3.classList.add("cloned");
            clone3.removeAttribute("id");
            //make the occupied coords off-limits...
            dropzone.removeEventListener("dragover", allowDrop);
            dropzone.removeEventListener("drop", drop);
            secondCell.removeEventListener("dragover", allowDrop);
            secondCell.removeEventListener("drop", drop);
            thirdCell.removeEventListener("dragover", allowDrop);
            thirdCell.removeEventListener("drop", drop);
            fourthCell.removeEventListener("dragover", allowDrop);
            fourthCell.removeEventListener("drop", drop);
            const battleshipUIcount = document.querySelector(
                ".battleshipCountVal"
            );
            playerFleetUI.battleshipCount -= 1;
            battleshipUIcount.innerText = playerFleetUI.battleshipCount;
            console.log(playerFleetUI.battleshipCount);
            if (playerFleetUI.battleshipCount === 0) {
                const battleshipFleet = document.querySelector(
                    ".battleshipIconsDiv"
                );
                console.log(battleshipFleet);
                battleshipFleet.innerHTML = "";
                battleshipUIcount.innerHTML = "";
            }
        } else if (startCell.includes("4")) {
            if (orientationBtnLabel === "vertical") {
                //then there is 3 ship placements to LHS and 0 to RHS
                y2 = y - 1;
                battleshipCoord2.push(x, y2); //do at end of this block if all are free
                secondCoord = `${x.toString()},${y2.toString()}`;
                console.log(`secondCoord says: ${secondCoord}`);
                y3 = y - 2;
                battleshipCoord3.push(x, y3); //do at end of this block if all are free
                thirdCoord = `${x.toString()},${y3.toString()}`;
                console.log(`thirdCoord says: ${thirdCoord}`);
                y4 = y - 3;

                battleshipCoord4.push(x, y4); //do at end of this block if all are free
                fourthCoord = `${x.toString()},${y4.toString()}`;
                console.log(`fourthCoord says: ${fourthCoord}`);
                secondCell = document.getElementById(`${secondCoord}`);
                console.log(secondCell);
                thirdCell = document.getElementById(`${thirdCoord}`);
                console.log(thirdCell);
                fourthCell = document.getElementById(`${fourthCoord}`);

                //only do the cloning, appending, pushing, and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (
                    y2 < 1 ||
                    y2 > 10 ||
                    y3 < 1 ||
                    y3 > 10 ||
                    y4 < 1 ||
                    y4 > 10
                ) {
                    event.preventDefault();
                    return;
                }

                if (
                    secondCell.hasChildNodes() ||
                    thirdCell.hasChildNodes() ||
                    fourthCell.hasChildNodes()
                ) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.width = "46px";
            } else if (orientationBtnLabel === "horizontal") {
                //then there is 3 ship placements to LHS and 0 to RHS
                x2 = x - 1;
                battleshipCoord2.push(x2, y); //do at end of this block if all are free
                secondCoord = `${x2.toString()},${y.toString()}`;
                console.log(`secondCoord says: ${secondCoord}`);
                x3 = x - 2;
                battleshipCoord3.push(x3, y); //do at end of this block if all are free
                thirdCoord = `${x3.toString()},${y.toString()}`;
                console.log(`thirdCoord says: ${thirdCoord}`);
                x4 = x - 3;

                battleshipCoord4.push(x4, y); //do at end of this block if all are free
                fourthCoord = `${x4.toString()},${y.toString()}`;
                console.log(`fourthCoord says: ${fourthCoord}`);
                secondCell = document.getElementById(`${secondCoord}`);
                console.log(secondCell);
                thirdCell = document.getElementById(`${thirdCoord}`);
                console.log(thirdCell);
                fourthCell = document.getElementById(`${fourthCoord}`);
                //only do the cloning, appending, pushing, and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (
                    x2 < 1 ||
                    x2 > 10 ||
                    x3 < 1 ||
                    x3 > 10 ||
                    x4 < 1 ||
                    x4 > 10
                ) {
                    event.preventDefault();
                    return;
                }

                if (
                    secondCell.hasChildNodes() ||
                    thirdCell.hasChildNodes() ||
                    fourthCell.hasChildNodes()
                ) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.height = "47px";
            }

            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("dropped");
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("dropped");
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            let clone2 = draggableElement.cloneNode(true);
            thirdCell.appendChild(clone2);
            clone2.classList.add("dropped");
            clone2.classList.add("cloned");
            clone2.removeAttribute("id");
            let clone3 = draggableElement.cloneNode(true);
            fourthCell.appendChild(clone3);
            clone3.classList.add("dropped");
            clone3.classList.add("cloned");
            clone3.removeAttribute("id");
            //make the occupied coords off-limits...
            dropzone.removeEventListener("dragover", allowDrop);
            dropzone.removeEventListener("drop", drop);
            secondCell.removeEventListener("dragover", allowDrop);
            secondCell.removeEventListener("drop", drop);
            thirdCell.removeEventListener("dragover", allowDrop);
            thirdCell.removeEventListener("drop", drop);
            fourthCell.removeEventListener("dragover", allowDrop);
            fourthCell.removeEventListener("drop", drop);
            const battleshipUIcount = document.querySelector(
                ".battleshipCountVal"
            );
            playerFleetUI.battleshipCount -= 1;
            battleshipUIcount.innerText = playerFleetUI.battleshipCount;
            console.log(playerFleetUI.battleshipCount);
            if (playerFleetUI.battleshipCount === 0) {
                const battleshipFleet = document.querySelector(
                    ".battleshipIconsDiv"
                );
                console.log(battleshipFleet);
                battleshipFleet.innerHTML = "";
                battleshipUIcount.innerHTML = "";
            }
        }
        //do this if droppedShips array is not empty !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //and do battleshipArr.push([x, y]) here because at the beginning the array should be empty as we dont know at that point if all coords will be free
        let battleshipArrCoords = [];
        battleshipArrCoords.push([x, y]);
        battleshipArrCoords.push(battleshipCoord2);
        battleshipArrCoords.push(battleshipCoord3);
        battleshipArrCoords.push(battleshipCoord4);
        droppedShips.push({
            coords: battleshipArrCoords,
            length: 4,
        });
        console.log(droppedShips);
        //droppedShips.push(battleshipArr);

        //--------------------------------------------------------END OF BATTLESHIP SECTION--------------------------
    } else if (draggableElement.id.includes("cruiser")) {
        len = 3;
        //draggableElement.style.width = "47px";
        //should start off empty and have x,y pushed if ALL coords are free
        let cruiserArr = [];

        let cruiserCoord2 = [];
        let cruiserCoord3 = [];
        //Starting to integrate ship placing logic for rest of grid cells....
        if (startCell.includes("1")) {
            if (orientationBtnLabel === "vertical") {
                //then there are 2 more ship placements to the RHS
                y2 = y + 1;
                cruiserCoord2.push(x, y2); //do at end of this block if all are free
                secondCoord = `${x.toString()},${y2.toString()}`;
                console.log(`secondCoord says: ${secondCoord}`);
                y3 = y + 2;
                cruiserCoord3.push(x, y3); //do at end of this block if all are free
                thirdCoord = `${x.toString()},${y3.toString()}`;
                console.log(`thirdCoord says: ${thirdCoord}`);
                secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
                console.log(secondCell);
                thirdCell = document.getElementById(`${thirdCoord}`); //finding el where its id === thirdCoord
                console.log(thirdCell);
                //only do the cloning, appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (y2 < 1 || y2 > 10 || y3 > 10 || y3 < 1) {
                    console.log("the second coord is off the grid");
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                console.log(
                    "this code should not be running if any of the ship coords were off the grid !!!----------------------------------------------------------------------------"
                );
                if (secondCell.hasChildNodes() || thirdCell.hasChildNodes()) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }

                draggableElement.style.width = "47px"; //HOW CAN THIS BE SET CONDITIONALLY SUCH THAT IT DOES NOT SET WIDTH OF SHIPS IN FLEET AREA AS WELL AS THOSE DROPPED ON GRID?
            } else if (orientationBtnLabel === "horizontal") {
                //then there are 2 more ship placements to the RHS
                x2 = x + 1;
                cruiserCoord2.push(x2, y); //do at end of this block if all are free
                secondCoord = `${x2.toString()},${y.toString()}`;
                console.log(`secondCoord says: ${secondCoord}`);
                x3 = x + 2;
                cruiserCoord3.push(x3, y); //do at end of this block if all are free
                thirdCoord = `${x3.toString()},${y.toString()}`;
                console.log(`thirdCoord says: ${thirdCoord}`);
                secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
                console.log(secondCell);
                thirdCell = document.getElementById(`${thirdCoord}`); //finding el where its id === thirdCoord
                console.log(thirdCell);
                //only do the cloning, appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (x2 < 1 || x2 > 10 || x3 > 10 || x3 < 1) {
                    console.log("the second coord is off the grid");
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                console.log(
                    "this code should not be running if any of the ship coords were off the grid !!!----------------------------------------------------------------------------"
                );
                if (secondCell.hasChildNodes() || thirdCell.hasChildNodes()) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.height = "47px";
            }

            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("dropped");
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("dropped");
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            let clone2 = draggableElement.cloneNode(true);
            thirdCell.appendChild(clone2);
            clone2.classList.add("dropped");
            clone2.classList.add("cloned");
            clone2.removeAttribute("id");
            //make the occupied coords off-limits...
            dropzone.removeEventListener("dragover", allowDrop);
            dropzone.removeEventListener("drop", drop);
            secondCell.removeEventListener("dragover", allowDrop);
            secondCell.removeEventListener("drop", drop);
            thirdCell.removeEventListener("dragover", allowDrop);
            thirdCell.removeEventListener("drop", drop);
            const cruiserUIcount = document.querySelector(".cruiserCountVal");
            playerFleetUI.cruiserCount -= 1;
            cruiserUIcount.innerText = playerFleetUI.cruiserCount;
            console.log(playerFleetUI.cruiserCount);
            if (playerFleetUI.cruiserCount === 0) {
                const cruiserFleet = document.querySelector(".cruiserIconsDiv");
                console.log(cruiserFleet);
                cruiserFleet.innerHTML = "";
                cruiserUIcount.innerHTML = "";
            }
        } else if (startCell.includes("2")) {
            if (orientationBtnLabel === "vertical") {
                //then there are 1 ship placement to the LHS and 1 to the RHS
                y2 = y - 1;
                cruiserCoord2.push(x, y2); //do at end of this block if all are free
                secondCoord = `${x.toString()},${y2.toString()}`;
                y3 = y + 1;
                cruiserCoord3.push(x, y3); //do at end of this block if all are free
                thirdCoord = `${x.toString()},${y3.toString()}`;
                secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
                thirdCell = document.getElementById(`${thirdCoord}`); //finding el where its id === thirdCoord
                //only do the cloning, appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (y2 < 1 || y2 > 10 || y3 > 10 || y3 < 1) {
                    console.log("the second coord is off the grid");
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                console.log(
                    "this code should not be running if any of the ship coords were off the grid !!!----------------------------------------------------------------------------"
                );
                if (secondCell.hasChildNodes() || thirdCell.hasChildNodes()) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.width = "47px";
            } else if (orientationBtnLabel === "horizontal") {
                //then there are 1 ship placement to the LHS and 1 to the RHS
                x2 = x - 1;
                cruiserCoord2.push(x2, y); //do at end of this block if all are free
                secondCoord = `${x2.toString()},${y.toString()}`;
                x3 = x + 1;
                cruiserCoord3.push(x3, y); //do at end of this block if all are free
                thirdCoord = `${x3.toString()},${y.toString()}`;
                secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
                thirdCell = document.getElementById(`${thirdCoord}`); //finding el where its id === thirdCoord
                //only do the cloning, appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (x2 < 1 || x2 > 10 || x3 > 10 || x3 < 1) {
                    console.log("the second coord is off the grid");
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                console.log(
                    "this code should not be running if any of the ship coords were off the grid !!!----------------------------------------------------------------------------"
                );
                if (secondCell.hasChildNodes() || thirdCell.hasChildNodes()) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.height = "47px";
            }

            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("dropped");
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("dropped");
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            let clone2 = draggableElement.cloneNode(true);
            thirdCell.appendChild(clone2);
            clone2.classList.add("dropped");
            clone2.classList.add("cloned");
            clone2.removeAttribute("id");
            //make the occupied coords off-limits...
            dropzone.removeEventListener("dragover", allowDrop);
            dropzone.removeEventListener("drop", drop);
            secondCell.removeEventListener("dragover", allowDrop);
            secondCell.removeEventListener("drop", drop);
            thirdCell.removeEventListener("dragover", allowDrop);
            thirdCell.removeEventListener("drop", drop);
            const cruiserUIcount = document.querySelector(".cruiserCountVal");
            playerFleetUI.cruiserCount -= 1;
            cruiserUIcount.innerText = playerFleetUI.cruiserCount;
            console.log(playerFleetUI.cruiserCount);
            if (playerFleetUI.cruiserCount === 0) {
                const cruiserFleet = document.querySelector(".cruiserIconsDiv");
                console.log(cruiserFleet);
                cruiserFleet.innerHTML = "";
                cruiserUIcount.innerHTML = "";
            }
        } else if (startCell.includes("3")) {
            if (orientationBtnLabel === "vertical") {
                //then there are 2 ship placements on LHS
                y2 = y - 1;
                cruiserCoord2.push(x, y2); //do at end of this block if all are free
                secondCoord = `${x.toString()},${y2.toString()}`;
                y3 = y - 2;
                cruiserCoord3.push(x, y3); //do at end of this block if all are free
                thirdCoord = `${x.toString()},${y3.toString()}`;
                secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
                thirdCell = document.getElementById(`${thirdCoord}`); //finding el where its id === thirdCoord
                //only do the cloning, appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (y2 < 1 || y2 > 10 || y3 > 10 || y3 < 1) {
                    console.log("the second coord is off the grid");
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                console.log(
                    "this code should not be running if any of the ship coords were off the grid !!!----------------------------------------------------------------------------"
                );
                if (secondCell.hasChildNodes() || thirdCell.hasChildNodes()) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.width = "47px";
            } else if (orientationBtnLabel === "horizontal") {
                //then there are 2 ship placements on LHS
                x2 = x - 1;
                cruiserCoord2.push(x2, y); //do at end of this block if all are free
                secondCoord = `${x2.toString()},${y.toString()}`;
                x3 = x - 2;
                cruiserCoord3.push(x3, y); //do at end of this block if all are free
                thirdCoord = `${x3.toString()},${y.toString()}`;
                secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
                thirdCell = document.getElementById(`${thirdCoord}`); //finding el where its id === thirdCoord
                //only do the cloning, appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (x2 < 1 || x2 > 10 || x3 > 10 || x3 < 1) {
                    console.log("the second coord is off the grid");
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                console.log(
                    "this code should not be running if any of the ship coords were off the grid !!!----------------------------------------------------------------------------"
                );
                if (secondCell.hasChildNodes() || thirdCell.hasChildNodes()) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.height = "47px";
            }

            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("dropped");
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("dropped");
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            let clone2 = draggableElement.cloneNode(true);
            thirdCell.appendChild(clone2);
            clone2.classList.add("dropped");
            clone2.classList.add("cloned");
            clone2.removeAttribute("id");
            //make the occupied coords off-limits...
            dropzone.removeEventListener("dragover", allowDrop);
            dropzone.removeEventListener("drop", drop);
            secondCell.removeEventListener("dragover", allowDrop);
            secondCell.removeEventListener("drop", drop);
            thirdCell.removeEventListener("dragover", allowDrop);
            thirdCell.removeEventListener("drop", drop);
            const cruiserUIcount = document.querySelector(".cruiserCountVal");
            playerFleetUI.cruiserCount -= 1;
            cruiserUIcount.innerText = playerFleetUI.cruiserCount;
            console.log(playerFleetUI.cruiserCount);
            if (playerFleetUI.cruiserCount === 0) {
                const cruiserFleet = document.querySelector(".cruiserIconsDiv");
                console.log(cruiserFleet);
                cruiserFleet.innerHTML = "";
                cruiserUIcount.innerHTML = "";
            }
        }
        //do this if droppedShips array is not empty !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //and do cruiserArr.push([x, y]) here because at the beginning the array should be empty as we dont know at that point if all coords will be free
        /* cruiserArr.push([x, y]);
        cruiserArr.push(cruiserCoord2);
        cruiserArr.push(cruiserCoord3);
        droppedShips.push(cruiserArr);
        console.log(droppedShips);*/

        let cruiserArrCoords = [];
        cruiserArrCoords.push([x, y]);
        cruiserArrCoords.push(cruiserCoord2);
        cruiserArrCoords.push(cruiserCoord3);

        droppedShips.push({
            coords: cruiserArrCoords,
            length: 3,
        });
        console.log(droppedShips);

        //--------------------------------------------------------END OF CRUISERS SECTION--------------------------
    } else if (draggableElement.id.includes("sub")) {
        len = 2;
        //draggableElement.style.width = "47px";
        //should start off empty and have x,y pushed if ALL coords are free
        let subArr = [];

        let subCoord2 = [];
        //Starting to integrate ship placing logic for rest of grid cells....
        if (startCell.includes("1")) {
            if (orientationBtnLabel === "vertical") {
                console.log(`startCell says: ${startCell}`);
                //then there are 1 more ship placements to the RHS
                y2 = y + 1;
                subCoord2.push(x, y2); //do at end of this block if all are free !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                secondCoord = `${x.toString()},${y2.toString()}`;
                console.log(`secondCoord says: ${secondCoord}`);
                secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
                console.log(secondCell);
                //only do the cloning, appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (y2 < 1 || y2 > 10) {
                    console.log("the second coord is off the grid");
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                console.log(
                    "this code should not be running if any of the ship coords were off the grid !!!----------------------------------------------------------------------------"
                );
                if (secondCell.hasChildNodes()) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.width = "47px";
            } else if (orientationBtnLabel === "horizontal") {
                console.log(`startCell says: ${startCell}`);
                //then there are 1 more ship placements to the RHS
                x2 = x + 1;
                subCoord2.push(x2, y); //do at end of this block if all are free !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                secondCoord = `${x2.toString()},${y.toString()}`;
                console.log(`secondCoord says: ${secondCoord}`);
                secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
                console.log(secondCell);
                //only do the cloning, appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (x2 < 1 || x2 > 10) {
                    console.log("the second coord is off the grid");
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                console.log(
                    "this code should not be running if any of the ship coords were off the grid !!!----------------------------------------------------------------------------"
                );
                if (secondCell.hasChildNodes()) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.height = "47px";
            }

            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("dropped");
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("dropped");
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            //make the occupied coords off-limits...
            dropzone.removeEventListener("dragover", allowDrop);
            dropzone.removeEventListener("drop", drop);
            secondCell.removeEventListener("dragover", allowDrop);
            secondCell.removeEventListener("drop", drop);
            const subUIcount = document.querySelector(".subCountVal");
            playerFleetUI.subCount -= 1;
            subUIcount.innerText = playerFleetUI.subCount;
            console.log(playerFleetUI.subCount);
            if (playerFleetUI.subCount === 0) {
                const subFleet = document.querySelector(".subIconsDiv");
                console.log(subFleet);
                subFleet.innerHTML = "";
                subUIcount.innerHTML = "";
            }
        } else if (startCell.includes("2")) {
            if (orientationBtnLabel === "vertical") {
                //then there are 1 ship placement to the LHS
                console.log(`startCell says: ${startCell}`);
                y2 = y - 1;
                subCoord2.push(x, y2); //do at end of this block if all are free !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                secondCoord = `${x.toString()},${y2.toString()}`;
                secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
                //only do the cloning, appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (y2 < 1 || y2 > 10) {
                    console.log("the second coord is off the grid");
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                console.log(
                    "this code should not be running if any of the ship coords were off the grid !!!----------------------------------------------------------------------------"
                );
                if (secondCell.hasChildNodes()) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.width = "47px";
            } else if (orientationBtnLabel === "horizontal") {
                //then there are 1 ship placement to the LHS
                console.log(`startCell says: ${startCell}`);
                x2 = x - 1;
                subCoord2.push(x2, y); //do at end of this block if all are free !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                secondCoord = `${x2.toString()},${y.toString()}`;
                secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
                //only do the cloning, appending and the making cells off-limits if all coords are free and on the board!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if (x2 < 1 || x2 > 10) {
                    console.log("the second coord is off the grid");
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                console.log(
                    "this code should not be running if any of the ship coords were off the grid !!!----------------------------------------------------------------------------"
                );
                if (secondCell.hasChildNodes()) {
                    console.log(
                        "At least one of those coords already has a ship"
                    );
                    draggableElement.classList.add("cancelled");
                    event.preventDefault();
                    return;
                }
                draggableElement.style.height = "47px";
            }

            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("dropped");
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("dropped");
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");

            //make the occupied coords off-limits...
            dropzone.removeEventListener("dragover", allowDrop);
            dropzone.removeEventListener("drop", drop);
            secondCell.removeEventListener("dragover", allowDrop);
            secondCell.removeEventListener("drop", drop);
            const subUIcount = document.querySelector(".subCountVal");
            playerFleetUI.subCount -= 1;
            subUIcount.innerText = playerFleetUI.subCount;
            console.log(playerFleetUI.subCount);
            if (playerFleetUI.subCount === 0) {
                const subFleet = document.querySelector(".subIconsDiv");
                console.log(subFleet);
                subFleet.innerHTML = "";
                subUIcount.innerHTML = "";
            }
        }

        //do this if droppedShips array is not empty !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //and do subArr.push([x, y]) here because at the beginning the array should be empty as we dont know at that point if all coords will be free

        /* subArr.push([x, y]);
        subArr.push(subCoord2);
        droppedShips.push(subArr);*/

        let subArrCoords = [];
        subArrCoords.push([x, y]);
        subArrCoords.push(subCoord2);

        droppedShips.push({
            coords: subArrCoords,
            length: 2,
        });
        console.log(droppedShips);

        //--------------------------------------------------------END OF SUBS SECTION--------------------------
    } else if (draggableElement.id.includes("destroyer")) {
        len = 1;
        //should start off empty and have x,y pushed if ALL coords are free
        let destroyerArr = [[x, y]];

        //we leave the width as it is at 149px..
        draggableElement.style.width = "47px";
        let draggableElementClone = draggableElement.cloneNode(true);
        dropzone.appendChild(draggableElementClone);
        //and do destroyerArr.push([x, y]) here because at the beginning the array should be empty as we dont know at that point if all coords will be free
        /*destroyerArr.push([x, y]);
        droppedShips.push(destroyerArr); //building the droppedShips array to supply selected_positions
        console.log(destroyerArr);*/

        let destroyerArrCoords = [];
        destroyerArrCoords.push([x, y]);

        droppedShips.push({
            coords: destroyerArrCoords,
            length: 1,
        });
        console.log(droppedShips);

        draggableElementClone.classList.add("dropped");
        draggableElementClone.classList.add("cloned");
        draggableElementClone.removeAttribute("id");
        dropzone.removeEventListener("dragover", allowDrop);
        dropzone.removeEventListener("drop", drop);
        const destroyerUIcount = document.querySelector(".destroyerCountVal");
        playerFleetUI.destroyerCount -= 1;
        destroyerUIcount.innerText = playerFleetUI.destroyerCount;
        console.log(playerFleetUI.destroyerCount);

        if (playerFleetUI.destroyerCount === 0) {
            const destroyerFleet = document.querySelector(".destroyerIconsDiv");
            console.log(destroyerFleet);
            destroyerFleet.innerHTML = "";
            destroyerUIcount.innerHTML = "";
        }
    }

    console.log(droppedShips);
    //should we give .cancelled to the ship if not dropped? Perhaps, but then we'd need to have given a class of .dropped whenever it was dropped so we can check
}

export function dragEnd(event) {
    // Code to handle drag end
    console.log("dragEnd function fires...");
    const failedDrop = event.target.classList.contains("failedDrop");
    console.log(failedDrop);
    if (failedDrop) {
        event.preventDefault();
        event.target.classList.remove("failedDrop");
        return;
    }

    const cruisers = document.querySelectorAll(".typeWrapper .cruiser");
    cruisers.forEach((ship) => {
        console.log(ship);
        if (!ship.classList.contains("vertical")) {
            console.log("the ship element does not have vertical class");
            ship.style.width = "149px";
            ship.style.height = "47px";
        } else if (ship.classList.contains("vertical")) {
            console.log("the ship element does have the vertical class ");
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

    /*
    const allBattleships = document.querySelectorAll(".battleship");

    allBattleships.forEach((battleship) => {
        console.log(battleship);
        if (
            !battleship.classList.contains("dropped") &&
            !battleship.classList.contains("vertical")
        ) {
            console.log(
                "dropped class is NOT present, battleship should have width 200px"
            );
            battleship.style.width = "200px";
        } else if (
            !battleship.classList.contains("dropped") &&
            battleship.classList.contains("vertical")
        ) {
            battleship.style.height = "200px";
        }
    });

    const allCruisers = document.querySelectorAll(".cruiser");

    allCruisers.forEach((cruiser) => {
        console.log(cruiser);
        if (
            !cruiser.classList.contains("dropped") &&
            !cruiser.classList.contains("vertical")
        ) {
            console.log(
                "dropped class is NOT present, cruiser should have width 149px"
            );
            cruiser.style.width = "149px";
        } else if (
            !cruiser.classList.contains("dropped") &&
            cruiser.classList.contains("vertical")
        ) {
            cruiser.style.height = "149px";
        }
    });

    const allSubs = document.querySelectorAll(".sub");

    allSubs.forEach((sub) => {
        console.log(sub);
        if (
            !sub.classList.contains("dropped") &&
            !sub.classList.contains("vertical")
        ) {
            console.log(
                "dropped class is NOT present, sub should have width 96px"
            );
            sub.style.width = "96px";
        } else if (
            !sub.classList.contains("dropped") &&
            sub.classList.contains("vertical")
        ) {
            sub.style.height = "96px";
        }
    });
    */

    const undraggableElement = document.getElementById(event.target.id);
    console.log(undraggableElement);
    //console.log(undraggableElement.hasAttribute("data-clicked"));

    let clonedElements = document.querySelectorAll(".cloned");
    for (let i = 0; i < clonedElements.length; i++) {
        clonedElements[i].removeAttribute("draggable");
        clonedElements[i].removeEventListener("dragstart", drag);
        clonedElements[i].removeEventListener("dragend", dragEnd);
    }

    //do we need a check here to ensure this only happens if the ship actually got dropped successfully?
    if (undraggableElement !== null) {
        if (undraggableElement.classList.contains("dropped")) {
            undraggableElement.removeAttribute("draggable");
            undraggableElement.removeEventListener("dragstart", drag);
            undraggableElement.removeEventListener("dragend", dragEnd);
        }
    }
}
