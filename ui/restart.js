export const restartBtnDisplay = (addRemove) => {
    const appWrapper = document.getElementById("app");
    if (addRemove === "add") {
        console.log(
            "should be adding the restart button now, if the restartBtnDisplay function is even running"
        );
        const restartBtn = document.createElement("button");
        restartBtn.setAttribute("id", "restartButton");
        restartBtn.innerText = "RESTART";
        appWrapper.appendChild(restartBtn);
    } else if (addRemove === "remove") {
        const restartBtn = document.getElementById("restartButton");
        appWrapper.removeChild(restartBtn);
    }
};
