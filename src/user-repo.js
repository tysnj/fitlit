const User = require("./users");

class UserRepository {
    constructor(users) {
    this.users = users.map(user => new User(user));
    }
}



if (typeof module !== "undefined") {
    module.exports = UserRepository;
};