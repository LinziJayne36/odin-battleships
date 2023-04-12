import gameLoop from "../main";
import { describe, expect, test } from "vitest";
describe("#gameLoop", () => {
    test("the gameLoop function will be defined", () => {
        expect(gameLoop()).toBeDefined;
        //expect(playerGameboard.attackSq).toBe(null);
    });
});
