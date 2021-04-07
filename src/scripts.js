let allUsers = new UserRepository(userData);
let currentUser = allUsers.users[getRandomIntInclusive(0, allUsers.users.length)];
let date = `2019/09/22`;
let currentHydrationData = new Hydration(currentUser.id, hydrationData);
let currentSleepData = new Sleep(currentUser.id, sleepData);
let currentActivityData = new Activity(currentUser.id, activityData);


//CHART GLOBAL DEFAULTS
Chart.defaults.global.defaultFontFamily = "Permanent Marker";
Chart.defaults.global.defaultFontSize = 10;
Chart.defaults.global.title.fontSize = 12;
Chart.defaults.global.legend = false;
Chart.defaults.global.defaultColor = "#f37981";

//QUERY SELECTOR VARIABLES
let userName = document.querySelector("#greeting");
let userSection = document.querySelector("#userInfoSection");
let waterLabel = document.querySelector("#waterLabel");
let sleepHoursLabel = document.querySelector("#sleepHoursLabel");
let sleepQualityLabel = document.querySelector("#sleepQualityLabel");
let stepsLabel = document.querySelector("#stepsLabel");
let minutesLabel = document.querySelector("#minutesLabel");
let milesLabel = document.querySelector("#milesLabel");
let avgSleepHours = document.querySelector("#avgSleepHours");
let avgSleepQuality = document.querySelector("#avgSleepQuality");

//CHART QUERY SELECTORS
let userBar = document.querySelector("#userBar").getContext('2d');
let waterBar = document.querySelector("#waterBar").getContext('2d');
let sleepBar = document.querySelector("#sleepBar").getContext('2d');
let weeklySteps = document.querySelector("#weeklySteps").getContext('2d');
let weeklyMinutes = document.querySelector("#weeklyMinutes").getContext('2d');
let weeklyStairs = document.querySelector("#weeklyStairs").getContext('2d');
let minuteComparisonBar = document.querySelector("#minuteComparisonBar").getContext('2d');
let stairsComparisonBar = document.querySelector("#stairsComparisonBar").getContext('2d');

//EVENT LISTENERS
window.addEventListener("load", displayUserData);

// CALENDAR
const dateSplitter = date => {
  let splitDate = date.split("/");
  let joinDate = splitDate.join(",");
  return joinDate;
};

const findMinDate = data => {
  let sleepDetails = data.userSleep;
  return dateSplitter(sleepDetails[0].date);
};

const picker = datepicker(calendar, {
  dateSelected: new Date(dateSplitter(date)),
  maxDate: new Date(dateSplitter(date)),
  minDate: new Date(findMinDate(currentSleepData)),
  position: "c",
  onSelect: (instance, newDate) => {
    updateDate(newDate);
    displayUserData();
  }
});

//CHARTS
const updateChart = () => {
  const activityBarData = {
    labels: ["Your Goal", "Your Steps", "Avg Goal", "Avg Steps"],
    datasets: [{
      label: "Steps",
      data: [currentUser.dailyStepGoal, currentActivityData.getActivityByDay(date, "numSteps"), calculateStepGoal(), currentActivityData.findAvgDataForAllByDay(date, "numSteps")],
      backgroundColor: [
        "#f37981",
        "#f3bf89",
        "#f37981",
        "#f3bf89"
      ]
    }]
  };
  const stepLineData = {
    labels: getWeeklyInfo("date"),
    datasets: [{
      label: "Steps",
      type: "line",
      data: getUserActivityOverWeek("numSteps"),
      borderColor: "#f3bf89"
    }]
  };
  const minLineData = {
    labels: getWeeklyInfo("date"),
    datasets: [{
      label: "Minutes",
      type: "line",
      data: getUserActivityOverWeek("minutesActive"),
      borderColor: "#f37981"
    }]
  };
  const stairLineData = {
    labels: getWeeklyInfo("date"),
    datasets: [{
      label: "Flights of Stairs",
      type: "line",
      data: getUserActivityOverWeek("flightsOfStairs"),
      borderColor: "#81f379"
    }]
  };
  const waterBarData = {
    labels: getWeeklyInfo("date"),
    datasets: [{
      label: "Ounces",
      data: getWeeklyWaterTotals(),
      backgroundColor: [
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981"
      ]
    }]
  };
  const sleepBarData = {
    labels: getWeeklyInfo("date"),
    datasets: [{
      label: "Quality",
      type: "bar",
      data: getWeeklyInfo("sleepQuality"),
      backgroundColor: [
        "#f3bf89",
        "#f3bf89",
        "#f3bf89",
        "#f3bf89",
        "#f3bf89",
        "#f3bf89",
        "#f3bf89"
      ]
    },
    {
      label: "Hours",
      data: getWeeklyInfo("hoursSlept"),
      backgroundColor: [
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981"
      ]
    }
    ]
  };
  const minCompData = {
    labels: ["Number of Minutes"],
    datasets: [{
      label: "Your Stats",
      data: [currentActivityData.getActivityByDay(date, "minutesActive")],
      backgroundColor: [
        "#f37981"
      ],
      stack: "minutes"
    },
    {
      label: "Average",
      data: [currentActivityData.findAvgDataForAllByDay(date, "minutesActive")],
      backgroundColor: [
        "#f3bf89"
      ],
      stack: "minutes"
    }
    ]
  };
  const stairCompData = {
    labels: ["Flights of Stairs"],
    datasets: [{
      label: "Your Stats",
      data: [currentActivityData.getActivityByDay(date, "flightsOfStairs")],
      backgroundColor: [
        "#f37981"
      ],
      stack: "stairs"
    },
    {
      label: "Average",
      data: [currentActivityData.findAvgDataForAllByDay(date, "flightsOfStairs")],
      backgroundColor: [
        "#f3bf89"
      ],
      stack: "stairs"
    }
    ]
  };

  userActivityBarChart.update(userActivityBarChart.data = activityBarData);
  weeklyStepsChart.update(weeklyStepsChart.data = stepLineData);
  weeklyMinutesChart.update(weeklyMinutesChart.data = minLineData);
  weeklyStairsChart.update(weeklyStairsChart.data = stairLineData);
  waterBarChart.update(waterBarChart.data = waterBarData);
  sleepBarChart.update(sleepBarChart.data = sleepBarData);
  minuteComparisonChart.update(minuteComparisonChart.data = minCompData);
  stairComparisonChart.update(stairComparisonChart.data = stairCompData);
};


// const chartDisplay = () => {
let userActivityBarChart = new Chart(userBar, {
  type: 'horizontalBar',
  data: {
    labels: ["Your Goal", "Your Steps", "Avg Goal", "Avg Steps"],
    datasets: [{
      label: "Steps",
      data: [currentUser.dailyStepGoal, currentActivityData.getActivityByDay(date, "numSteps"), calculateStepGoal(), currentActivityData.findAvgDataForAllByDay(date, "numSteps")],
      backgroundColor: [
        "#f37981",
        "#f3bf89",
        "#f37981",
        "#f3bf89"
      ]
    }]
  },
  options: {
    title: {
      display: true,
      text: "Daily Steps"
    }
  }
});

let weeklyStepsChart = new Chart(weeklySteps, {
  type: "line",
  data: {
    labels: getWeeklyInfo("date"),
    datasets: [{
      label: "Steps",
      type: "line",
      data: getUserActivityOverWeek("numSteps"),
      borderColor: "#f3bf89"
    }]
  },
  options: {
    title: {
      display: true,
      text: "Steps This Week"
    },
    barValueSpacing: 0,
    scales: {
      xAxes: [{
        ticks: {
          display: false
        }
      }]
    }
  }
});

let weeklyMinutesChart = new Chart(weeklyMinutes, {
  type: "line",
  data: {
    labels: getWeeklyInfo("date"),
    datasets: [{
      label: "Minutes",
      type: "line",
      data: getUserActivityOverWeek("minutesActive"),
      borderColor: "#f37981"
    }]
  },
  options: {
    title: {
      display: true,
      text: "Minutes This Week"
    },
    barValueSpacing: 0,
    scales: {
      xAxes: [{
        ticks: {
          display: false
        }
      }]
    }
  }
});

let weeklyStairsChart = new Chart(weeklyStairs, {
  type: "line",
  data: {
    labels: getWeeklyInfo("date"),
    datasets: [{
      label: "Flights of Stairs",
      type: "line",
      data: getUserActivityOverWeek("flightsOfStairs"),
      borderColor: "#81f379"
    }]
  },
  options: {
    title: {
      display: true,
      text: "Stairs This Week"
    },
    barValueSpacing: 0,
    scales: {
      xAxes: [{
        ticks: {
          display: false
        }
      }]
    }
  }
});

let waterBarChart = new Chart(waterBar, {
  type: 'bar',
  data: {
    labels: getWeeklyInfo("date"),
    datasets: [{
      label: "Ounces",
      data: getWeeklyWaterTotals(),
      backgroundColor: [
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981"
      ]
    }]
  },
  options: {
    title: {
      display: true,
      text: "Water This Week"
    },
    scales: {
      xAxes: [{
        ticks: {
          display: false
        }
      }]
    }
  }
});

let sleepBarChart = new Chart(sleepBar, {
  type: 'bar',
  data: {
    labels: getWeeklyInfo("date"),
    datasets: [{
      label: "Quality",
      type: "bar",
      data: getWeeklyInfo("sleepQuality"),
      backgroundColor: [
        "#f3bf89",
        "#f3bf89",
        "#f3bf89",
        "#f3bf89",
        "#f3bf89",
        "#f3bf89",
        "#f3bf89"
      ]
    },
    {
      label: "Hours",
      data: getWeeklyInfo("hoursSlept"),
      backgroundColor: [
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981",
        "#f37981"
      ]
    }
    ]
  },
  options: {
    title: {
      display: true,
      text: "Sleep This Week"
    },
    barValueSpacing: 0,
    scales: {
      xAxes: [{
        ticks: {
          display: false
        }
      }]
    }
  }
});

let minuteComparisonChart = new Chart(minuteComparisonBar, {
  type: 'bar',
  data: {
    labels: ["Number of Minutes"],
    datasets: [{
      label: "Your Stats",
      data: [currentActivityData.getActivityByDay(date, "minutesActive")],
      backgroundColor: [
        "#f37981"
      ],
      stack: "minutes"
    },
    {
      label: "Average",
      data: [currentActivityData.findAvgDataForAllByDay(date, "minutesActive")],
      backgroundColor: [
        "#f3bf89"
      ],
      stack: "minutes"
    }
    ]
  },
  options: {
    title: {
      display: true,
      text: "Time Active"
    },
    scales: {
      x: {
        stacked: true
      },
      xAxes: [{
        ticks: {
          display: false
        }
      }],
      y: {
        stacked: true
      }
    }
  }
});

let stairComparisonChart = new Chart(stairsComparisonBar, {
  type: 'bar',
  data: {
    labels: ["Flights of Stairs"],
    datasets: [{
      label: "Your Stats",
      data: [currentActivityData.getActivityByDay(date, "flightsOfStairs")],
      backgroundColor: [
        "#f37981"
      ],
      stack: "stairs"
    },
    {
      label: "Average",
      data: [currentActivityData.findAvgDataForAllByDay(date, "flightsOfStairs")],
      backgroundColor: [
        "#f3bf89"
      ],
      stack: "stairs"
    }
    ]
  },
  options: {
    title: {
      display: true,
      text: "Stairs Climbed"
    },
    scales: {
      x: {
        stacked: true
      },
      xAxes: [{
        ticks: {
          display: false
        }
      }],
      y: {
        stacked: true
      }
    }
  }
});
// };

//FUNCTIONS
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const switchUser = (userID) => {
  currentUser = allUsers.users.find(user => user.id === userID);
}

const updateDate = (newDate) => {
  date = dayjs(newDate).format("YYYY/MM/DD");
}

function displayUserData() {
  displayDate();
  greetUser();
  displayIDCard();
  updateDailyBadges();
  calculateStepGoal();
  displayAvgSleepHoursAllTime();
  displayAvgSleepQualityAllTime();
  getStepStreak()
  updateChart();
}

function updateDailyBadges() {
  showDailyWaterTotal();
  showDailySleepData();
  displayMilesToday();
  displayActivityToday(minutesLabel, "minutesActive", "min");
  displayActivityToday(stepsLabel, "numSteps", "steps");
}

function displayDate() {
  dateDisplay.innerText = date;
}

function greetUser(userID = 1) {
  userName.innerText = `Hey, ${currentUser.name.split(" ")[0]}`;
}

function displayIDCard(userID = 1) {
  userSection.innerHTML =
  `<div class="left-side">
    <!-- <img class="icon" "arrow" src="../assets/arrow.png"> -->
    <p class="user-info">ID: ${currentUser.id} </p>
    <p class="user-info">Name: ${currentUser.name}</p>
    <p class="user-info">Address: ${currentUser.address}</p>
  </div>
  <div class="right-side">
    <p class="user-info">Email: ${currentUser.email}</p>
    <p class="user-info">Stride Length: ${currentUser.strideLength}</p>
    <p class="user-info">Daily Step Goal: ${currentUser.dailyStepGoal}</p>
    <p class="user-info">Friends: ${currentUser.friends.length}</p>
  </div>`
}

function calculateStepGoal() {
  return allUsers.users.reduce((acc, user) => acc + user.dailyStepGoal, 0) /
    allUsers.users.length;
}

function showDailyWaterTotal() {
  let waterTotal = currentHydrationData.getOzOnDay(date);
  waterLabel.innerHTML = `${waterTotal} Oz.`
}

function getWeeklyWaterTotals() {
  let weeklyTotals = currentHydrationData.getDailyOverWeek(date);
  return weeklyTotals.map(day => day.numOunces);
}

function showDailySleepData() {
  sleepHoursLabel.innerHTML = `${currentSleepData.getSleepTotal(date)} Hours`;
  sleepQualityLabel.innerHTML = `${currentSleepData.getSleepQuality(date)} Stars`;
}

function displayMilesToday() {
  milesLabel.innerHTML = `${currentActivityData.getMilesByDay(date, currentUser.strideLength)} Miles`;
}

function displayActivityToday(selector, metric, label ) {
  const activityData = currentActivityData.getActivityByDay(date, metric);
  selector.innerHTML = `${activityData} ${label}`;
}

function getWeeklyInfo(metric) {
  let weeklyTotals = currentSleepData.getWeeklyDataForUser(date);
  return weeklyTotals.map(day => day[metric]);
}

function getUserActivityOverWeek(metric) {
  let weeklyStats = currentActivityData.getWeeklyDataForUser(date);
  return weeklyStats.map(day => day[metric]);
}

function displayAvgSleepHoursAllTime() {
  avgSleepHours.innerHTML = currentSleepData.calculateAvgHours();
}

function displayAvgSleepQualityAllTime() {
  avgSleepQuality.innerHTML = Math.round
  (currentSleepData.calculateAvgQuality());
}

function getStepStreak() {
  let streaks = currentActivityData.findStepStreak()
  // "Step it up"
  /* something.innerText = */ console.log(`You have ${streaks.length} three day streaks to date!`)
  /* somethingElse.innerText = */ console.log(`Most recent streak to date: ${streaks[0]}`)
}
