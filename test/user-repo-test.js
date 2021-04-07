const chai = require("chai");
const expect = chai.expect;

const dataFile = require("../data/user-test-data");
const users = dataFile.userTestData;
const UserRepository = require("../src/user-repo");
const User = require("../src/users");

describe("UserRepository", function() {
  let userRepo;

  beforeEach(function() {
    userRepo = new UserRepository(users)
  });

  it("should be a function", function() {
    expect(UserRepository).to.be.a("function");
  });

  it("should be an instance of UserRepository", function() {
    expect(userRepo).to.be.an.instanceOf(UserRepository);
  });

  it("should hold an array as a property", function() {
    expect(userRepo.users).to.be.an("array");
  });

  it("should contain Users", function() {
    expect(userRepo.users[0]).to.be.an.instanceOf(User);
  });

  it("should be able to retrieve a user's details using their ID", function() {
    expect(userRepo.getUserInfo(1)).to.deep.equal({
      "id": 1,
      "name": "John Doe",
      "address": "15195 Nakia Tunnel, Spokane WA 19508-5687",
      "email": "mojo_jojo@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [
        16,
        4,
        8
      ]
    });
  });

  it("should be able to calculate the average step goal among users", function() {
    expect(userRepo.calculateAvgStepGoal()).to.equal(7500);
  });
})
