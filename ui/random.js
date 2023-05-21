export const randomBtnDisplay = (addRemove) => {
    const appWrapper = document.getElementById("app");
    if (addRemove === "add") {
        const randomBtn = document.createElement("button");
        randomBtn.setAttribute("id", "randomBtn");
        randomBtn.innerText = "RANDOM";
        appWrapper.appendChild(randomBtn);
    } else if (addRemove === "remove") {
        const randomBtn = document.getElementById("randomBtn");
        appWrapper.removeChild(randomBtn);
    }
};
