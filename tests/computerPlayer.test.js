import ComputerPlayer from "../app-logic/computerPlayer";
import { describe, expect, it, test } from "vitest";
describe("#ComputerPlayer", () => {
    test("the calcSelectedPositions method will compute a set of data for placing 10 AI ships on the board (setting the _attackPositions property), the selectedPositions getter should return that data", () => {
        const computerPlayer = new ComputerPlayer();
        computerPlayer.calcSelectedPositions();
        expect(computerPlayer.selectedPositions).toBeDefined;
    });
});
