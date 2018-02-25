'use strict';
module.exports = function(app) {
  var controller = require('../controllers/controller');

  app.route('/api/expenses')
    .get(controller.list_expenses)
    .post(controller.create_expense);

  app.route('/api/expenses/:expense_id')
    .get(controller.read_expense)
    .put(controller.update_expense)
    .delete(controller.delete_expense);
};