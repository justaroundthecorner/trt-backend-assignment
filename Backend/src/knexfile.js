const env = require('../config.json').development;
module.exports = {
  client: env.dialect,
  connection: {
    port: env.port,
    host: env.host,
    database: env.database,
    user: env.user,
    password: env.password
  },
  pool: {
    min: parseInt(env.pool_min, 10),
    max: parseInt(env.pool_max, 10),
  },
  fetchArraySize: 500,
  prefetchRows: 500,
};
