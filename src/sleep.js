const UserRepository = require("../src/user-repo");
const User = require("../src/users");
var dayjs = require('dayjs');
dayjs().format();

class Sleep {
  constructor(userID, dataFile) {
    this.allUserSleep = dataFile;
    this.userSleep = dataFile.filter(datapoint => datapoint.userID === userID); 
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

  getWeekByDay(date) {
    const selectedDay = dayjs(date, "YYYY/MM/DD");
    const week = [];
    for (let i = 7; i >= 0; i--) {
    week.push(selectedDay.subtract(i, 'day').format("YYYY/MM/DD"));
    }
    return week;
  }

  calculateWeeklyAvgHours(date) {
    const week = this.getWeekByDay(date);
    const weeklyData = [];
    this.userSleep.filter(datapoint => {
      week.forEach(day => {
        if (day === datapoint.date) {
          weeklyData.push(datapoint);
        }
      })
    }) 
  return Math.round(weeklyData.reduce((acc, datapoint) => acc + datapoint.hoursSlept, 0) / weeklyData.length);
}

}

if (typeof module !== "undefined") {
  module.exports = Sleep;
};