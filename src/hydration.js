
// const UserRepository = require("../src/user-repo");
// const User = require("../src/users");
// var dayjs = require('dayjs');
// dayjs().format();

class Hydration {
  constructor(userID, data) {
    this.userHydration = data.filter(userEntry => userEntry.userID === userID);
  };

  getDailyAvgAllTime() {
    return this.userHydration.reduce((hydrationTotal, day) =>
    hydrationTotal + day.numOunces, 0)/ this.userHydration.length;
  };

  getOzOnDay(date = this.userHydration[0].date) {
    const entry = this.userHydration.find(userEntry => userEntry.date === date);
    return entry.numOunces;
  };

  getDailyOverWeek(date = this.userHydration[0].date) {
    const selectedDay = dayjs(date, "YYYY/MM/DD");
    let weekStart = selectedDay.subtract(6, "day").format("YYYY/MM/DD");
    return this.userHydration.reduce((weeklyStats, record) => {
      if (record.date <= date && record.date >= weekStart) {
        weeklyStats.push({...record, ["day"]: dayjs(record.date, "YYYY/MM/DD").day()});
      }
      return weeklyStats;
    }, []);
  };

}

if (typeof module !== "undefined") {
  module.exports = Hydration;
};
