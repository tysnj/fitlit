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

  beforeEach(function() {
    userRepo = new UserRepository(users);
    sleep = new Sleep(userRepo.users[0].id)
  });

  it("should be a function", function() {
    expect(Sleep).to.be.a("function");
  })
  
})