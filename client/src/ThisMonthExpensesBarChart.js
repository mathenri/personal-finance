import React, {Component} from 'react';
import {XYPlot, XAxis, YAxis, VerticalBarSeries, VerticalGridLines, HorizontalGridLines} from 'react-vis';

class ThisMonthExpensesBarChart extends Component {
  constructor() {
    super();
    this.state = {
      expenseRecords: []
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/api/expenses_sum_by_expense_type`)
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
    if (this.state.expenseRecords.length == 0) {
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
          <div className="margin-top">
            <XYPlot 
              margin={{left: 80, bottom: 130}}
              height={300} 
              width={200} 
              colorType="literal" 
              xType="ordinal">
                <VerticalGridLines />
                <HorizontalGridLines />
                <VerticalBarSeries data={formattedExpenses} />

                <YAxis tickFormat={v => `${v} kr`}/>
                <XAxis tickLabelAngle={-90}/>
            </XYPlot>
          </div>
        </div>
      </div>
    );
  }
}

export default ThisMonthExpensesBarChart;