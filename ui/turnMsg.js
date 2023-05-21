export const turnMsg = (whoseTurn, addRemove) => {
    const appWrapper = document.querySelector(".appWrapper");
    const msgWrapper = document.createElement("div");
    msgWrapper.setAttribute("class", "turnMsg");
    appWrapper.appendChild(msgWrapper);
};
