import React, {Component} from 'react';
import {XYPlot, XAxis, YAxis, VerticalBarSeries} from 'react-vis';

class ThisMonthExpensesBarChart extends Component {
  constructor() {
    super();
    this.state = {
      expense_records: []
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/api/expenses_sum_by_expense_type`)
      .then(reslut => reslut.json())
      .then(expense_records => this.setState({expense_records: expense_records}));
  }

  render() {
    const EXPENSE_TYPE_TRANSLATIONS = this.props.expenseTypeTranslations

    let formattedExpenses = [];
    let expenseIndex = 0;
    this.state.expense_records.forEach(function(item) {
      if (typeof EXPENSE_TYPE_TRANSLATIONS[item._id] !== 'undefined') {
        formattedExpenses.push({x: EXPENSE_TYPE_TRANSLATIONS[item._id], y: item.amount, color:expenseIndex});
        expenseIndex++;
      }
    });

    return (
      
        <div className="centered margin-top">
          <XYPlot 
            margin={{left: 100, bottom: 100}}
            height={300} 
            width={500} 
            colorType="category" xType="ordinal">
            <VerticalBarSeries data={formattedExpenses} />
            <YAxis />
            <XAxis tickLabelAngle={-90}/>
          </XYPlot>
        </div>
      
    );
  }
}

export default ThisMonthExpensesBarChart;