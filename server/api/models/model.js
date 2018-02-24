'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ExpenseSchema = new Schema({
  amount: {
    type: Number,
    required: 'Enter the expense amount'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['living', 'food', 'travel', 'misc']
    }],
    default: ['misc']
  }
});

module.exports = mongoose.model('Expenses', ExpenseSchema);