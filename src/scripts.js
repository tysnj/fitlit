
// var userID = 1;

//QUERY SELECTOR VARIABLES
let userName = document.querySelector("#greeting");

//EVENT LISTENERS
window.addEventListener("load", displayUserData);

function displayUserData() {
  greetUser();
}

function greetUser(userID = 1) {
  let allUsers = new UserRepository(userTestData);
  let currentUser = allUsers.users.find(user => user.id === userID);
  userName.innerText = `Hey, ${currentUser.name}`;
}
//on page load:
//date is automatically selected to most recent date in data
//user class is instantiated
//user repo is instantiated 
//