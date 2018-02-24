import React, { Component } from 'react';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {expenseInputBoxValue: 0};

    this.handleExpenseInputBoxChange = this.handleExpenseInputBoxChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleExpenseInputBoxChange(event) {
    this.setState({expenseInputBoxValue: event.target.value});
  }

  handleFormSubmit(event) {
    alert('The followin value was submitted: ' + this.state.expenseInputBoxValue);

    fetch('http://localhost:4000/expenses', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amound: this.state.expenseInputBoxValue,
          hours: this.state.hours,
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
                onChange={this.handleExpenseInputBoxChange} />
            </div>
            <div className="form-check">
              <input type="radio" className="form-check-input" name="typeRadios" id="foodRadio" 
                value="food" />
              <label class="form-check-label" for="foodRadio">Mat</label>
            </div> 
            <div className="form-check">
              <input type="radio" className="form-check-input" name="typeRadios" id="livingRadio" 
                value="living" />
              <label class="form-check-label" for="livingRadio">Boende</label>
            </div> 
            <div className="form-check">
              <input type="radio" className="form-check-input" name="typeRadios" id="travelRadio" 
                value="travel" />
              <label class="form-check-label" for="travelRadio">Resa</label>
            </div> 
            <div className="form-check margin-bottom">
              <input type="radio" className="form-check-input" name="typeRadios" id="miscRadio" 
                value="misc" checked />
              <label class="form-check-label" for="miscRadio">Övrigt</label>
            </div>
            <button type="submit" class="btn btn-success btn-lg">Submit</button> 
          </form>
        </div>
      </div>
    );
  }
}

export default ExpenseForm;