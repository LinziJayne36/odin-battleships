export const userMsg = (msgTxt, addRemove) => {
    const appWrapper = document.getElementById("app");
    if (addRemove === "add") {
        const msgWrapper = document.createElement("div");
        msgWrapper.setAttribute("class", "userMsg");
        appWrapper.appendChild(msgWrapper);
        msgWrapper.innerText = msgTxt;
    } else if (addRemove === "remove") {
        const msgWrapper = document.querySelector(".userMsg");
        appWrapper.removeChild(msgWrapper);
    }
};
