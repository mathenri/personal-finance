'use strict';
module.exports = function(app) {
  var controller = require('../controllers/controller');

  app.route('/api/expenses')
    .get(controller.list_expenses)
    .post(controller.create_expense);

  app.route('/api/expenses_sorted_limited')
    .get(controller.list_expenses_sorted_by_latest_date_limit_5);

  app.route('/api/expenses_sum_by_expense_type')
    .get(controller.list_expenses_sum_by_expense_type);

  app.route('/api/expenses/:expense_id')
    .get(controller.read_expense)
    .put(controller.update_expense)
    .delete(controller.delete_expense);
};