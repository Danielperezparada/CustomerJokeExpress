
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user: 'postgres',
      password: 'qwerty1234',
      host: 'localhost',
      port: 5432,
    },
    searchPath: 'public',
    migrations: {
      directory: './src/db/migrations',
    },
  },

};
