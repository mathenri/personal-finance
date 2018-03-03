import React, { Component } from 'react';
import ExpenseTypeCheckbox from './ExpenseTypeCheckbox';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseInputBoxValue: null,
      selectedExpenseType: 'misc'
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleFormSubmit(event) {
    fetch(`${process.env.REACT_APP_API_URL}/api/expenses`, 
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: this.state.expenseInputBoxValue,
              type: this.state.selectedExpenseType,
            })
          }
      )
      .then((response) => {
        if (response.ok) {
          alert(`Expense successfully submitted to server:
            Cost: ${this.state.expenseInputBoxValue}, 
            type: ${this.state.selectedExpenseType}`);
        } else {
          alert(`Expense could not be submitted: ${response.status}: ${response.statusText}\n${response.text()}`);
        }
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="row">
        <div className="col text-center">
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <input 
                type="number"
                className="form-control form-control-lg" 
                placeholder="Kostnad"
                value={this.state.expenseInputBoxValue}
                onChange={this.handleFormChange}
                name="expenseInputBoxValue" />
            </div>
            <fieldset className="form-group">
              <ExpenseTypeCheckbox 
                handleFormChange={this.handleFormChange}
                selectedExpenseType={this.state.selectedExpenseType}
                radioButtonValue="household"
                label="Mat/Hushåll"
              />
              <ExpenseTypeCheckbox 
                handleFormChange={this.handleFormChange}
                selectedExpenseType={this.state.selectedExpenseType}
                radioButtonValue="restaurant"
                label="Restaurang"
              />
              <ExpenseTypeCheckbox 
                handleFormChange={this.handleFormChange}
                selectedExpenseType={this.state.selectedExpenseType}
                radioButtonValue="bills"
                label="Hyra/Räkningar"
              /> 
              <ExpenseTypeCheckbox 
                handleFormChange={this.handleFormChange}
                selectedExpenseType={this.state.selectedExpenseType}
                radioButtonValue="travel"
                label="Resa"
              /> 
              <ExpenseTypeCheckbox 
                handleFormChange={this.handleFormChange}
                selectedExpenseType={this.state.selectedExpenseType}
                radioButtonValue="misc"
                label="Övrigt"
              /> 
            </fieldset>
            <button type="submit" className="btn btn-success btn-lg">Spara</button> 
          </form>
        </div>
      </div>
    );
  }
}

export default ExpenseForm;
