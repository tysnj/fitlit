
const UserRepository = require("../src/user-repo");
const User = require("../src/users");
var dayjs = require('dayjs');
dayjs().format();

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

  dailyOverWeek(date = this.userHydration[this.userHydration.length - 1].date) {
    const selectedDay = dayjs(date, "YYYY/MM/DD");
    let weekStart = selectedDay.subtract(7, "day").format("YYYY/MM/DD");
    return this.userHydration.reduce((acc, record) => {
      if (record.date <= date && record.date >= weekStart) {
        acc.push(record.numOunces);
      }
      return acc;
    }, []);
  }
}

if (typeof module !== "undefined") {
  module.exports = Hydration;
};
