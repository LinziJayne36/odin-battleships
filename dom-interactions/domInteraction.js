/*export function handlingGridClicks(row, col) {
    console.log(`grid cell ${row}, ${col} was clicked`);
}*/

export const getPlayerAttackInput = () => {
    return new Promise((resolve) => {
        const squares = document.querySelectorAll(".squares");
        let inputCoord;
        squares.forEach((square) => {
            square.addEventListener("click", (event) => {
                const row = parseInt(event.target.dataset.row);
                const col = parseInt(event.target.dataset.col);
                inputCoord = [row, col];
                squares.forEach((square) =>
                    square.removeEventListener("click", () => {})
                );
                resolve(inputCoord);
            });
        });
    });
};
