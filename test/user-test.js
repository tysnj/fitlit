const chai = require("chai");
const expect = chai.expect;

const dataFile = require("../data/user-test-data");
const users = dataFile.userTestData;

const User = require("../src/users");


describe ("User", function() {
  let user;

  beforeEach(function() {
    user = new User(users[0]);
  });

  it("should be a function", function() {
    expect(User).to.be.a("function");
  });

  it("should be an instance of User", function() {
    expect(user).to.be.an.instanceOf(User);
  });

  it("should have an ID", function() {
    expect(user.id).to.equal(1);
  });

  it("should have a name", function() {
    expect(user.name).to.equal("John Doe");
  });

  it("should have an address", function() {
    expect(user.address).to.equal("15195 Nakia Tunnel, Spokane WA 19508-5687");
  });

  it("should have an email", function() {
    expect(user.email).to.equal("mojo_jojo@hotmail.com");
  });

  it("should have a stride length", function() {
    expect(user.strideLength).to.equal(4.3);
  });

  it("should have a daily step goal", function() {
    expect(user.dailyStepGoal).to.equal(10000);
  });

  it("should have friends", function() {
    expect(user.friends).to.be.an("array");
    expect(user.friends[0]).to.equal(16);
  });

  it("should get the user\'s first name", function() {
    expect(user.getUserName()).to.equal("John");
  });
})
