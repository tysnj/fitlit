const chai = require("chai");
const expect = chai.expect;

const dataFile = require("../data/sleep-test-data");
const sleepData = dataFile.sleepTestData;
const userDataFile = require("../data/user-test-data");
const users = userDataFile.userTestData;
const Sleep = require("../src/sleep");
const UserRepository = require("../src/user-repo");
const User = require("../src/users");

describe("Sleep", function() {
  let userRepo;

  // beforeEach(function() {
  //   userRepo = new UserRepository(users);
  //   sleep = new Sleep(userRepo.users[0].id)
  // });

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
    }])
  });





})