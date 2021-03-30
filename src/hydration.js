// const testDataFile = require("../data/hydration-test-data");
// const testHydrationData = dataFile.hydrationTestData;

class Hydration {
  constructor(userID, data) {
    this.userHydration = data.filter(userEntry => userEntry.userID === userID);
  };

  dailyAvgAllTime() {
    return this.userHydration.reduce((hydrationTotal, day) =>
    hydrationTotal + day.numOunces, 0)/ this.userHydration.length;
  };

  ouncesOnDay(date = this.userHydration[this.userHydration.length - 1].date) {
    const entry = this.userHydration.find(userEntry => userEntry.date === date);
    return entry.numOunces;
  };
}

if (typeof module !== "undefined") {
  module.exports = Hydration;
};
