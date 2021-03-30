const UserRepository = require("../src/user-repo");
const User = require("../src/users");

class Sleep {
  constructor(userID, dataFile) {
    this.allUserSleep = dataFile;
    this.userSleep = dataFile.filter(datapoint => datapoint.userID === userID) 
  }
}

if (typeof module !== "undefined") {
  module.exports = Sleep;
};