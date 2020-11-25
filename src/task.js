const { Schema, Types } = require('mongoose');

const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  body: { type: Object },
  project: { type: Types.ObjectId, ref: 'Project', required: true },
  user: { type: Types.ObjectId, ref: 'User', required: true },
});

module.exports = taskSchema;
