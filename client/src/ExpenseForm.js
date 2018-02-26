import React, { Component } from 'react';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseInputBoxValue: null,
      expenseType: 'misc'
    };

    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFromChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleFormSubmit(event) {
    alert('Submitting: ' + this.state.expenseInputBoxValue + ', ' + this.state.expenseType);

    fetch('http://ec2-18-197-63-182.eu-central-1.compute.amazonaws.com:5000/api/expenses', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: this.state.expenseInputBoxValue,
          type: this.state.expenseType,
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
                onChange={this.handleFromChange}
                name="expenseInputBoxValue" />
            </div>
            <div className="form-check">
              <input 
                type="radio" 
                className="form-check-input" 
                name="expenseType" 
                id="foodRadio" 
                value="food"
                checked={this.state.expenseType === 'food'}
                onChange={this.handleFromChange} />
              <label class="form-check-label" for="foodRadio">Mat</label>
            </div> 
            <div className="form-check">
              <input 
                type="radio" 
                className="form-check-input" 
                name="expenseType" 
                id="livingRadio" 
                value="living"
                checked={this.state.expenseType === 'living'}
                onChange={this.handleFromChange} />
              <label class="form-check-label" for="livingRadio">Boende</label>
            </div> 
            <div className="form-check">
              <input 
                type="radio" 
                className="form-check-input" 
                name="expenseType" 
                id="travelRadio" 
                value="travel" 
                checked={this.state.expenseType === 'travel'}
                onChange={this.handleFromChange} />
              <label class="form-check-label" for="travelRadio">Resa</label>
            </div> 
            <div className="form-check margin-bottom">
              <input 
                type="radio" 
                className="form-check-input" 
                name="expenseType" 
                id="miscRadio" 
                value="misc" 
                checked={this.state.expenseType === 'misc'}
                onChange={this.handleFromChange} />
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
