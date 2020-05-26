const sequelize = require("sequelize");
const db = require("../config/database");

const Mainuser = db.define("admin", {
  mname: {
    type: sequelize.STRING,
  },
  mcast: {
    type: sequelize.ARRAY(sequelize.JSON),
  },
  mdesc: {
    type: sequelize.STRING,
  },
  mgeneres: {
    type: sequelize.STRING,
  },
  mrating: {
    type: sequelize.ARRAY(sequelize.JSON),
  },
  mreviews: {
    type: sequelize.ARRAY(sequelize.JSON),
  },
  mimage: {
      type : sequelize.STRING
  },
});

module.exports = Mainuser;