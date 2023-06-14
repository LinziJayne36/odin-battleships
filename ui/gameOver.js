export const gameOverMsg = (msgTxt, addRemove) => {
    const appWrapper = document.getElementById("app");
    if (addRemove === "add") {
        const msgWrapper = document.createElement("div");
        msgWrapper.setAttribute("class", "gameOverMsg");
        appWrapper.appendChild(msgWrapper);
        msgWrapper.innerText = msgTxt;
    } else if (addRemove === "remove") {
        const msgWrapper = document.querySelector(".gameOverMsg");
        appWrapper.removeChild(msgWrapper);
    }
};
