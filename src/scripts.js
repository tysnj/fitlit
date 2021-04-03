

let allUsers = new UserRepository(userData);
let currentUser = allUsers.users[0];
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

//CHARTS
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
    labels: getWeeklyDateInfo(date),
    datasets: [{
      label: "Steps",
      type: "line",
      data: getUserStepsOverWeek(),
      borderColor: "#f3bf89"
    }
    ]},
    options: {
      title: {
        display: true,
        text: "Steps This Week"
      },
      // legend: {
      //   display: true,
      //   position: "bottom",
      //   align: "center",
      //   title: {
      //     text: "Test",
      //     color: "rgb(255, 99, 132)"
      //
      //   },
      //   labels: {
      //   }
      // },
      barValueSpacing:0,
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
    labels: getWeeklyDateInfo(date),
    datasets: [
    {
      label: "Minutes",
      type: "line",
      data: getUserMinutesOverWeek(),
      borderColor: "#f37981"
    }
    ]},
    options: {
      title: {
        display: true,
        text: "Minutes This Week"
      },
        // legend: {
        //   display: true,
        //   position: "bottom",
        //   align: "center",
        //   title: {
        //     text: "Test",
        //     color: "rgb(255, 99, 132)"
        //
        //   },
        //   labels: {
        //   }
        // },
       barValueSpacing:0,
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
    labels: getWeeklyDateInfo(date),
    datasets: [
    {
      label: "Flights of Stairs",
      type: "line",
      data: getUserStairsOverWeek(),
      borderColor: "#81f379"
    }]},
    options: {
      title: {
        display: true,
        text: "Stairs This Week"
          },
          // legend: {
          //   display: true,
          //   position: "bottom",
          //   align: "center",
          //   title: {
          //     text: "Test",
          //     color: "rgb(255, 99, 132)"
          //
          //   },
          //   labels: {
          //   }
          // },
      barValueSpacing:0,
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
    labels: getWeeklyDateInfo(date),
    datasets: [{
      label: "Ounces",
      data: getWeeklyWaterTotals(date),
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
    labels: getWeeklyDateInfo(date),
    datasets: [{
      label: "Quality",
      type: "bar",
      data: getWeeklySleepQual(date),
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
      data: getWeeklySleepHours(date),
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
      text: "Sleep This Week"
    },
    barValueSpacing:0,
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
    labels: ["Your Minutes of Activity", "Average Minutes for All Users"],
    datasets: [{
      label: "Minutes",
      data: [currentActivityData.getActivityByDay(date, "minutesActive")],
      backgroundColor: [
        "#f37981"
      ],
      stack: "minutes"
    },
    {
      label: "Avg Minutes",
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
      text: "Today's Minutes of Activity vs. Average"
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
    labels: ["Your Flights of Stairs", "Average Flights for All Users"],
    datasets: [{
      label: "Stairs",
      data: [currentActivityData.getActivityByDay(date, "flightsOfStairs")],
      backgroundColor: [
        "#f37981"
      ],
      stack: "stairs"
    },
    {
      label: "Avg Stairs",
      data: [currentActivityData.findAvgDataForAllByDay(date, "flightsOfStairs")],
      backgroundColor: [
        "#f3bf89"
      ],
      stack: "stairs"
    }]
  },
  options: {
    title: {
      display: true,
      text: "Today's Stairs vs. Average"
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

//FUNCTIONS

function switchUser(userID) {
    currentUser = allUsers.users.find(user => user.id === userID);
}

// function updateDate() {
//   date = NEW DATE INPUT
// }

function displayUserData() {
  greetUser();
  displayIDCard();
  updateDailyBadges();
  calculateStepGoal();
  displayAvgSleepHoursAllTime();
  displayAvgSleepQualityAllTime();
}

function updateDailyBadges() {
  showDailyWaterTotal();
  showDailySleepData();
  displayStepsToday(date);
  displayMilesToday();
  displayMinutesToday();
}

function greetUser(userID = 1) {
  userName.innerText = `Hey, ${currentUser.name.split(" ")[0]}`;
}

function displayIDCard(userID = 1) {
  userSection.innerHTML =
  `<div class="left-side">
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
  return allUsers.users.reduce((acc, user) => acc + user.dailyStepGoal,0) / allUsers.users.length;
}

function showDailyWaterTotal() {
  let waterTotal = currentHydrationData.getOzOnDay(date);
  waterLabel.innerHTML = `${waterTotal} Oz.`
}

function getWeeklyWaterTotals(date) {
  let weeklyTotals = currentHydrationData.getDailyOverWeek(date);
  return weeklyTotals.map(day => day.numOunces);
 }

 function showDailySleepData() {
   let hoursSlept = currentSleepData.getSleepTotal(date);
   let sleepQual = currentSleepData.getSleepQuality(date);
   sleepHoursLabel.innerHTML = `${currentSleepData.getSleepTotal(date)} Hours`;
   sleepQualityLabel.innerHTML = `${currentSleepData.getSleepQuality(date)} Stars`;
 }

 function displayMilesToday() {
   milesLabel.innerHTML = `${currentActivityData.getMilesByDay(date, currentUser.strideLength)} Miles`;
 }

 function displayMinutesToday() {
   minutesLabel.innerHTML = `${currentActivityData.getActivityByDay(date, "minutesActive")} Min`;
 }

 function getWeeklySleepHours(date) {
   let weeklyTotals = currentSleepData.getWeeklyDataForUser(date);
   return weeklyTotals.map(day => day.hoursSlept);
  }

  function getWeeklySleepQual(date) {
    let weeklyTotals = currentSleepData.getWeeklyDataForUser(date);
    return weeklyTotals.map(day => day.sleepQuality);
   }

   function getWeeklyDateInfo(date) {
     let weeklyTotals = currentSleepData.getWeeklyDataForUser(date);
     return weeklyTotals.map(day => day.date);
    }

  // function getDailySteps() {
  //   return (currentActivityData.userActivity.find(day => day.date === date).numSteps);
  // }

  function displayStepsToday(date) {
    stepsLabel.innerHTML = `${currentActivityData.getActivityByDay(date, "numSteps")} Steps`;
  }

  function getUserStepsOverWeek() {
    let weeklyStats = currentActivityData.getWeeklyDataForUser(date);
    return weeklyStats.map(day => day.numSteps);
  }

  function getUserMinutesOverWeek() {
    let weeklyStats = currentActivityData.getWeeklyDataForUser(date);
    return weeklyStats.map(day => day.minutesActive);
  }

  function getUserStairsOverWeek() {
    let weeklyStats = currentActivityData.getWeeklyDataForUser(date);
    return weeklyStats.map(day => day.flightsOfStairs);
  }

  function displayAvgSleepHoursAllTime() {
    avgSleepHours.innerHTML = currentSleepData.calculateAvgHours();
  }

  function displayAvgSleepQualityAllTime() {
    avgSleepQuality.innerHTML = Math.round(currentSleepData.calculateAvgQuality());
  }
