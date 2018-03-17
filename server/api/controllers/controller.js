'use strict';

var mongoose = require('mongoose'),
  Expense = mongoose.model('Expenses');


exports.list_expenses = function(req, res) {
  Expense.find({}, function(err, expenses) {
    if (err)
      res.status(400).send(err);
    res.status(200).json(expenses);
  });
};

exports.list_expenses_sorted_by_latest_date_limit_5 = function(req, res) {
  Expense.find({})
    .limit(5)
    .sort({created_date: -1})
    .exec(function(err, expenses) {
      if (err)
        res.status(400).send(err);
      res.status(200).json(expenses);
    });
};

exports.list_expenses_sum_by_expense_type = function(req, res) {
  Expense.aggregate(
    [
      {
        $match: {
          "created_date": { 
            $gte : new Date(req.query.since) 
          }
        }
      },
      { 
        $group : { 
          _id : "$type",
          amount: {
            $sum: "$amount"
          } 
        } 
      }
    ], function(err, expenses) {
      if (err)
        res.send(err);
      res.json(expenses)
    }
  );
}

exports.create_expense = function(req, res) {
  var new_expense = new Expense(req.body);
  new_expense.save(function(err, expense) {
    if (err)
      res.status(400).send(err);
    res.status(200).json(expense);
  });
};

exports.read_expense = function(req, res) {
  Expense.findById(req.params.expense_id, function(err, expense) {
    if (err)
      res.status(400).send(err);
    res.status(200).json(expense);
  });
};

exports.update_expense = function(req, res) {
  Expense.findOneAndUpdate({_id: req.params.expense_id}, req.body, {new: true}, function(err, expense) {
    if (err)
      res.status(400).send(err);
    res.status(200).json(expense);
  });
};

exports.delete_expense = function(req, res) {
  Expense.remove({
    _id: req.params.expense_id
  }, function(err, expense) {
    if (err)
      res.status(400).send(err);
    res.status(200).json({ message: 'Expense successfully deleted' });
  });
};