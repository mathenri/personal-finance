import React, {Component} from 'react';

class ThisMonthExpensesTotal extends Component {
  constructor() {
    super();
    this.state = {
      expenseSum: 0
    };
  }

  componentDidMount() {
    const date = new Date();
    const firstDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1, 0, 0, 0));
    const lastDay = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0));
    const firstDayString = firstDay.toISOString().slice(0, 10);
    const lastDayString = lastDay.toISOString().slice(0, 10);
    fetch(`${process.env.REACT_APP_API_URL}/api/expenses_sum?from=${firstDayString}&to=${lastDayString}`)
      .then(reslut => reslut.json())
      .then((expenseSum) => {
        if (expenseSum.length !== 0) {
          this.setState({expenseSum: expenseSum[0]['amount']});
        }
      });
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