var dayjs = require('dayjs');
dayjs().format();

class Activity {
  constructor(userID, data) {
    this.userActivity = data.filter(userEntry => userEntry.userID === userID);
  };

  getMilesByDay(date, strideLength) {
    const entry = this.userActivity.find(userEntry => userEntry.date === date);
    return Math.round((entry.numSteps * strideLength) / 5280 * 100)/100;
  };

  getTimeActiveByDay(date) {
    const entry = this.userActivity.find(userEntry => userEntry.date === date);
    return entry.minutesActive;
  };

  getWeeklyDataForUser(date) {
    const selectedDay = dayjs(date, "YYYY/MM/DD");
    let weekStart = selectedDay.subtract(6, "day").format("YYYY/MM/DD");
    return this.userActivity.reduce((weeklyStats, datapoint) => {
      if (datapoint.date <= date && datapoint.date >= weekStart) {
        weeklyStats.push({...datapoint, ["day"]: dayjs(datapoint.date, "YYYY/MM/DD").day()});
      }
      return weeklyStats;
    }, []);
  };

  getTimeActiveAvgByWeek(date) {
    const weeklyStats = this.getWeeklyDataForUser(date);
    return Math.round((weeklyStats.reduce((acc, datapoint) => acc + datapoint.minutesActive, 0)) / weeklyStats.length);
  };

  checkStepGoalAchieved(date, dailyStepGoal) {
    const entry = this.userActivity.find(userEntry => userEntry.date === date);
    return (entry.numSteps >= dailyStepGoal);
  }

  getDaysGoalAchieved(dailyStepGoal) {
    return this.userActivity.reduce((stats, record) => {
      if (record.numSteps >= dailyStepGoal) {
        stats.push({
          ...record,
          ["day"]: dayjs(record.date, "YYYY/MM/DD").day()
        });
      }
      return stats;
    }, []);
  };

  getStairClimbingRecord() {
    // for each entry in userActivity
    // find the greatest flightsOfStairs num
    this.userActivity.sort((a, b) => b.flightsOfStairs)
  }
}

if (typeof module !== "undefined") {
  module.exports = Activity;
};
