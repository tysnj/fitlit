
let allUsers = new UserRepository(userData); 
let currentUser = allUsers.users[0]; 
let date = `2019/09/22`;

//QUERY SELECTOR VARIABLES
let userName = document.querySelector("#greeting");
let userSection = document.querySelector("#userInfoSection");
let userBar = document.querySelector("#userBar").getContext('2d');
// var ctx = document.getElementById('#userBar').getContext('2d');

//CHART VARS
let userActivityBarChart = new Chart(userBar, {
  type: 'horizontalBar',
  data: {
    labels: ["Steps"],
    datasets: [{
      label: 'Steps',
      data: [currentUser.dailyStepGoal]
    }]
  },
  options: {}
});

//EVENT LISTENERS
window.addEventListener("load", displayUserData);

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

function calculateStepGoal(userID = 1) {
  let avgStepGoal = (allUsers.users.reduce((acc, user) => acc + user.dailyStepGoal)) / allUsers.users.length;
}



