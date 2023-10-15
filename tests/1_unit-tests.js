const chai = require("chai");
let assert = chai.assert;
let expect = chai.expect;
const ConvertHandler = require("../controllers/convertHandler.js");
const validFraction = /^(\d+(\.\d+)?\/\d+(\.\d+)?)$/;

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("read a whole number input.", function () {
    assert.isNumber(convertHandler.getNum("3mi"));
  });
  test("read decimal number", function () {
    assert.strictEqual(convertHandler.getNum("3.5mi"), 3.5);
  });
  test("read fractional input", function () {
    assert.isTrue(validFraction.test("3/2"), "read a fractional input.");
  });
  test("read fractional input with decimal", function () {
    assert.strictEqual(convertHandler.getNum("3.5/2"), 1.75);
  });
  test("return an error on a double-fraction", function () {
    assert.isNaN(convertHandler.getNum("3/2/3"));
  });
  test("default to a numerical input of 1 when no numerical input is provided", function () {
    assert.strictEqual(convertHandler.getNum("mi"), 1);
  });
  test("read each valid input unit", function () {
    assert.strictEqual(convertHandler.getUnit("3mi"), "mi");
    assert.strictEqual(convertHandler.getUnit("3km"), "km");
    assert.strictEqual(convertHandler.getUnit("3gal"), "gal");
    assert.strictEqual(convertHandler.getUnit("3lbs"), "lbs");
    assert.strictEqual(convertHandler.getUnit("3kg"), "kg");
    assert.strictEqual(convertHandler.getUnit("3l"), "l");
  });
  test("return an error for an invalid input unit", function () {
    assert.strictEqual(convertHandler.getUnit("3min"), "min");
  });
  test("return the correct return unit for each valid input unit", function () {
    assert.strictEqual(convertHandler.getReturnUnit("mi"), "km");
    assert.strictEqual(convertHandler.getReturnUnit("km"), "mi");
    assert.strictEqual(convertHandler.getReturnUnit("gal"), "L");
    assert.strictEqual(convertHandler.getReturnUnit("l"), "gal");
    assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg");
    assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs");
  });
  test("return the spelled-out string unit for each valid input unit", function () {
    assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles");
    assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers");
    assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons");
    assert.strictEqual(convertHandler.spellOutUnit("l"), "liters");
    assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms");
  });
  test("convert gal to L", function () {
    assert.strictEqual(convertHandler.convert(1, "gal"), 3.78541);
  });
  test("convert L to gal", function () {
    assert.strictEqual(convertHandler.convert(1, "l"), 0.26417);
  });
  test("convert mi to km", function () {
    assert.strictEqual(convertHandler.convert(1, "mi"), 1.60934);
  });
  test("convert km to mi", function () {
    assert.strictEqual(convertHandler.convert(1, "km"), 0.62137);
  });
  test("convert lbs to kg", function () {
    assert.strictEqual(convertHandler.convert(1, "lbs"), 0.45359);
  });
  test("convert kg to lbs", function () {
    assert.strictEqual(convertHandler.convert(1, "kg"), 2.20462);
  });
});
