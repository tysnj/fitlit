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
    activity1 = new Activity(userRepo.users[0].id, activityData);
    activity2 = new Activity(userRepo.users[1].id, activityData);
  });

  it("should be a function", function() {
    expect(Activity).to.be.a("function");
  });

  it("should be an instance of Activity", function() {
    expect(activity1).to.be.an.instanceOf(Activity);
  });

  it("should be able to contain a single user's activity data", function() {
    expect(activity1.userActivity).to.deep.equal(
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
    expect(activity1.getMilesByDay("2019/06/15", userRepo.users[0].strideLength)).to.equal(2.91);
    expect(activity1.getMilesByDay("2019/06/16", userRepo.users[0].strideLength)).to.equal(5.41);
  });

  it("should find the minutes active on a given day", function() {
    expect(activity1.getActivityByDay("2019/06/15", "minutesActive")).to.equal(140);
    expect(activity1.getActivityByDay("2019/06/16", "minutesActive")).to.equal(175);
  });

  it("should calculate the minutes active averaged for a given week", function() {
    expect(activity1.getTimeActiveAvgByWeek("2019/06/15")).to.equal(140);
    expect(activity1.getTimeActiveAvgByWeek("2019/06/16")).to.equal(158);
  });

  it("should tell if a user reached their step goal for a given day", function() {
    expect(activity1.checkStepGoalAchieved("2019/06/16", userRepo.users[0].dailyStepGoal)).to.equal(false);
    expect(activity2.checkStepGoalAchieved("2019/06/15", userRepo.users[1].dailyStepGoal)).to.equal(true);
  });

  it("should find all the days where they achieved their step goal", function () {
    expect(activity1.getDaysGoalAchieved(userRepo.users[0].dailyStepGoal)).to.deep.equal([]);
    expect(activity2.getDaysGoalAchieved(userRepo.users[1].dailyStepGoal)).to.deep.equal([
      {
        "userID": 2,
        "date": "2019/06/15",
        "numSteps": 5294,
        "minutesActive": 138,
        "flightsOfStairs": 10,
        "day": 6
      }
    ]);
  });

  it("should find the user\'s all-time stair climbing record", function() {
    expect(activity1.getStairClimbingRecord()).to.deep.equal(
      {
        "userID": 1,
        "date": "2019/06/16",
        "numSteps": 6637,
        "minutesActive": 175,
        "flightsOfStairs": 36,
      }
    )
  });

  it("should find average stairs climed across all users for a given date", function() {
    expect(activity1.findAvgDataForAllByDay("2019/06/15", "flightsOfStairs")).to.equal(13)
  });

  it("should find average number of steps across all users for a given date", function() {
    expect(activity1.findAvgDataForAllByDay("2019/06/15", "numSteps")).to.equal(4436)
  });

  it("should find average minutes active across all users for a given date", function() {
    expect(activity1.findAvgDataForAllByDay("2019/06/15", "minutesActive")).to.equal(139)
  });

})
