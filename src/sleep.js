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

  getWeeklyDataForUser(date = this.userSleep[0].date) {
    const selectedDay = dayjs(date, "YYYY/MM/DD");
    let weekStart = selectedDay.subtract(6, "day").format("YYYY/MM/DD");
    return this.userSleep.reduce((weeklyStats, datapoint) => {
      if (datapoint.date <= date && datapoint.date >= weekStart) {
        weeklyStats.push({...datapoint, ["day"]: dayjs(datapoint.date, "YYYY/MM/DD").day()});
      }
      return weeklyStats;
    }, []);
  }

  getWeeklyDataForAll(date = this.userSleep[0].date) {
    const selectedDay = dayjs(date, "YYYY/MM/DD");
    let weekStart = selectedDay.subtract(6, "day").format("YYYY/MM/DD");
    return this.allUserSleep.reduce((weeklyStats, datapoint) => {
      if (datapoint.date <= date && datapoint.date >= weekStart) {
        weeklyStats.push({...datapoint, ["day"]: dayjs(datapoint.date, "YYYY/MM/DD").day()});
      }
      return weeklyStats;
    }, []);
  }


  calculateAllAvgHours() {
    return Math.round((this.allUserSleep.reduce((acc, datapoint) => acc + datapoint.hoursSlept, 0)) / this.allUserSleep.length);
}

  filterSleepQuality(date, userRepo) { 
    const weeklyData = this.getWeeklyDataForAll(date);
    const highQualityUsers = [];
    userRepo.users.forEach(user => {
      const userWeek = weeklyData.filter(day => user.id === day.userID);
      const userTotal = userWeek.reduce((acc, userDay) => acc + userDay.sleepQuality,0);
      if ((userTotal / userWeek.length) > 3) {
        highQualityUsers.push(user.id);
      }
    })
    return highQualityUsers.length;
  }
//filter all users file
// return the object(s) with the highest value for datapoint.hoursSlept
// add users of those objects to array

  findUsersWithMostSleep(date = this.userSleep[0].date) {
   const usersWithMostHoursSleep = [];
   const dayData = this.allUserSleep.filter(datapoint => datapoint.date === date);
   dayData.forEach()

 }}

if (typeof module !== "undefined") {
  module.exports = Sleep;
};