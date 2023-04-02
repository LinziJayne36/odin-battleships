import Ship from "../app-logic/ship";
import { describe, expect, it, test } from "vitest";

describe("#Ship", () => {
    test("hit method should increment the ship object hit property value by 1", () => {
        const ship1 = new Ship(4);
        ship1.hit();
        ship1.hit();
        expect(ship1.hits).toBe(2);
    });
    test("referencing the sunk property should accurately report true or false for whether ship is sunk", () => {
        const ship2 = new Ship(3);
        ship2.hit();
        ship2.hit();
        expect(ship2.sunk).toEqual(false);
    });
    test("the coords setter method should pass in coordinates to the coords property of ship object with the coords getter method returning them", () => {
        const ship3 = new Ship(1);
        ship3.setCoords = [3, 9];
        expect(ship3.getCoords).toEqual([3, 9]);
    });
});
