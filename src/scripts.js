

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
let sleepLabel = document.querySelector("#sleepLabel");
let stepsLabel = document.querySelector("#stepsLabel");
let calendar = document.querySelector("#calendar");
// let datePicker = document.querySelector("#datePicker");
let dateDisplay = document.querySelector("#dateDisplay");

//CHART QUERY SELECTORS
let userBar = document.querySelector("#userBar").getContext('2d');
let waterBar = document.querySelector("#waterBar").getContext('2d');
let sleepBar = document.querySelector("#sleepBar").getContext('2d');
let weeklyActivity = document.querySelector("#weeklyActivity").getContext('2d');
let activityBar1 = document.querySelector("#activityBar1").getContext('2d');
let activityBar2 = document.querySelector("#activityBar2").getContext('2d');
let activityBar3 = document.querySelector("#activityBar3").getContext('2d');

// CALENDAR
const dateSplitter = date => {
  let splitDate = date.split("/");
  let joinDate = splitDate.join(",");
  return joinDate;
};

const findMinDate = data => {
  let reReversedData = data.userSleep.reverse();
  return dateSplitter(reReversedData[0].date)
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
let weeklyActivityChart = new Chart(weeklyActivity, {
  type: "line",
  data: {
    labels: getWeeklyDateInfo(date),
    datasets: [{
      label: "Steps",
      type: "line",
      data: getUserStepsOverWeek(),
      borderColor: "#f3bf89"
    },
    {
      label: "Minutes",
      data: getUserMinutesOverWeek(),
      borderColor: "#f37981"
    },
    {
      label: "Flights of Stairs",
      data: getUserStairsOverWeek(),
      borderColor: "#81f379"
    }]},
    options: {
      title: {
        display: true,
        text: "Activity This Week"
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
            display: false //this will remove only the label
          }
        }]
      }
    }

  });

let userActivityBarChart = new Chart(userBar, {
  type: 'horizontalBar',
  data: {
    labels: ["Your Goal", "Your Steps", "Avg Goal", "Avg Steps"],
    datasets: [{
      label: "Steps",
      data: [currentUser.dailyStepGoal, 7000, calculateStepGoal(), 5500],
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
                  display: false //this will remove only the label
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
                  display: false //this will remove only the label
              }
          }]
      }
  }
});

// let activityBarChart = new Chart(activityBar, {
//   type: 'bar',
//   data: {
//     labels: date,
//     datasets: [{
//       label: "Number of Steps",
//       type: "bar",
//       data: [console.log(currentActivityData.findAvgDataForAllByDay(date, "numSteps"))],
//       backgroundColor: [
//         "#f3bf89"
//       ]
//     },
//     {
//       label: "Minutes Active",
//       data: [console.log(currentActivityData.findAvgDataForAllByDay(date, "minutesActive"))],
//       backgroundColor: [
//         "#f37981"
//       ]
//     },
//     {
//       label: "Flights of Stairs Climbed",
//       data: [console.log(currentActivityData.findAvgDataForAllByDay(date, "flightsOfStairs"))],
//       backgroundColor: [
//         "#81f379"
//       ]
//     }]
//   },
//   options: {
//     title: {
//       display: true,
//       text: "Everyone Today"
//     },
//     barValueSpacing:0,
//     scales: {
//           xAxes: [{
//               ticks: {
//                   display: false //this will remove only the label
//               }
//           }]
//       }
//   }
// });


//EVENT LISTENERS
window.addEventListener("load", displayUserData);

//FUNCTIONS

function switchUser(userID) {
    currentUser = allUsers.users.find(user => user.id === userID);
}

function updateDate(newDate) {
  date = dayjs(newDate).format("YYYY/MM/DD");
}

function displayUserData() {
  displayDate();
  greetUser();
  displayIDCard();
  calculateStepGoal();
  showDailyWaterTotal();
  showDailySleepData();
  displayStepsToday(date);
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
  waterLabel.innerHTML = `${waterTotal} oz.`
}

function getWeeklyWaterTotals(date) {
  let weeklyTotals = currentHydrationData.getDailyOverWeek(date);
  return weeklyTotals.map(day => day.numOunces);
 }

 function showDailySleepData() {
   let hoursSlept = currentSleepData.getSleepTotal(date);
   let sleepQual = currentSleepData.getSleepQuality(date);
   sleepLabel.innerHTML = `${hoursSlept} hours<br>${sleepQual}/5 stars`
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

  function displayStepsToday(date) {
      let dailySteps = currentActivityData.userActivity.find(day => day.date === date);
      stepsLabel.innerHTML = `${dailySteps.numSteps} Steps`;
  }

  function getUserStepsOverWeek() {
    let weeklyStats = currentActivityData.getWeeklyDataForUser(date);
    return weeklyStats.map(day => day.numSteps/100);
  }

  function getUserMinutesOverWeek() {
    let weeklyStats = currentActivityData.getWeeklyDataForUser(date);
    return weeklyStats.map(day => day.minutesActive);
  }

  function getUserStairsOverWeek() {
    let weeklyStats = currentActivityData.getWeeklyDataForUser(date);
    return weeklyStats.map(day => day.flightsOfStairs);
  }
