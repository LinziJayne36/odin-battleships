export const gameTitleDisplay = (addRemove) => {
    const appWrapper = document.getElementById("app");
    if (addRemove === "add") {
        const title = document.createElement("h1");
        title.setAttribute("id", "title");
        title.innerText = "BATTLESHIP";
        appWrapper.appendChild(title);
    } else if (addRemove === "remove") {
        const title = document.getElementById("title");
        appWrapper.removeChild(title);
    }
};
