import Player from "../app-logic/player";
import { describe, expect, test } from "vitest";

describe("#Player", () => {
    test("the attackSq setter should set the value of attackSq property, while the getter should return it", () => {
        //NOTE: the value for this property will eventually come from a DOM interaction module but is for this test,  limited dummy data is simply provided here
        const player = new Player();
        player.attackSq = [2, 4];
        expect(player.attackSq).toEqual([2, 4]);
    });
    test("the selectedPositions setter should set the value of the selectedPositions property, while the getter should return them", () => {
        //NOTE: the values for this property will eventually come from a DOM interaction module but for this test, limited dummy data is simply provided here
        const player = new Player();
        player.selectedPositions = [
            [
                [0, 6],
                [0, 7],
                [0, 8],
                [0, 9],
            ],
            [
                [5, 3],
                [5, 4],
                [5, 5],
            ],
            [
                [1, 2],
                [1, 3],
                [1, 4],
            ],
            [
                [5, 9],
                [5, 10],
            ],
            [
                [1, 3],
                [2, 3],
            ],
            [
                [7, 7],
                [7, 8],
            ],
            [[3, 4]],
            [[5, 9]],
            [[7, 5]],
            [[1, 4]],
        ]; //dummy data to position one 4 length ship, two 3 length ships, three 2 length ships, and four 1 length ships
        //console.log(player.selectedPositions);
        expect(player.selectedPositions).toEqual([
            [
                [0, 6],
                [0, 7],
                [0, 8],
                [0, 9],
            ],
            [
                [5, 3],
                [5, 4],
                [5, 5],
            ],
            [
                [1, 2],
                [1, 3],
                [1, 4],
            ],
            [
                [5, 9],
                [5, 10],
            ],
            [
                [1, 3],
                [2, 3],
            ],
            [
                [7, 7],
                [7, 8],
            ],
            [[3, 4]],
            [[5, 9]],
            [[7, 5]],
            [[1, 4]],
        ]);
    });
});
