const sequelize = require("sequelize");
const db = require("../config/database");

const users = db.define("user", {
  name: {
    type: sequelize.STRING,
  },
  email: {
    type: sequelize.STRING,
  },
  password: {
    type: sequelize.STRING,
  },
  ratings: {
    type: sequelize.ARRAY(sequelize.JSON),
  },
  reviews: {
    type: sequelize.ARRAY(sequelize.JSON),
  },
});

module.exports = users;