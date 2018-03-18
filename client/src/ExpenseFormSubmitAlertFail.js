import React, {Component} from 'react';

class ExpenseFormSubmitAlertFail extends Component {
  render() {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Det gick inte att spara!</strong> Fel: {this.props.errorMessage}
      </div>
    );
  }
}

export default ExpenseFormSubmitAlertFail;