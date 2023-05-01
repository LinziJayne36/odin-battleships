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

export function drop(event) {
    //works for a single-cell ship
    console.log("drop event has fired");
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    console.log(data);
    const draggableElement = document.getElementById(data);
    console.log(draggableElement);
    const clickedShipCell = draggableElement.dataset.clicked;
    console.log(clickedShipCell);
    const refClickedShipCell = document.querySelector(`#${clickedShipCell}`); //dom reference to the clicked shipCell within ship
    console.log(refClickedShipCell);
    const dropzone = event.target; //also going to be the grid cell where we place the first ship
    console.log(dropzone); //returns dropzone element correctly
    let len;
    //splitting the width ready to drop...and calculating which coords to put the ship on
    let startCell = refClickedShipCell.id; //id of shipCell mouse picked up on eg 'cruiseCell1'
    console.log(`startCell says: ${startCell}`);
    let secondCell;
    let thirdCell;
    let fourthCell;
    let firstCoord = dropzone.id; //coord of first drop location
    console.log(`firstCoord says: ${firstCoord}`);
    let x = parseInt(firstCoord[0]); //PROBLEM: When there are double digits in the coord before the comma these x and y variables are set incorrectly.
    console.log(`x says: ${x}`);
    let y = parseInt(firstCoord[1]);
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
    } else if (draggableElement.id.includes("cruiser")) {
        len = 3;
        draggableElement.style.width = "47px";
        //Starting to integrate ship placing logic for rest of grid cells....
        if (startCell.includes("1")) {
            //then there are 2 more ship placements to the RHS
            y2 = y + 1;
            secondCoord = `${x.toString()},${y2.toString()}`;
            console.log(`secondCoord says: ${secondCoord}`);
            y3 = y + 2;
            thirdCoord = `${x.toString()},${y3.toString()}`;
            console.log(`thirdCoord says: ${thirdCoord}`);
            secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
            console.log(`secondCell says: ${secondCell}`);
            thirdCell = document.getElementById(`${thirdCoord}`); //finding el where its id === thirdCoord
            console.log(`thirdCell says: ${thirdCell}`);
            secondCell.appendChild(draggableElement);
            thirdCell.appendChild(draggableElement);
        } else if (startCell.includes("2")) {
            //then there are 1 ship placement to the LHS and 1 to the RHS
            y2 = y - 1;
            secondCoord = `${x.toString()},${y2.toString()}`;
            y3 = y + 1;
            thirdCoord = `${x.toString()},${y3.toString()}`;
            secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
            thirdCell = document.getElementById(`${thirdCoord}`); //finding el where its id === thirdCoord
            secondCell.appendChild(draggableElement);
            thirdCell.appendChild(draggableElement);
        } else if (startCell.includes("3")) {
            //then there are 2 ship placements on LHS
            y2 = y - 1;
            secondCoord = `${x.toString()},${y2.toString()}`;
            y3 = y - 2;
            thirdCoord = `${x.toString()},${y3.toString()}`;
            secondCell = document.getElementById(`${secondCoord}`); //finding el where its id === secondCoord
            thirdCell = document.getElementById(`${thirdCoord}`); //finding el where its id === thirdCoord
            secondCell.appendChild(draggableElement);
            thirdCell.appendChild(draggableElement);
        }
    } else if (draggableElement.id.includes("sub")) {
        len = 2;
        draggableElement.style.width = "47px";
    } else if (draggableElement.id.includes("destroyer")) {
        len = 1;
        //we leave the width as it is at 149px...
    }

    dropzone.appendChild(draggableElement);
}
