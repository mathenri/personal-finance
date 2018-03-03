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
    alert('Submitting: ' + this.state.expenseInputBoxValue + ', ' + this.state.selectedExpenseType);

    fetch(process.env.REACT_APP_API_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: this.state.expenseInputBoxValue,
          type: this.state.selectedExpenseType,
        })
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
            <button type="submit" class="btn btn-success btn-lg">Spara</button> 
          </form>
        </div>
      </div>
    );
  }
}

export default ExpenseForm;
