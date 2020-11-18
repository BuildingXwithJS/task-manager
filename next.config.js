module.exports = {
  serverRuntimeConfig: {
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost/taskmanager',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },
  publicRuntimeConfig: {},
};
