const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
  title: { 
    type: String,
    required: [true, 'is required']
  },
  description: { 
    type: String,
    required: [true, 'is required']
  },
  status: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = model('Task', taskSchema)