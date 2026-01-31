import { describe, expect, it } from "vitest";
import { calculateTotals } from "./utils/score.js";

describe("calculateTotals", () => {
  it("sums per player across holes", () => {
    const players = [{ name: "A" }, { name: "B" }, { name: "C" }];
    const scores = [
      [3, 4, 5],
      [2, 3, 4],
      [0, 1, 2],
    ];
    expect(calculateTotals(players, scores)).toEqual([5, 8, 11]);
  });

  it("ignores nulls and validates non-negative integers", () => {
    const players = [{ name: "A" }, { name: "B" }];
    const scores = [
      [null, 4],
      [2, -1],
      [Infinity, 3],
    ];
    expect(calculateTotals(players, scores)).toEqual([2, 7]);
  });
});
