import Player from "../app-logic/player";
import { describe, expect, test } from "vitest";

describe("#Player", () => {
    test("the setAttackSq setter should set the value of attackSq property, while the getter should return it", () => {
        //NOTE: the value for this property will eventually come from a DOM interaction module but is for this test,  limited dummy data is simply provided here
        const player = new Player();
        player.setAttackSq = [2, 4];
        expect(player.setAttackSq).toEqual([2, 4]);
    });
    test("the selectedPositions setter should set the value of the selectedPositions property, while the getter should return them", () => {
        //NOTE: the values for this property will eventually come from a DOM interaction module but for this test, limited dummy data is simply provided here
        const player = new Player();
        player.selectedPositions = [
            [
                [2, 2],
                [2, 3],
                [2, 4],
                [2, 5],
            ],
        ]; //dummy data to position one 4 length ship
        expect(player.selectedPositions).toEqual([
            [
                [2, 2],
                [2, 3],
                [2, 4],
                [2, 5],
            ],
        ]);
    });
});
