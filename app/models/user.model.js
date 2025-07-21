const { UniqueConstraintError } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    full_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    address_line_1: {
      type: Sequelize.STRING
    },
    address_line_2: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    nok_name: {
      type: Sequelize.STRING
    },
    nok_phone_number: {
      type: Sequelize.STRING
    }
  });

  return User;
};
