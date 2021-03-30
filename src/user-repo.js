const User = require("./users");

class UserRepository {
    constructor(users) {
    this.users = users.map(user => new User(user));
    }

    getUserInfo(userID) {
        return this.users.find(user => user.id === userID);
    }

    calculateAvgStepGoal() {
        return (this.users.reduce((acc, user) => acc + user.dailyStepGoal, 0))/ this.users.length;      
    }
}



if (typeof module !== "undefined") {
    module.exports = UserRepository;
};