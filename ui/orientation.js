export const orientationBtnDisplay = (addRemove) => {
    const appWrapper = document.getElementById("app");
    if (addRemove === "add") {
        const orientationBtn = document.createElement("button");
        orientationBtn.setAttribute("id", "orientationBtn");
        orientationBtn.innerText = "VERTICAL";
        appWrapper.appendChild(orientationBtn);
    } else if (addRemove === "remove") {
        const orientationBtn = document.getElementById("orientationBtn");
        appWrapper.removeChild(orientationBtn);
    }
};
