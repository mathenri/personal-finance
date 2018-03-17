import React, {Component} from 'react';
import {XYPlot, XAxis, YAxis, VerticalBarSeries, VerticalGridLines, HorizontalGridLines} from 'react-vis';

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
    const EXPENSE_TYPE_TRANSLATIONS = this.props.expenseTypeTranslations;
    const EXPENSE_TYPE_COLORS = this.props.expenseTypeColors;

    let formattedExpenses = [];
    this.state.expense_records.forEach(function(item) {
      const expenseTypeName = EXPENSE_TYPE_TRANSLATIONS[item._id];
      const expenseTypeColor = EXPENSE_TYPE_COLORS[item._id];
      if (typeof expenseTypeName !== 'undefined') {
        formattedExpenses.push({
          x: expenseTypeName, 
          y: item.amount, 
          color: expenseTypeColor
        });
      }
    });

    return (
      <div className="row justify-content-center">
        <div className="col-auto">
          <div className="margin-top">
            <XYPlot 
              margin={{left: 80, bottom: 100}}
              height={300} 
              width={200} 
              colorType="literal" 
              xType="ordinal">
                <VerticalGridLines />
                <HorizontalGridLines />
                <VerticalBarSeries data={formattedExpenses} />

                <YAxis tickFormat={v => `${v} kr`}/>
                <XAxis tickLabelAngle={-45}/>
            </XYPlot>
          </div>
        </div>
      </div>
    );
  }
}

export default ThisMonthExpensesBarChart;