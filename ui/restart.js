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

        restartBtn.addEventListener("click", (ev) => {
            console.log("restartBtn event listener was just triggered");
            //TODO: write code to reset whole game
            location.reload();
        });
    } else if (addRemove === "remove") {
        const restartBtn = document.getElementById("restartButton");
        appWrapper.removeChild(restartBtn);
    }
};
