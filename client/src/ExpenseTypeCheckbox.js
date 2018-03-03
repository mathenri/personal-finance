import React, { Component } from 'react';

class ExpenseTypeCheckbox extends Component {
  render() {
    return (
      <div className="form-check form-control-lg">
        <input 
          type="radio" 
          className="form-check-input" 
          name="selectedExpenseType" 
          id={this.props.formControlValue + 'Radio'} 
          value={this.props.radioButtonValue}
          checked={this.props.selectedExpenseType === this.props.radioButtonValue}
          onChange={this.props.handleFormChange} />
        <label className="form-check-label" htmlFor={this.props.radioButtonValue + 'Radio'}>{this.props.label}</label>
      </div>
    );
  }
}

export default ExpenseTypeCheckbox;