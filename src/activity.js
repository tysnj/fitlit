var dayjs = require('dayjs');
dayjs().format();

class Activity {
  constructor(userID, data) {
    this.userActivity = data.filter(userEntry => userEntry.userID === userID);
  };

  getMilesByDay(date = this.userActivity[0].date, strideLength) {
    const entry = this.userActivity.find(userEntry => userEntry.date === date);
    return Math.round((entry.numSteps * strideLength) / 5280 * 100)/100;
  };

  getTimeActiveByDay(date = this.userActivity[0].date) {
    const entry = this.userActivity.find(userEntry => userEntry.date === date);
    return entry.minutesActive;
  };

  getWeeklyDataForUser(date = this.userActivity[0].date) {
    const selectedDay = dayjs(date, "YYYY/MM/DD");
    let weekStart = selectedDay.subtract(6, "day").format("YYYY/MM/DD");
    return this.userActivity.reduce((weeklyStats, datapoint) => {
      if (datapoint.date <= date && datapoint.date >= weekStart) {
        weeklyStats.push({...datapoint, ["day"]: dayjs(datapoint.date, "YYYY/MM/DD").day()});
      }
      return weeklyStats;
    }, []);
  }

  getTimeActiveAvgByWeek(date = this.userActivity[0].date) {
    const weeklyStats = this.getWeeklyDataForUser(date);
    return Math.round((weeklyStats.reduce((acc, datapoint) => acc + datapoint.minutesActive, 0)) / weeklyStats.length);
  };
}

if (typeof module !== "undefined") {
  module.exports = Activity;
};
