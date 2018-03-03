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

    fetch('http://localhost:5000/api/expenses', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: this.state.expenseInputBoxValue,
          type: this.state.expenseType,
        })
        .then(response => { return response.json();})
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
            <fieldset className="form-group">
              <div className="form-check form-control-lg">
                <input 
                  type="radio" 
                  className="form-check-input" 
                  name="expenseType" 
                  id="householdRadio" 
                  value="household"
                  checked={this.state.expenseType === 'household'}
                  onChange={this.handleFromChange} />
                <label class="form-check-label" for="householdRadio">Hushåll</label>
              </div> 
              <div className="form-check form-control-lg">
                <input 
                  type="radio" 
                  className="form-check-input" 
                  name="expenseType" 
                  id="restaurantRadio" 
                  value="restaurant"
                  checked={this.state.expenseType === 'restaurant'}
                  onChange={this.handleFromChange} />
                <label class="form-check-label" for="restaurantRadio">Restaurang</label>
              </div>
              <div className="form-check form-control-lg">
                <input 
                  type="radio" 
                  className="form-check-input" 
                  name="expenseType" 
                  id="billsRadio" 
                  value="bills"
                  checked={this.state.expenseType === 'bills'}
                  onChange={this.handleFromChange} />
                <label class="form-check-label" for="billsRadio">Hyra/Räkningar</label>
              </div> 
              <div className="form-check form-control-lg">
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
              <div className="form-check form-control-lg margin-bottom">
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
            </fieldset>
            <button type="submit" class="btn btn-success btn-lg">Spara</button> 
          </form>
        </div>
      </div>
    );
  }
}

export default ExpenseForm;
