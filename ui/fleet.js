export const playerFleetDisplay = () => {
    //code to display the ships players will drag n drop...
    let battleshipCount = 1;
    let cruiserCount = 2;
    let subCount = 3;
    let destroyerCount = 4;

    const appWrapper = document.getElementById("app");
    const fleetWrapper = document.createElement("div");
    fleetWrapper.setAttribute("class", "fleetWrapper");
    appWrapper.appendChild(fleetWrapper);

    //SETTING UP BATTLESHIP SECTION.. x1 ship icon added and then a count of how many left to place
    const battleshipWrapper = document.createElement("div");
    const battleshipIconsDiv = document.createElement("div");
    const battleshipCountDiv = document.createElement("div");
    const battleshipCountVal = document.createElement("p");
    battleshipIconsDiv.setAttribute("class", "battleshipIconsDiv");
    battleshipCountDiv.setAttribute("class", "battleshipCountDiv");
    battleshipWrapper.setAttribute("class", "typeWrapper");
    battleshipWrapper.setAttribute("id", "battleshipWrapper");
    battleshipCountVal.setAttribute("class", "battleshipCountVal");

    const battleship = document.createElement("div");
    battleship.setAttribute("class", "battleship"); //use class .battleship to style the ship

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
    battleshipCountVal.innerText = battleshipCount;

    //SETTING UP CRUISERS SECTION .. x1 ship icon added and then a count of how many left to place
    const cruiserWrapper = document.createElement("div");
    const cruiserIconsDiv = document.createElement("div");
    const cruiserCountDiv = document.createElement("div");
    const cruiserCountVal = document.createElement("p");
    cruiserIconsDiv.setAttribute("class", "cruiserIconsDiv");
    cruiserCountDiv.setAttribute("class", "cruiserCountDiv");
    cruiserWrapper.setAttribute("class", "typeWrapper");
    cruiserWrapper.setAttribute("id", "cruiserWrapper");
    cruiserCountVal.setAttribute("class", "cruiserCountVal");

    const cruiser = document.createElement("div");
    cruiser.setAttribute("class", "cruiser"); //use class .cruiser to style the ship

    //Adds the cruiser wrapper to the main fleet wrapper
    fleetWrapper.appendChild(cruiserWrapper);
    //Adds the cruiserhipIconsDiv to the cruiserWrapper
    cruiserWrapper.appendChild(cruiserIconsDiv);
    //Adds the cruiserCountDiv to the cruiserWrapper
    cruiserWrapper.appendChild(cruiserCountDiv);
    //Adds the cruiser to the cruiserIconsDiv
    cruiserIconsDiv.appendChild(cruiser);
    //Adds the cruiserCountVal p elem to the cruiserCountDiv
    cruiserCountDiv.appendChild(cruiserCountVal);
    //Writes the variable value of cruiserCount to the cruiserCountVal p elem
    cruiserCountVal.innerText = cruiserCount;
};
