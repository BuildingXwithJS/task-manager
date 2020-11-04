module.exports = {
  serverRuntimeConfig: {
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost/taskmanager',
  },
  publicRuntimeConfig: {},
};
