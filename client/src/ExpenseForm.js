import React, { Component } from 'react';
import ExpenseTypeCheckbox from './ExpenseTypeCheckbox';
import ThisMonthExpensesBarChart from './ThisMonthExpensesBarChart';
import ExpenseFormSubmitAlertSuccess from './ExpenseFormSubmitAlertSuccess';
import ExpenseFormSubmitAlertFail from './ExpenseFormSubmitAlertFail';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseInputBoxValue: null,
      selectedExpenseType: 'misc',
      showFormSubmitAlertSuccess: false,
      showFormSubmitAlertFailed: false,
      submitFailedErrorMsg: ''
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
          this.setState({ 
            showFormSubmitAlertSuccess: true,
            showFormSubmitAlertFailed: false,
            submitFailedErrorMsg: ''
          });
          window.scrollTo(0, 0);
        } else {
          this.setState({
            submitFailedErrorMsg: `${response.status}: ${response.statusText}`,
            showFormSubmitAlertFailed: true,
            showFormSubmitAlertSuccess: false
          });
          window.scrollTo(0, 0);
        }
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="row">
        <div className="col text-center">
          {this.state.showFormSubmitAlertSuccess && 
            <ExpenseFormSubmitAlertSuccess 
              amount={this.state.expenseInputBoxValue} 
              expenseType={this.props.expenseTypeTranslations[this.state.selectedExpenseType]}
            />
          }

          {this.state.showFormSubmitAlertFailed && 
            <ExpenseFormSubmitAlertFail errorMessage={this.state.submitFailedErrorMsg} />}

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
                expenseTypeTranslations={this.props.expenseTypeTranslations}
                radioButtonValue="household"
                label="Mat/Hushåll"
                expenseTypeColors={this.props.expenseTypeColors}
              />
              <ExpenseTypeCheckbox 
                handleFormChange={this.handleFormChange}
                selectedExpenseType={this.state.selectedExpenseType}
                expenseTypeTranslations={this.props.expenseTypeTranslations}
                radioButtonValue="restaurant"
                label="Restaurang"
                expenseTypeColors={this.props.expenseTypeColors}
              />
              <ExpenseTypeCheckbox 
                handleFormChange={this.handleFormChange}
                selectedExpenseType={this.state.selectedExpenseType}
                expenseTypeTranslations={this.props.expenseTypeTranslations}
                radioButtonValue="bills"
                label="Hyra/Räkningar"
                expenseTypeColors={this.props.expenseTypeColors}
              /> 
              <ExpenseTypeCheckbox 
                handleFormChange={this.handleFormChange}
                selectedExpenseType={this.state.selectedExpenseType}
                expenseTypeTranslations={this.props.expenseTypeTranslations}
                radioButtonValue="travel"
                label="Resa"
                expenseTypeColors={this.props.expenseTypeColors}
              /> 
              <ExpenseTypeCheckbox 
                handleFormChange={this.handleFormChange}
                selectedExpenseType={this.state.selectedExpenseType}
                expenseTypeTranslations={this.props.expenseTypeTranslations}
                radioButtonValue="misc"
                label="Övrigt"
                expenseTypeColors={this.props.expenseTypeColors}
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
