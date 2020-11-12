const { createConnection } = require('mongoose');
const {
  serverRuntimeConfig: { databaseUrl },
} = require('../next.config');

// schemas
const userSchema = require('./user');
const projectSchema = require('./project');

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
exports.Project = db.model('Project', projectSchema);
