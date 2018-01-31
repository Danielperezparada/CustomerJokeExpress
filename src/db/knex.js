const config = require('./knexfile.js');

const knex = require('knex')(config[process.env.NODE_ENV]);

// Wait for connection
const tryAtMost = (maxRetries) => {
  knex.raw('SELECT 1')
    .then(() => {
      console.log('DB Connection Ok');
      // return knex;
      return knex.migrate.latest([config]);
    })
    .catch(() => {
      setTimeout(() => {
        console.log('Db Connection Inconplete - Reconnecting');
        tryAtMost(maxRetries - 1);
      }, 1000);
    });
};

tryAtMost(5);

module.exports = knex;
