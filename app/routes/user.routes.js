const { authJwt } = require("../middleware");
const config = require("../config/auth.config");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    config.api_url + "/profile/:id",
    [authJwt.verifyToken],
    controller.userProfile
  );

  app.put(
    config.api_url + "/profile/:id",
    [authJwt.verifyToken],
    controller.updateProfile
  );
};
