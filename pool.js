const env = require ('./environment')
const Pool = require('pg').Pool
const pool = new Pool({
    user: env.user,
    host: env.host,
    database: env.database,
    password: env.password,
    port: env.port,
    ssl: env.ssl
});

module.exports = { pool }