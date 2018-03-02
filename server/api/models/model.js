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
  type: {
    type: [{
      type: String,
      enum: ['household', 'restaurant', 'bills', 'travel', 'savings', 'misc']
    }],
    default: ['misc']
  }
});

module.exports = mongoose.model('Expenses', ExpenseSchema);