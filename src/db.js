const { createConnection } = require('mongoose');
const {
  serverRuntimeConfig: { databaseUrl },
} = require('../next.config');
const userSchema = require('./user');

// connect to given URL
const db = createConnection(databaseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
exports.db = db;

// handle DB errors
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  // exit immediately on error
  process.exit(1);
});

// connection ready
exports.connected = new Promise((resolve) => db.once('open', resolve));

// models
exports.User = db.model('User', userSchema);
