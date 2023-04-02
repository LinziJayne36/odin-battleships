import Ship from "../app-logic/ship";
import { describe, expect, it, test } from "vitest";

describe("#Ship", () => {
    test("hit method should increment the ship object hit property value by 1", () => {
        const ship1 = new Ship(4);
        ship1.hit();
    });
    test("referencing the sunk property should accurately report true or false for whether ship is sunk", () => {
        const ship1 = new Ship(6);
        ship1.hits;
        ship1.hits;
        expect(ship1.sunk).toBeFalsy;
    });
});
