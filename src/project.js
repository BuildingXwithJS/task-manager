const { Schema, Types } = require('mongoose');

const projectSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Types.ObjectId, ref: 'User', required: true },
});

module.exports = projectSchema;
