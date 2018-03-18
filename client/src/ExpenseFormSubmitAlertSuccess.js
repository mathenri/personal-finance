import React, {Component} from 'react';

class ExpenseFormSubmitAlertSuccess extends Component {
  render() {
    return (
      <div className="alert alert-success" role="alert">
        <strong>{this.props.amount} kr - {this.props.expenseType}</strong> sparat!
      </div>
    );
  }
}

export default ExpenseFormSubmitAlertSuccess;