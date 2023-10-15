"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    const { input } = req.query;
    const initNum = convertHandler.getNum(input);
    const initUnit =
      convertHandler.getUnit(input) == "l"
        ? "L"
        : convertHandler.getUnit(input) == "L"
        ? "L"
        : convertHandler.getUnit(input).toLowerCase();
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    if ((initNum <= 0 || isNaN(initNum)) && returnUnit === "invalid unit") {
      res.send("invalid number and unit");
    } else if (returnUnit === "invalid unit") {
      res.send("invalid unit");
    } else if (initNum <= 0 || isNaN(initNum)) {
      res.send("invalid number");
    } else {
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: toString,
      });
    }
  });
};
