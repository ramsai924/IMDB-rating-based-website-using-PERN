const Sequelize = require("sequelize");
module.exports = new Sequelize('milestone9', 'postgres', '14211@0591Mr', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
});