// const Hydration = require("./hydration");

// const { weekdays } = require("dayjs/locale/*");

let allUsers = new UserRepository(userData); 
let currentUser = allUsers.users[0]; 
let date = `2019/09/22`;
let currentHydrationData = new Hydration(currentUser.id, hydrationData );

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

//CHART QUERY SELECTORS
let userBar = document.querySelector("#userBar").getContext('2d');
let waterBar = document.querySelector("#waterBar").getContext('2d');

//CHARTS
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
    labels: [1,2,3,4,5,6,7],
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

//EVENT LISTENERS
window.addEventListener("load", displayUserData);

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
  calculateStepGoal();
  showDailyWaterTotal();
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
  console.log(weeklyTotals);
  return weeklyTotals.map(day => day.numOunces); 
 }


 
