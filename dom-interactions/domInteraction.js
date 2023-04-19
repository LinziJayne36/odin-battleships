/*export function handlingGridClicks(row, col) {
    console.log(`grid cell ${row}, ${col} was clicked`);
}*/

export const getPlayerAttackInput = (cellClass) => {
    //ie. 'playerSquares' or 'computerSquares'
    //where cellClass tells us which player'g grid we are attaching the event listeners to...
    return new Promise((resolve) => {
        const squares = document.querySelectorAll(`.${cellClass}`);
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
