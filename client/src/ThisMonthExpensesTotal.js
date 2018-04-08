import React, {Component} from 'react';

class ThisMonthExpensesTotal extends Component {
  constructor() {
    super();
    this.state = {
      expensesThisMonth: 0,
      expensesLastMonth: 0
    };
  }

  componentDidMount() {
    const date = new Date();
    const firstDayThisMonth = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1, 0, 0, 0));
    const lastDayThisMonth = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0));
    const firstDayThisMonthStr = firstDayThisMonth.toISOString().slice(0, 10);
    const lastDayThisMonthStr = lastDayThisMonth.toISOString().slice(0, 10);
    fetch(`${process.env.REACT_APP_API_URL}/api/expenses_sum?from=${firstDayThisMonthStr}&to=${lastDayThisMonthStr}`)
      .then(reslut => reslut.json())
      .then((expenseSum) => {
        if (expenseSum.length !== 0) {
          this.setState({expensesThisMonth: expenseSum[0]['amount']});
        }
      });

    const firstDayLastMonth = new Date(Date.UTC(date.getFullYear(), date.getMonth() - 1, 1, 0, 0, 0));
    const oneMonthAgo = new Date(Date.UTC(date.getFullYear(), date.getMonth() - 1, date.getDate(), 0, 0, 0));

    const firstDayLastMonthStr = firstDayLastMonth.toISOString().slice(0, 10);
    const oneMonthAgoStr = oneMonthAgo.toISOString().slice(0, 10);
    console.log(`${process.env.REACT_APP_API_URL}/api/expenses_sum?from=${firstDayLastMonthStr}&to=${oneMonthAgoStr}`)
    fetch(`${process.env.REACT_APP_API_URL}/api/expenses_sum?from=${firstDayLastMonthStr}&to=${oneMonthAgoStr}`)
      .then(reslut => reslut.json())
      .then((expenseSum) => {
        if (expenseSum.length !== 0) {
          this.setState({expensesLastMonth: expenseSum[0]['amount']});
        }
      });
  }

  render() {

    return (
      <div className="row justify-content-center">
        <div className="col-auto" align="center">
          <h4>Denna månaden: <span className="badge badge-primary">{this.state.expensesThisMonth} kr</span></h4>
          <h4>Förra månaden: <span className="badge badge-secondary">{this.state.expensesLastMonth} kr</span></h4>
        </div>
      </div>
    );
  }
}

export default ThisMonthExpensesTotal;