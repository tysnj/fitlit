const chai = require("chai");
const expect = chai.expect;

const dataFile = require("../data/sleep-test-data");
const sleepData = dataFile.sleepTestData;
const userDataFile = require("../data/user-test-data");
const users = userDataFile.userTestData;

const Sleep = require("../src/sleep");
const UserRepository = require("../src/user-repo");

describe("Sleep", function() {
  let userRepo, sleep;

  beforeEach(function() {
    userRepo = new UserRepository(users);
    sleep = new Sleep(userRepo.users[0].id, sleepData)
  });

  it("should be a function", function() {
    expect(Sleep).to.be.a("function");
  });

  it("should be an instance of Sleep", function() {
    expect(sleep).to.be.an.instanceOf(Sleep);
  });

  it("should contain a single user's sleep data", function() {
    expect(sleep.userSleep).to.deep.equal([{
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    },
    {
      "userID": 1,
      "date": "2019/06/16",
      "hoursSlept": 4.1,
      "sleepQuality": 3.8
    }]);
  });

  it("should be able to calculate a user's average hours slept per day over all time", function() {
    // expect(sleep.calculateAvgHours()).to.equal(5);
    expect(sleep.calculateSleepAvg("hoursSlept")).to.equal(5);
  });

  it("should be able to calculate a user's average sleep quality over all time", function() {
    // expect(sleep.calculateAvgQuality()).to.equal(3);
    expect(sleep.calculateSleepAvg("sleepQuality")).to.equal(3);
  });

  it("should be able to find how many hours a user slept on a specific day", function() {
    // expect(sleep.getSleepTotal(`2019/06/15`)).to.equal(6);
    expect(sleep.getSleep(`2019/06/15`, "hoursSlept")).to.equal(6);
  });

  it("should be able to find a user's quality of sleep on a specific day", function() {
    // expect(sleep.getSleepQuality(`2019/06/15`)).to.equal(2.2);
    expect(sleep.getSleep(`2019/06/15`, "sleepQuality")).to.equal(2);
  });

  it("should be able to find a user's hours slept per day and sleep quality over a week", function() {
    expect(sleep.getWeeklyDataForUser(`2019/06/16`)).to.deep.equal([{
      "userID": 1,
      "day": 6,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    },
    {
      "userID": 1,
      "day": 0,
      "date": "2019/06/16",
      "hoursSlept": 4.1,
      "sleepQuality": 3.8
    }]);
  });

  it("should be able to calculate the average hours of sleep for all users over all time", function() {
    expect(sleep.calculateAllAvgHours()).to.equal(6);
  });

  it("should be able to find all users with an average sleep quality greater than 3 for a given week", function() {
    expect(sleep.filterSleepQuality(`2019/06/16`, userRepo)).to.equal(1);
  });

  it("should be able to find the users that slept the most hours for a given date", function() {
    expect(sleep.findUsersWithMostSleep(`2019/06/15`)).to.deep.equal([2]);
  });

})
