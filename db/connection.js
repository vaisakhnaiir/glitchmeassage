const monk = require('monk');
const connectionString = process.env.MONGODB_URL || 'localhost/messageboard';
const db = monk(connectionString);

module.exports = db;

//messageboard is the database
