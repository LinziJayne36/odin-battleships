export const sunkMsg = (msgTxt, addRemove) => {
    const appWrapper = document.getElementById("app");
    if (addRemove === "add") {
        const msgWrapper = document.createElement("div");
        msgWrapper.setAttribute("class", "sunkMsg");
        appWrapper.appendChild(msgWrapper);
        msgWrapper.innerText = msgTxt;
    } else if (addRemove === "remove") {
        const msgWrapper = document.querySelector(".sunkMsg");
        appWrapper.removeChild(msgWrapper);
    }
};
