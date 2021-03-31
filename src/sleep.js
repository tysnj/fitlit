const UserRepository = require("../src/user-repo");
const User = require("../src/users");
var dayjs = require('dayjs');
dayjs().format();

class Sleep {
  constructor(userID, dataFile) {
    this.allUserSleep = dataFile.reverse();
    this.userSleep = this.allUserSleep.filter(datapoint => datapoint.userID === userID); 
  }

  calculateAvgHours() {
    return Math.round((this.userSleep.reduce((acc, datapoint) => acc + datapoint.hoursSlept, 0)) / this.userSleep.length);
  }

  calculateAvgQuality() {
    return (this.userSleep.reduce((acc, datapoint) => acc + datapoint.sleepQuality, 0)) / this.userSleep.length;
  }

  getSleepTotal(date) {
    const selectedDay = this.userSleep.find(datapoint => datapoint.date === date);
    return Math.round(selectedDay.hoursSlept);
  }

  getSleepQuality(date) {
    const selectedDay = this.userSleep.find(datapoint => datapoint.date === date);
    return selectedDay.sleepQuality;
  }

  getWeeklyData(date = this.userSleep[0].date) {
    const selectedDay = dayjs(date, "YYYY/MM/DD");
    let weekStart = selectedDay.subtract(6, "day").format("YYYY/MM/DD");
    return this.userSleep.reduce((weeklyStats, datapoint) => {
      if (datapoint.date <= date && datapoint.date >= weekStart) {
        weeklyStats.push({...datapoint, ["day"]: dayjs(datapoint.date, "YYYY/MM/DD").day()});
      }
      return weeklyStats;
    }, []);
  }

}
if (typeof module !== "undefined") {
  module.exports = Sleep;
};