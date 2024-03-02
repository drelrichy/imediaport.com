const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
 

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


//operatorsAliases: false,
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.channellists = require("./channellist.model.js")(sequelize, Sequelize);

//db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

//db.schedules = require("./schedule.model.js")(sequelize, Sequelize);

db.programs = require("./program.model.js")(sequelize, Sequelize);

//db.schedules = require("./channel.model.js")(sequelize, Sequelize);

module.exports = db;
