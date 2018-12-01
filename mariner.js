module.exports = {
  directory: './migrations',

  stopOnWarning: true,

  plugins: ['sql', 'js'],

  sql: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },

  backend: 'sql',
};
