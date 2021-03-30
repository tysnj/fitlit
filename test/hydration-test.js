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
    user = new User(users[0]);
    hydration = new Hydration(user.id);
  });
