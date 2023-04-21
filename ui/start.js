export const startBtnDisplay = (addRemove) => {
    const appWrapper = document.getElementById("app");
    if (addRemove === "add") {
        const startBtn = document.createElement("button");
        startBtn.setAttribute("id", "startButton");
        startBtn.innerText = "START";
        appWrapper.appendChild(startBtn);
    } else if (addRemove === "remove") {
        const startBtn = document.getElementById("startButton");
        appWrapper.removeChild(startBtn);
    }
};
