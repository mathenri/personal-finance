import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import ExpenseForm from './ExpenseForm'

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
            <h1>Privatekonomi</h1>
          </div>
        </div>

        <ExpenseForm />

        <div className="row margin-top">
          <div className="col">
          <h2>Senast rapporterade kostnader</h2>
            <ul className="list-group">
              {this.state.expenses.map((item, i) => 
                <li className="list-group-item" key={i}>{item.amount} kr - {item.type} - {item.created_date.slice(0,10)}</li>)}
            </ul>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
