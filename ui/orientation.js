export const orientationBtnDisplay = () => {
    const appWrapper = document.getElementById("app");
    const orientationBtn = document.createElement("button");
    orientationBtn.setAttribute("id", "orientationBtn");
    orientationBtn.innerText = "VERTICAL";
    appWrapper.appendChild(orientationBtn);
};
