import React, {Component} from 'react';
import {XYPlot, XAxis, YAxis, VerticalBarSeries, HorizontalGridLines} from 'react-vis';

class ThisMonthExpensesBarChart extends Component {
  constructor() {
    super();
    this.state = {
      expenseRecords: []
    };
  }

  componentDidMount() {
    const thisDate = new Date();
    const thisYearAndMonthStr = thisDate.toISOString().slice(0, 7);
    const firstDayOfThisMonth = thisYearAndMonthStr + '-01';
    fetch(`${process.env.REACT_APP_API_URL}/api/expenses_sum_by_expense_type?since=${firstDayOfThisMonth}`)
      .then(reslut => reslut.json())
      .then(expenseRecords => this.setState({expenseRecords: expenseRecords}));
  }

  getAmountFromList(list, id) {
    for (const item of list) {
      if (item._id[0] === id) {
        return item.amount;
      }
    }
    return null;
  }

  render() {
    if (this.state.expenseRecords.length === 0) {
      return <div/>
    }

    let formattedExpenses = [];
    for (const [expenseTypeId, expenseTypeName] of Object.entries(this.props.expenseTypeTranslations)) {
      const expenseTypeColor = this.props.expenseTypeColors[expenseTypeId];
      const expenseAmount = this.getAmountFromList(this.state.expenseRecords, expenseTypeId);
      formattedExpenses.push({
          x: expenseTypeName, 
          y: expenseAmount, 
          color: expenseTypeColor
        }); 
    }

    return (
      <div className="row justify-content-center">
        <div className="col-auto">
          <XYPlot 
            margin={{left: 80, bottom: 130}}
            height={320} 
            width={280} 
            colorType="literal" 
            xType="ordinal">
              
              <HorizontalGridLines />
              <VerticalBarSeries data={formattedExpenses} />

              <YAxis 
                tickTotal={2}
                tickFormat={v => `${v} kr`}
              />
              <XAxis tickLabelAngle={-90}/>
          </XYPlot>
        </div>
      </div>
    );
  }
}

export default ThisMonthExpensesBarChart;