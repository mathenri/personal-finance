import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import ExpenseForm from './ExpenseForm'
import LatestExpensesList from './LatestExpensesList'

const EXPENSE_TYPE_TRANSLATIONS = {
  'household':'Mat/Hushåll',
  'restaurant':'Restaurang',
  'misc':'Övrigt',
  'bills':'Räkningar',
  'travel':'Resa'
}

const EXPENSE_TYPE_COLOR_CLASSES = {
  'household':'text-primary',
  'restaurant':'text-success',
  'misc':'text-dark',
  'bills':'text-danger',
  'travel':'text-warning'
}

class App extends Component { 
  constructor() {
    super();
    this.state = {
      expenses: []
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/api/expenses_sorted_limited`)
      .then(result => result.json())
      .then(expenses => this.setState({expenses: expenses}));
  }

  formatDate(date) {
    return date.toISOString().slice(0, 10);
  }
  
  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col">
            <h1 className="display-4">Privatekonomi</h1>
            <hr/>
          </div>
        </div>

        <ExpenseForm expenseTypeTranslations={EXPENSE_TYPE_TRANSLATIONS}/>

        <LatestExpensesList 
          expenses={this.state.expenses} 
          expenseTypeTranslations={EXPENSE_TYPE_TRANSLATIONS}
          expenseTypeColorClasses={EXPENSE_TYPE_COLOR_CLASSES}
        />

      </div>
    );
  }
}

export default App;
