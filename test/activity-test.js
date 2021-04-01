const chai = require("chai");
const expect = chai.expect;

const userDataFile = require("../data/user-test-data");
const users = userDataFile.userTestData;
const UserRepository = require("../src/user-repo");
const User = require("../src/users")

const dataFile = require("../data/activity-test-data");
const activityData = dataFile.activityTestData.reverse();
const Activity = require("../src/activity");
