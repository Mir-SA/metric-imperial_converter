const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Integration tests with chai-http", function () {
    // #1
    test("convert valid input", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=10L")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, "L");
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, "gal");
          done();
        });
    });
    // #2
    test("convert invalid input", function () {
      chai
        .request(server)
        .get("/api/convert?input=32g")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid unit");
        });
    });
    // #3
    test("convert an invalid number", function () {
      chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kg")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number");
        });
    });
    // #4
    test("convert an invalid number AND unit", function () {
      chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kilomegagram")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number and unit");
        });
    });
    // #5
    test("convert with no number", function () {
      chai
        .request(server)
        .get("/api/convert?input=kg")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, "kg");
          assert.approximately(res.body.returnNum, 2.20462, 0.1);
          assert.equal(res.body.returnUnit, "lbs");
        });
    });
  });
});
