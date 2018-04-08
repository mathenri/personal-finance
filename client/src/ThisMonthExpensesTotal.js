import React, {Component} from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis';

const MONTHS = {
  1:'Jan',
  2:'Feb',
  3:'Mar',
  4:'Apr',
  5:'Maj',
  6:'Jun',
  7:'Jul',
  8:'Aug',
  9:'Sep',
  10:'Okt',
  11:'Nov',
  12:'Dec'
}

class ThisMonthExpensesTotal extends Component {
  constructor() {
    super();
    this.state = {
      expensesThisMonth: 0,
      expensesLastMonth: 0,
      expensesPerMonth: []
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
    fetch(`${process.env.REACT_APP_API_URL}/api/expenses_sum?from=${firstDayLastMonthStr}&to=${oneMonthAgoStr}`)
      .then(reslut => reslut.json())
      .then((expenseSum) => {
        if (expenseSum.length !== 0) {
          this.setState({expensesLastMonth: expenseSum[0]['amount']});
        }
      });

    fetch(`${process.env.REACT_APP_API_URL}/api/expenses_sum_per_month`)
      .then(reslut => reslut.json())
      .then((expenseSum) => {
        if (expenseSum.length !== 0) {
          this.setState({expensesPerMonth: expenseSum});
        }
      });    
  }

  render() {
    let expensesPerMonthFormatted = [];
    this.state.expensesPerMonth.forEach((item) => {
      expensesPerMonthFormatted.push({x:MONTHS[item._id], y:item.total_amount});
    });

    return (
      <div className="row justify-content-center">
        <div className="col-auto" align="center">
          <h4>Denna månaden: <span className="badge badge-primary">{this.state.expensesThisMonth} kr</span></h4>
          <h4>Förra månaden: <span className="badge badge-secondary">{this.state.expensesLastMonth} kr</span></h4>
          <XYPlot 
            height={320} 
            width={280} 
            margin={{
              left: 60,
              bottom: 50
            }}
            xType="ordinal"
            stroke="#428bca"
          >
            <HorizontalGridLines />
            <XAxis 
              tickTotal={expensesPerMonthFormatted.length}
              tickLabelAngle={-90}
            />
            <YAxis
              tickFormat={v => `${v} kr`}
              hideLine
            />
            <LineSeries data={expensesPerMonthFormatted} />
          </XYPlot>
        </div>
      </div>
    );
  }
}

export default ThisMonthExpensesTotal;