import Ships from "../app-logic/ships";
import { describe, expect, it, test } from "vitest";

describe("#Ships", () => {
    it("returns a ship object when a length integer value is passed in, and has null length, hits, and sunk properties", () => {
        expect(new Ships(2)).toBeDefined({
            length: 2,
            hits: null,
            sunk: null,
        });
    });
    test("hit method should increment the ship object hit property value by 1", () => {
        const ship1 = new Ships(4);
        ship1.hit();
    });
    test("referencing the sunk property should accurately report true or false for whether ship is sunk", () => {
        const ship1 = new Ships(6);
        ship1.hits;
        ship1.hits;
        expect(ship1.sunk).toBeFalsy;
    });
});
