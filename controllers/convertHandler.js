const validFraction = /^(\d+(\.\d+)?\/\d+(\.\d+)?)$/;

function ConvertHandler() {
  this.getNum = function (input) {
    const unit = this.getUnit(input);
    let result = unit == "" ? input : input.split(unit)[0];

    if (result == "") result = 1;
    result = validFraction.test(result) == true ? eval(result) : result;

    return Number(result);
  };

  this.getUnit = function (input) {
    const inputArr = input.split("");
    let result = inputArr
      .filter((s) => !Number(s) && isNaN(s))
      .join("")
      .replace(/[^\w\s]/gi, "");

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    const unit = initUnit.toLowerCase();
    switch (unit) {
      case "kg":
        return "lbs";
      case "lbs":
        return "kg";
      case "gal":
        return "L";
      case "l":
        return "gal";
      case "mi":
        return "km";
      case "km":
        return "mi";
      default:
        return "invalid unit";
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit.toLowerCase()) {
      case "kg":
        return "kilograms";
      case "lbs":
        return "pounds";
      case "gal":
        return "gallons";
      case "l":
        return "liters";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      default:
        return "invalid unit";
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit.toLowerCase()) {
      case "kg":
        return Number((initNum / lbsToKg).toFixed(5));
      case "lbs":
        return Number((initNum * lbsToKg).toFixed(5));
      case "gal":
        return Number((initNum * galToL).toFixed(5));
      case "l":
        return Number((initNum / galToL).toFixed(5));
      case "mi":
        return Number((initNum * miToKm).toFixed(5));
      case "km":
        return Number((initNum / miToKm).toFixed(5));
      default:
        return "invalid number";
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
