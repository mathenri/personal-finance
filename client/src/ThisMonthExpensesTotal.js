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
      expensesThisMonthSum: 0,
      // expensesLastMonth: 0,
      expensesThisMonth: [],
      expensesLastMonth: [],
      expensesPerMonth: []
    };
  }

  componentDidMount() {
    // get total expenses this month
    const date = new Date();
    const firstDayThisMonth = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1, 0, 0, 0));
    const lastDayThisMonth = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0));
    const firstDayThisMonthStr = firstDayThisMonth.toISOString().slice(0, 10);
    const lastDayThisMonthStr = lastDayThisMonth.toISOString().slice(0, 10);
    fetch(`${process.env.REACT_APP_API_URL}/api/expenses_sum?from=${firstDayThisMonthStr}&to=${lastDayThisMonthStr}`)
      .then(reslut => reslut.json())
      .then((expenseSum) => {
        if (expenseSum.length !== 0) {
          this.setState({expensesThisMonthSum: expenseSum[0]['amount']});
        }
      });

    // get total expenses last month up till this date
    // const firstDayLastMonth = new Date(Date.UTC(date.getFullYear(), date.getMonth() - 1, 1, 0, 0, 0));
    // const oneMonthAgo = new Date(Date.UTC(date.getFullYear(), date.getMonth() - 1, date.getDate(), 0, 0, 0));
    // const firstDayLastMonthStr = firstDayLastMonth.toISOString().slice(0, 10);
    // const oneMonthAgoStr = oneMonthAgo.toISOString().slice(0, 10);
    // fetch(`${process.env.REACT_APP_API_URL}/api/expenses_sum?from=${firstDayLastMonthStr}&to=${oneMonthAgoStr}`)
    //   .then(reslut => reslut.json())
    //   .then((expenseSum) => {
    //     if (expenseSum.length !== 0) {
    //       this.setState({expensesLastMonth: expenseSum[0]['amount']});
    //     }
    //   });

    // get all expenses this month
    const firstDayLastMonth = new Date(Date.UTC(date.getFullYear(), date.getMonth() - 1, 1, 0, 0, 0));
    const lastDayLastMonth = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 0, 0, 0, 0));
    const firstDayLastMonthStr = firstDayLastMonth.toISOString().slice(0, 10);
    const lastDayLastMonthStr = lastDayLastMonth.toISOString().slice(0, 10);
    fetch(`${process.env.REACT_APP_API_URL}/api/expenses?from=${firstDayThisMonthStr}&to=${lastDayThisMonthStr}`)
      .then(reslut => reslut.json())
      .then((expenseSum) => {
        if (expenseSum.length !== 0) {
          this.setState({expensesThisMonth: expenseSum});
        }
      });

    // get all expenses last month
    fetch(`${process.env.REACT_APP_API_URL}/api/expenses?from=${firstDayLastMonthStr}&to=${lastDayLastMonthStr}`)
      .then(reslut => reslut.json())
      .then((expenseSum) => {
        if (expenseSum.length !== 0) {
          this.setState({expensesLastMonth: expenseSum});
        }
      });

    // get total expenses all months
    fetch(`${process.env.REACT_APP_API_URL}/api/expenses_sum_per_month`)
      .then(reslut => reslut.json())
      .then((expenseSum) => {
        if (expenseSum.length !== 0) {
          this.setState({expensesPerMonth: expenseSum});
        }
      });    
  }

  render() {
    // format total expenses all months to x,y-form
    let expensesPerMonthFormatted = [];
    this.state.expensesPerMonth.forEach((item) => {
      expensesPerMonthFormatted.push({x:MONTHS[item._id], y:item.total_amount});
    });

    // format expenses sum over time last month to x,y-form
    let expenseSumOverTimeLastMonthDict = {};
    let totalAmount = 0;
    this.state.expensesLastMonth.forEach((item) => {
      totalAmount += item.amount;
      let day = new Date(item.created_date).getDate();
      expenseSumOverTimeLastMonthDict[day] = totalAmount;
    });
    
    let expenseSumOverTimeLastMonthList = [];
    let i;
    let lastTotalExpense = 0;
    for (i = 0; i < 31; i++) { 
      if (i in expenseSumOverTimeLastMonthDict) {
        expenseSumOverTimeLastMonthList.push({x: i, y: expenseSumOverTimeLastMonthDict[i]});
        lastTotalExpense = expenseSumOverTimeLastMonthDict[i];
      } else {
        expenseSumOverTimeLastMonthList.push({x: i, y: lastTotalExpense})
      }
    }


    // format expenses sum over time this month to x,y-form
    let expenseSumOverTimeThisMonthDict = {};
    totalAmount = 0;
    this.state.expensesThisMonth.forEach((item) => {
      totalAmount += item.amount;
      let day = new Date(item.created_date).getDate();
      expenseSumOverTimeThisMonthDict[day] = totalAmount;
    });
    
    let expenseSumOverTimeThisMonthList = [];
    lastTotalExpense = 0;
    for (i = 0; i < new Date().getDate() + 1; i++) { 
      if (i in expenseSumOverTimeThisMonthDict) {
        expenseSumOverTimeThisMonthList.push({x: i, y: expenseSumOverTimeThisMonthDict[i]});
        lastTotalExpense = expenseSumOverTimeThisMonthDict[i];
      } else {
        expenseSumOverTimeThisMonthList.push({x: i, y: lastTotalExpense})
      }
    }

    return (
      <div className="row justify-content-center">
        <div className="col-auto" align="center">
          <h4>Denna månaden: <span className="badge badge-primary">{this.state.expensesThisMonthSum} kr</span></h4>
          
          <XYPlot 
            height={320} 
            width={280} 
            margin={{
              left: 60,
              bottom: 50
            }}
          >
            <HorizontalGridLines />
            <XAxis />
            <YAxis
              tickFormat={v => `${v} kr`}
              hideLine
            />
            <LineSeries data={expenseSumOverTimeThisMonthList} />
            <LineSeries data={expenseSumOverTimeLastMonthList} />
          </XYPlot>

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