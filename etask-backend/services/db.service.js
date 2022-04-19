require('dotenv').config();
const sql = require('mssql');

module.exports = {
    query,
}

async function connect() {
    try {
        return await sql.connect(`
        Server=${process.env.SERVER};
        Database=${process.env.DATABASE};
        User Id=${process.env.DB_USER};
        Password=${process.env.DB_PASS};
        Encrypt=false;
        Trusted_Connection=yes`);
    } catch (err) {
        console.log(`Failed to connect to DB: \n ${err}`);
    }
}

async function query(queryString) {
    try {
        await connect();
        return await sql.query(queryString);
    } catch (err) {
        console.log(`Failed to fetch data from DB: \n ${err}`);
    }
}