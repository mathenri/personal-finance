import React, {Component} from 'react';

class ThisMonthExpensesTotal extends Component {
  constructor() {
    super();
    this.state = {
      expenseSum: 0
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/api/expenses_sum?from="2018-03-01&to=2018-03-31"`)
      .then(reslut => reslut.json())
      .then(expenseSum => this.setState({expenseSum: expenseSum[0]['amount']}));
  }

  render() {

    return (
      <div className="row justify-content-center">
        <div className="col-auto" align="center">
          <h1><span className="badge badge-primary">{this.state.expenseSum} kr</span></h1>
        </div>
      </div>
    );
  }
}

export default ThisMonthExpensesTotal;