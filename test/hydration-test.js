const chai = require("chai");
const expect = chai.expect;

const userDataFile = require("../data/user-test-data");
const users = userDataFile.userTestData;
const UserRepository = require("../src/user-repo");
const User = require("../src/users")

const dataFile = require("../data/hydration-test-data");
const hydrationData = dataFile.hydrationTestData;
const Hydration = require("../src/hydration");

describe ("Hydration", function() {
  let user, hydration;

  beforeEach(function() {
    userRepo = new UserRepository(users);
    hydration = new Hydration(userRepo.users[0].id, hydrationData);
  });

  it("should be a function", function() {
    expect(Hydration).to.be.a("function");
  });

  it("should be an instance of Hydration", function() {
    expect(hydration).to.be.an.instanceOf(Hydration);
  });

  it("should be able to contain a single user's hydration data", function() {
    expect(hydration.userHydration).to.deep.equal(
      [
        {
          "userID": 1,
          "date": "2019/06/15",
          "numOunces": 37
        },
        {
          "userID": 1,
          "date": "2019/06/16",
          "numOunces": 69
        }
      ]
    )
  });

  it("should get the user\'s daily hydration average over all time", function() {
    expect(hydration.dailyAvgAllTime()).to.equal(53);
  });

  it("should get the user\'s hydration data for the specified day", function() {
    expect(hydration.ouncesOnDay()).to.equal(69)
    expect(hydration.ouncesOnDay(hydration.userHydration[0].date)).to.equal(37);
  });

  it("should get the user\'s daily hydration data for the week leading to specified day", function() {
    expect(hydration.dailyOverWeek()).to.deep.equal([37, 69]);
    expect(hydration.dailyOverWeek("2019/06/15")).to.deep.equal([37]);
  });

});
