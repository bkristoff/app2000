import assert from "assert";
import { kinopris } from "./../kino.js";

describe("kinopris", function () {
  it("burde returnere 0 når alder <= 5", function () {
    assert.equal(kinopris(80, 4), 0);
  });
  it("burde returnere full pris for alder mellom 12 og 60", function () {
    assert.equal(kinopris(80, 20), 80);
  });
  it("burde returnere halv pris når alder = 7", function () {
    assert.equal(kinopris(80, 7), 40);
  });
});
