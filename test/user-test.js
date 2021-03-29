const chai = require('chai');
const expect = chai.expect;
const testData = require('../data/user-test-data');
const users = testData.userTestData;


describe ("User", function() {
    let user, user2;

    beforeEach(function() {
        user = new User(user[0]);
        user2 = new User(user[1]);
    })

    it("should be a function", function() {
        expect(User).to.be.a("function");
    });

    it("should be an instance of User", function() {
        expect(user).to.be.an.instanceOf(User);
    });

    it("should have an ID", function() {
        expect(user.ID).to.equal(1);
    })

    it("should have a name", function() {
        expect(user.name).to.equal("John Doe");
    })

    it("should have an address", function () {
        expect(user.address).to.equal("15195 Nakia Tunnel, Spokane WA 19508-5687");
    })
})