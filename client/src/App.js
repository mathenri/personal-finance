import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import ExpenseForm from './ExpenseForm'

class App extends Component { 
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Privatekonomi</h1>
          </div>
        </div>
        <ExpenseForm />
      </div>
    );
  }
}

export default App;
