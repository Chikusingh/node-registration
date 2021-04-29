const Sequelize = require('sequelize');
const CONFIG = require('../config/Config')

const sequelizeConfig = new Sequelize(CONFIG.db_name,CONFIG.db_password,CONFIG.db_user,{
      host: CONFIG.db_host,
      dialect:CONFIG.db_dialect,
      logging:false
});
module.exports = sequelizeConfig;