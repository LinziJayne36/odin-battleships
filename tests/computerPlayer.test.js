import ComputerPlayer from "../app-logic/computerPlayer";
import { describe, expect, it, test } from "vitest";
describe("#ComputerPlayer", () => {
    test("the calcSelectedPositions method always generates the correct number of positions", () => {
        const computerPlayer = new ComputerPlayer();
        computerPlayer.calcSelectedPositions();
        const numPositions = computerPlayer.selectedPositions.reduce(
            (acc, curr) => acc + curr.length,
            0
        );
        expect(numPositions).toBe(20);
    });
    test("the alreadyAttacked property is updated whenever the computer makes another attack", () => {
        const computerPlayer = new ComputerPlayer();
        expect(computerPlayer.alreadyAttacked).toEqual([]);
        computerPlayer.calcAttackSq();
        expect(computerPlayer.alreadyAttacked.length).toBe(1);
    });
});
