let allUsers = new UserRepository(userData); 

//QUERY SELECTOR VARIABLES
let userName = document.querySelector("#greeting");
let userSection = document.querySelector("#userInfoSection");
let stepGoal = document.querySelector("#stepGoal");
var ctx = document.getElementById('#userBar').getContext('2d');

//CHART VARS
var myBarChart = new Chart(ctx, {
  type: 'horizontalBar',
  data: data,
  options: options
});

//EVENT LISTENERS
window.addEventListener("load", displayUserData);

function getUserInfo(userID = 1) {
  return allUsers.users.find(user => user.id === userID);
}
function displayUserData() {
  greetUser();
  displayIDCard();
  calculateStepGoal();
}

function greetUser(userID = 1) {
  let currentUser = getUserInfo();
  userName.innerText = `Hey, ${currentUser.name.split(" ")[0]}`;
}

function displayIDCard(userID = 1) {
  let currentUser = getUserInfo();
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
  let currentUser = getUserInfo();
  let avgStepGoal = (allUsers.users.reduce((acc, user) => acc + user.dailyStepGoal)) / allUsers.users.length;
}



