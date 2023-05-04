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
export function drop(event) {
    /* let clonedChildren = document.querySelectorAll(".cloned *");
    for (let i = 0; i < clonedChildren.length; i++) {
        clonedChildren[i].removeEventListener("drop", drop);
        clonedChildren[i].removeAttribute("id");
    }
    let clonedShips = document.querySelectorAll(".cloned");
    for (let i = 0; i < clonedShips.length; i++) {
        clonedShips[i].innerText = "";
    }*/
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
        //PROBLEM is in line 467 onwards - need to somehow conditionally check if the ship is a failed drop before making undraggable!
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
    let y2;
    let y3;
    let y4;
    let secondCoord;
    let thirdCoord;
    let fourthCoord;
    if (draggableElement.id.includes("battleship")) {
        len = 4;
        draggableElement.style.width = "47px";
        let battleshipArr = [[x, y]];

        let battleshipCoord2 = [];
        let battleshipCoord3 = [];
        let battleshipCoord4 = [];
        if (startCell.includes("1")) {
            //then there are 3 more ship placements to the RHS
            y2 = y + 1;
            battleshipCoord2.push(x, y2);
            secondCoord = `${x.toString()},${y2.toString()}`;
            console.log(`secondCoord says: ${secondCoord}`);
            y3 = y + 2;
            battleshipCoord3.push(x, y3);
            thirdCoord = `${x.toString()},${y3.toString()}`;
            console.log(`thirdCoord says: ${thirdCoord}`);
            y4 = y + 3;
            fourthCoord = `${x.toString()},${y4.toString()}`;
            battleshipCoord4.push(x, y4);
            console.log(`fourthCoord says: ${fourthCoord}`);
            secondCell = document.getElementById(`${secondCoord}`);
            console.log(secondCell);
            thirdCell = document.getElementById(`${thirdCoord}`);
            console.log(thirdCell);
            fourthCell = document.getElementById(`${fourthCoord}`);
            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            let clone2 = draggableElement.cloneNode(true);
            thirdCell.appendChild(clone2);
            clone2.classList.add("cloned");
            clone2.removeAttribute("id");
            let clone3 = draggableElement.cloneNode(true);
            fourthCell.appendChild(clone3);
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
        } else if (startCell.includes("2")) {
            //then there is 1 ship placement to LHS and 2 to RHS
            y2 = y - 1;
            battleshipCoord2.push(x, y2);
            secondCoord = `${x.toString()},${y2.toString()}`;
            console.log(`secondCoord says: ${secondCoord}`);
            y3 = y + 1;
            battleshipCoord3.push(x, y3);
            thirdCoord = `${x.toString()},${y3.toString()}`;
            console.log(`thirdCoord says: ${thirdCoord}`);
            y4 = y + 2;
            battleshipCoord4.push(x, y4);
            fourthCoord = `${x.toString()},${y4.toString()}`;
            console.log(`fourthCoord says: ${fourthCoord}`);
            secondCell = document.getElementById(`${secondCoord}`);
            console.log(secondCell);
            thirdCell = document.getElementById(`${thirdCoord}`);
            console.log(thirdCell);
            fourthCell = document.getElementById(`${fourthCoord}`);
            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            let clone2 = draggableElement.cloneNode(true);
            thirdCell.appendChild(clone2);
            clone2.classList.add("cloned");
            clone2.removeAttribute("id");
            let clone3 = draggableElement.cloneNode(true);
            fourthCell.appendChild(clone3);
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
        } else if (startCell.includes("3")) {
            //then there is 2 ship placements to LHS and 1 to RHS
            y2 = y - 1;
            battleshipCoord2.push(x, y2);
            secondCoord = `${x.toString()},${y2.toString()}`;
            console.log(`secondCoord says: ${secondCoord}`);
            y3 = y - 2;
            battleshipCoord3.push(x, y3);
            thirdCoord = `${x.toString()},${y3.toString()}`;
            console.log(`thirdCoord says: ${thirdCoord}`);
            y4 = y + 1;
            battleshipCoord4.push(x, y4);
            fourthCoord = `${x.toString()},${y4.toString()}`;
            console.log(`fourthCoord says: ${fourthCoord}`);
            secondCell = document.getElementById(`${secondCoord}`);
            console.log(secondCell);
            thirdCell = document.getElementById(`${thirdCoord}`);
            console.log(thirdCell);
            fourthCell = document.getElementById(`${fourthCoord}`);
            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            let clone2 = draggableElement.cloneNode(true);
            thirdCell.appendChild(clone2);
            clone2.classList.add("cloned");
            clone2.removeAttribute("id");
            let clone3 = draggableElement.cloneNode(true);
            fourthCell.appendChild(clone3);
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
        } else if (startCell.includes("4")) {
            //then there is 3 ship placements to LHS and 0 to RHS
            y2 = y - 1;
            battleshipCoord2.push(x, y2);
            secondCoord = `${x.toString()},${y2.toString()}`;
            console.log(`secondCoord says: ${secondCoord}`);
            y3 = y - 2;
            battleshipCoord3.push(x, y3);
            thirdCoord = `${x.toString()},${y3.toString()}`;
            console.log(`thirdCoord says: ${thirdCoord}`);
            y4 = y - 3;
            battleshipCoord4.push(x, y4);
            fourthCoord = `${x.toString()},${y4.toString()}`;
            console.log(`fourthCoord says: ${fourthCoord}`);
            secondCell = document.getElementById(`${secondCoord}`);
            console.log(secondCell);
            thirdCell = document.getElementById(`${thirdCoord}`);
            console.log(thirdCell);
            fourthCell = document.getElementById(`${fourthCoord}`);
            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            let clone2 = draggableElement.cloneNode(true);
            thirdCell.appendChild(clone2);
            clone2.classList.add("cloned");
            clone2.removeAttribute("id");
            let clone3 = draggableElement.cloneNode(true);
            fourthCell.appendChild(clone3);
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
        }
        battleshipArr.push(battleshipCoord2);
        battleshipArr.push(battleshipCoord3);
        battleshipArr.push(battleshipCoord4);
        droppedShips.push(battleshipArr);

        //--------------------------------------------------------END OF BATTLESHIP SECTION--------------------------
    } else if (draggableElement.id.includes("cruiser")) {
        len = 3;
        draggableElement.style.width = "47px";
        let cruiserArr = [[x, y]];

        let cruiserCoord2 = [];
        let cruiserCoord3 = [];
        //Starting to integrate ship placing logic for rest of grid cells....
        if (startCell.includes("1")) {
            //then there are 2 more ship placements to the RHS
            y2 = y + 1;
            cruiserCoord2.push(x, y2);
            secondCoord = `${x.toString()},${y2.toString()}`;
            console.log(`secondCoord says: ${secondCoord}`);
            y3 = y + 2;
            cruiserCoord3.push(x, y3);
            thirdCoord = `${x.toString()},${y3.toString()}`;
            console.log(`thirdCoord says: ${thirdCoord}`);
            secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
            console.log(secondCell);
            thirdCell = document.getElementById(`${thirdCoord}`); //finding el where its id === thirdCoord
            console.log(thirdCell);
            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            let clone2 = draggableElement.cloneNode(true);
            thirdCell.appendChild(clone2);
            clone2.classList.add("cloned");
            clone2.removeAttribute("id");
            //make the occupied coords off-limits...
            dropzone.removeEventListener("dragover", allowDrop);
            dropzone.removeEventListener("drop", drop);
            secondCell.removeEventListener("dragover", allowDrop);
            secondCell.removeEventListener("drop", drop);
            thirdCell.removeEventListener("dragover", allowDrop);
            thirdCell.removeEventListener("drop", drop);
        } else if (startCell.includes("2")) {
            //then there are 1 ship placement to the LHS and 1 to the RHS
            y2 = y - 1;
            cruiserCoord2.push(x, y2);
            secondCoord = `${x.toString()},${y2.toString()}`;
            y3 = y + 1;
            cruiserCoord3.push(x, y3);
            thirdCoord = `${x.toString()},${y3.toString()}`;
            secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
            thirdCell = document.getElementById(`${thirdCoord}`); //finding el where its id === thirdCoord
            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            let clone2 = draggableElement.cloneNode(true);
            thirdCell.appendChild(clone2);
            clone2.classList.add("cloned");
            clone2.removeAttribute("id");
            //make the occupied coords off-limits...
            dropzone.removeEventListener("dragover", allowDrop);
            dropzone.removeEventListener("drop", drop);
            secondCell.removeEventListener("dragover", allowDrop);
            secondCell.removeEventListener("drop", drop);
            thirdCell.removeEventListener("dragover", allowDrop);
            thirdCell.removeEventListener("drop", drop);
        } else if (startCell.includes("3")) {
            //then there are 2 ship placements on LHS
            y2 = y - 1;
            cruiserCoord2.push(x, y2);
            secondCoord = `${x.toString()},${y2.toString()}`;
            y3 = y - 2;
            cruiserCoord3.push(x, y3);
            thirdCoord = `${x.toString()},${y3.toString()}`;
            secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
            thirdCell = document.getElementById(`${thirdCoord}`); //finding el where its id === thirdCoord
            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            let clone2 = draggableElement.cloneNode(true);
            thirdCell.appendChild(clone2);
            clone2.classList.add("cloned");
            clone2.removeAttribute("id");
            //make the occupied coords off-limits...
            dropzone.removeEventListener("dragover", allowDrop);
            dropzone.removeEventListener("drop", drop);
            secondCell.removeEventListener("dragover", allowDrop);
            secondCell.removeEventListener("drop", drop);
            thirdCell.removeEventListener("dragover", allowDrop);
            thirdCell.removeEventListener("drop", drop);
        }
        cruiserArr.push(cruiserCoord2);
        cruiserArr.push(cruiserCoord3);
        droppedShips.push(cruiserArr);
        console.log(droppedShips);
        //--------------------------------------------------------END OF CRUISERS SECTION--------------------------
    } else if (draggableElement.id.includes("sub")) {
        len = 2;
        draggableElement.style.width = "47px";
        let subArr = [[x, y]];

        let subCoord2 = [];
        //Starting to integrate ship placing logic for rest of grid cells....
        if (startCell.includes("1")) {
            console.log(`startCell says: ${startCell}`);
            //then there are 1 more ship placements to the RHS
            y2 = y + 1;
            subCoord2.push(x, y2);
            secondCoord = `${x.toString()},${y2.toString()}`;
            console.log(`secondCoord says: ${secondCoord}`);
            secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
            console.log(secondCell);
            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");
            //make the occupied coords off-limits...
            dropzone.removeEventListener("dragover", allowDrop);
            dropzone.removeEventListener("drop", drop);
            secondCell.removeEventListener("dragover", allowDrop);
            secondCell.removeEventListener("drop", drop);
        } else if (startCell.includes("2")) {
            //then there are 1 ship placement to the LHS
            console.log(`startCell says: ${startCell}`);
            y2 = y - 1;
            secondCoord = `${x.toString()},${y2.toString()}`;
            secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
            let draggableElementClone = draggableElement.cloneNode(true);
            dropzone.appendChild(draggableElementClone);
            draggableElementClone.classList.add("cloned");
            draggableElementClone.removeAttribute("id");
            let clone1 = draggableElement.cloneNode(true);
            secondCell.appendChild(clone1);
            clone1.classList.add("cloned");
            clone1.removeAttribute("id");

            //make the occupied coords off-limits...
            dropzone.removeEventListener("dragover", allowDrop);
            dropzone.removeEventListener("drop", drop);
            secondCell.removeEventListener("dragover", allowDrop);
            secondCell.removeEventListener("drop", drop);
        }
        subArr.push(subCoord2);
        droppedShips.push(subArr);
        //--------------------------------------------------------END OF SUBS SECTION--------------------------
    } else if (draggableElement.id.includes("destroyer")) {
        len = 1;
        let destroyerArr = [[x, y]];

        //we leave the width as it is at 149px...
        let draggableElementClone = draggableElement.cloneNode(true);
        dropzone.appendChild(draggableElementClone);
        droppedShips.push(destroyerArr); //building the droppedShips array to supply selected_positions
        console.log(destroyerArr);
        draggableElementClone.classList.add("cloned");
        draggableElementClone.removeAttribute("id");
    }

    console.log(droppedShips);
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
    const undraggableElement = document.getElementById(event.target.id);
    //console.log(undraggableElement);
    //console.log(undraggableElement.hasAttribute("draggable"));

    let clonedElements = document.querySelectorAll(".cloned");
    for (let i = 0; i < clonedElements.length; i++) {
        clonedElements[i].removeAttribute("draggable");
        clonedElements[i].removeEventListener("dragstart", drag);
        clonedElements[i].removeEventListener("dragend", dragEnd);
    }

    /* let clonedChildren = document.querySelectorAll(".cloned *");
    for (let i = 0; i < clonedChildren.length; i++) {
        clonedChildren[i].removeEventListener("mousedown", mousedownGridClick);
    }*/

    undraggableElement.removeAttribute("draggable");
    undraggableElement.removeEventListener("dragstart", drag);
    undraggableElement.removeEventListener("dragend", dragEnd);
}

/*export function mousedownGridClick(e) {
    //should be setting data-clicked attr on parent ship of internal sq that is clicked....
    const cellsq = e.target.id;
    console.log(cellsq);
    e.target.dataset.clicked = cellsq;
    console.log(`cellSq in mousedownGridClick says: ${cellSq}`);
    // e.target.id.dataset.cellsquare = e.target.id;
} */
