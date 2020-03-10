"use strict"
const userController = require("../controllers/userController");

module.exports = (app) => {
    app.route("/user/register")
    .post(userController.register)

    app.route("/user/login")
    .post(userController.login)
}