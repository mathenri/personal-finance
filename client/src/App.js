import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/react-vis/dist/style.css';
import './App.css';
import ExpenseForm from './ExpenseForm';
import LatestExpensesList from './LatestExpensesList';
import Header from './Header';
import ThisMonthExpensesBarChart from './ThisMonthExpensesBarChart';
import ThisMonthExpensesTotal from './ThisMonthExpensesTotal';
ThisMonthExpensesTotal

const EXPENSE_TYPE_TRANSLATIONS = {
  'household':'Mat/Hushåll',
  'restaurant':'Restaurang',
  'misc':'Övrigt',
  'bills':'Hyra/Räkningar',
  'travel':'Resa'
}

const EXPENSE_TYPE_COLORS = {
  'household':'#007bff',
  'restaurant':'#28a745',
  'misc':'#343a40',
  'bills':'#ffc107',
  'travel':'#dc3545'
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

        <Header />

        <ExpenseForm 
          expenseTypeTranslations={EXPENSE_TYPE_TRANSLATIONS}
          expenseTypeColors={EXPENSE_TYPE_COLORS}
        />

        <div className="row margin-top">
          <div className="col">
            <h2>Senast rapporterade kostnader</h2>
          </div>
        </div>
        <LatestExpensesList 
          expenses={this.state.expenses} 
          expenseTypeTranslations={EXPENSE_TYPE_TRANSLATIONS}
          expenseTypeColors={EXPENSE_TYPE_COLORS}
        />

        <div className="row margin-top">
          <div className="col">
            <h2>Total kostnad</h2>
          </div>
        </div>
        <ThisMonthExpensesTotal />

        <div className="row margin-top">
          <div className="col">
            <h2>Kostnader denna månaden</h2>
          </div>
        </div>
        <ThisMonthExpensesBarChart expenseTypeTranslations={EXPENSE_TYPE_TRANSLATIONS}
          expenseTypeColors={EXPENSE_TYPE_COLORS}
        />

      </div>
    );
  }
}

export default App;
