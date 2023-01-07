const sql = require("mysql2/promise");

module.exports = (cb) => {
    try {
        const dbPool = sql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            waitForConnections: true,
        });
        cb(null, dbPool)
    } catch (error) {
        cb(error, null)
    }
}; 
