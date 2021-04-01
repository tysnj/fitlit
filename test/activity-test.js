const chai = require("chai");
const expect = chai.expect;

const userDataFile = require("../data/user-test-data");
const users = userDataFile.userTestData;
const UserRepository = require("../src/user-repo");
const User = require("../src/users")

const dataFile = require("../data/activity-test-data");
const activityData = dataFile.activityTestData.reverse();
const Activity = require("../src/activity");

describe("Activity", function() {
  let activity;

  beforeEach(function() {
    userRepo = new UserRepository(users);
    activity = new Activity(userRepo.users[0].id, activityData);
  });

  it("should be a function", function() {
    expect(Activity).to.be.a("function");
  });

  it("should be an instance of Activity", function() {
    expect(activity).to.be.an.instanceOf(Activity);
  });

  it("should be able to contain a single user's activity data", function() {
    expect(activity.userActivity).to.deep.equal(
      [
        {
          "userID": 1,
          "date": "2019/06/16",
          "numSteps": 6637,
          "minutesActive": 175,
          "flightsOfStairs": 36
        },
        {
          "userID": 1,
          "date": "2019/06/15",
          "numSteps": 3577,
          "minutesActive": 140,
          "flightsOfStairs": 16
        }
      ]
    )
  });

  it("should calculate miles walked for a given day", function() {
    expect(activity.getMilesByDay("2019/06/15", userRepo.users[0].strideLength)).to.equal(2.91);
    expect(activity.getMilesByDay("2019/06/16", userRepo.users[0].strideLength)).to.equal(5.41);
  });

  it("should find the minutes active on a given day", function() {
    expect(activity.getTimeActiveByDay("2019/06/15")).to.equal(140);
    expect(activity.getTimeActiveByDay()).to.equal(175);
  });

  it("should calculate minutes active average for a given week", function() {
    expect(activity.getTimeActiveAvgByWeek("2019/06/15")).to.equal(140);
    expect(activity.getTimeActiveAvgByWeek()).to.equal(158);
  });

})
