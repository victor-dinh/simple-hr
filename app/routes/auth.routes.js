const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const config = require("../config/auth.config");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    config.api_url + "/register",
    [
      verifySignUp.checkDuplicateEmail
    ],
    controller.signUp
  );

  app.post(config.api_url + "/login", controller.signIn);
};
